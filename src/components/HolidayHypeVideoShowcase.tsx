import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Flame, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  MessageCircle,
  Film,
  FileVideo,
  Info,
  Layers
} from "lucide-react";
import { siteConfig } from "../lib/config";

interface HolidayHypeVideoShowcaseProps {
  className?: string;
  onBookZanzibar?: () => void;
}

// Scene definition mapping the exact segments of the user's video
const SCENES = [
  {
    id: 0,
    time: 0,
    duration: 5,
    title: "Welcome to Zanzibar",
    description: "The island crew greets you with the wooden chalkboard and pure coastal energy",
    badge: "The Gathering",
    image: "/images/zanzibar_holiday_hype.jpg"
  },
  {
    id: 1,
    time: 5,
    duration: 9,
    title: "The Zanzibar Chants",
    description: "Chanting 'Welcome to Zanzibar! Holiday Hype!' in unison on the Stone Town waterfront",
    badge: "Pure Vibe",
    image: "/images/zanzibar_holiday_hype_wide.jpg"
  },
  {
    id: 2,
    time: 14,
    duration: 7,
    title: "The Flying Ocean Leap",
    description: "Acrobatic leap into the turquoise Indian Ocean holding the Holiday Hype banner in mid-air",
    badge: "The Ocean Jump",
    image: "/images/zanzibar_jump_midair.jpg"
  },
  {
    id: 3,
    time: 21,
    duration: 7,
    title: "Seawall Somersaults",
    description: "High-flying backflips and diving somersaults into crystal-clear waters of Stone Town",
    badge: "Acrobatics",
    image: "/images/zanzibar_diving_flip.jpg"
  },
  {
    id: 4,
    time: 28,
    duration: 5,
    title: "Come, Travel & Experience",
    description: "Holiday Hype sign proudly displayed over the Indian Ocean horizon",
    badge: "The Hype Promise",
    image: "/images/zanzibar_walk_sign.jpg"
  }
];

const TOTAL_DURATION = 33; // 33 seconds

// IndexedDB Helper to persist user video across page refreshes
const DB_NAME = "HolidayHypeMediaDB";
const STORE_NAME = "videos";
const KEY_NAME = "zanzibar_reel";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveVideoToIndexedDB(blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not save video to IndexedDB:", err);
  }
}

async function loadVideoFromIndexedDB(): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => resolve(req.result as Blob || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export const HolidayHypeVideoShowcase: React.FC<HolidayHypeVideoShowcaseProps> = ({ 
  className = "",
  onBookZanzibar
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [hasNativeVideo, setHasNativeVideo] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hypeCount, setHypeCount] = useState<number>(1420);
  const [hasHyped, setHasHyped] = useState<boolean>(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState<boolean>(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [showUploadGuide, setShowUploadGuide] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<any>(null);

  // Initialize: Check IndexedDB first, then check if /videos/holiday_hype_zanzibar.mp4 exists
  useEffect(() => {
    let active = true;

    async function checkSources() {
      // 1. Check IndexedDB
      const savedBlob = await loadVideoFromIndexedDB();
      if (savedBlob && active) {
        const blobUrl = URL.createObjectURL(savedBlob);
        setVideoSrc(blobUrl);
        setHasNativeVideo(true);
        return;
      }

      // 2. Check if /videos/holiday_hype_zanzibar.mp4 is hosted on server
      try {
        const res = await fetch("/videos/holiday_hype_zanzibar.mp4", { method: "HEAD" });
        if (res.ok && active) {
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("video") || res.status === 200) {
            setVideoSrc("/videos/holiday_hype_zanzibar.mp4");
            setHasNativeVideo(true);
          }
        }
      } catch {
        // Fallback to interactive cinematic story mode
      }
    }

    checkSources();

    return () => {
      active = false;
    };
  }, []);

  // Update active scene based on currentTime
  useEffect(() => {
    const currentScene = SCENES.slice().reverse().find(s => currentTime >= s.time);
    if (currentScene) {
      const idx = SCENES.findIndex(s => s.id === currentScene.id);
      if (idx !== -1) setActiveSceneIndex(idx);
    }
  }, [currentTime]);

  // Audio synthesizer for energetic island rhythmic beats when native video is not present
  const stopIslandBeats = useCallback(() => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
  }, []);

  const startIslandBeats = useCallback(() => {
    if (isMuted || hasNativeVideo) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Play a lively tropical acoustic drum percussion rhythm
      const playDrumHit = (freq: number, decay: number, gainVal: number) => {
        if (!ctx || ctx.state !== "running") return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + decay);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + decay);
      };

      let beatStep = 0;
      stopIslandBeats();
      audioIntervalRef.current = setInterval(() => {
        beatStep = (beatStep + 1) % 8;
        if (beatStep === 0 || beatStep === 4) {
          playDrumHit(140, 0.25, 0.25); // Deep conga beat
        } else if (beatStep === 2 || beatStep === 6) {
          playDrumHit(260, 0.15, 0.18); // High bongo
        } else if (beatStep === 7) {
          playDrumHit(320, 0.1, 0.12);  // Percussion accent
        }
      }, 260);
    } catch {
      // AudioContext policy fallback
    }
  }, [isMuted, hasNativeVideo, stopIslandBeats]);

  // Sync audio with play/pause and mute
  useEffect(() => {
    if (isPlaying && !hasNativeVideo && !isMuted) {
      startIslandBeats();
    } else {
      stopIslandBeats();
    }
    return () => {
      stopIslandBeats();
    };
  }, [isPlaying, hasNativeVideo, isMuted, startIslandBeats, stopIslandBeats]);

  // Animated timer loop for cinematic reel when native video is absent
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && (!hasNativeVideo || !videoRef.current)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            return 0; // loop back to start
          }
          return Number((prev + 0.2).toFixed(1));
        });
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, hasNativeVideo]);

  // Handle native video time update
  const handleNativeTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (hasNativeVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fall back gracefully to animated reel if autoplay prevented
          setIsPlaying(true);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Process user-uploaded video file
  const handleVideoFile = async (file: File) => {
    if (!file || !file.type.startsWith("video/")) {
      alert("Please choose a valid video file (MP4, MOV, WebM).");
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setVideoSrc(blobUrl);
    setHasNativeVideo(true);
    setIsPlaying(true);

    // Persist to IndexedDB
    await saveVideoToIndexedDB(file);

    if (videoRef.current) {
      videoRef.current.src = blobUrl;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleVideoFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleVideoFile(file);
    }
  };

  const jumpToTime = (time: number) => {
    setCurrentTime(time);
    if (hasNativeVideo && videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setIsPlaying(true);
  };

  const handleHypeClick = () => {
    if (!hasHyped) {
      setHypeCount(prev => prev + 1);
      setHasHyped(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentScene = SCENES[activeSceneIndex];

  const zanzibarWhatsAppUrl = `https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
    "Hello Holiday Hype! I watched the vibrant Zanzibar celebration video with the ocean jumps and would love to book a holiday to Zanzibar!"
  )}`;

  return (
    <div 
      id="holiday-hype-video-showcase" 
      className={`bg-[#0A1526] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all ${className}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Top Banner Bar */}
      <div className="bg-[#122544] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E7A93B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E7A93B]"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#E7A93B] font-bold">
                Real Evidence of the Hype
              </span>
              {hasNativeVideo ? (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Full Video Active
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-[#E7A93B]/20 text-[#E7A93B] border border-[#E7A93B]/30 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Cinematic Scene Reel
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              Stone Town, Zanzibar Waterfront Celebration & Ocean Leap
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-stone-200 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#E7A93B]" />
            Stone Town, Zanzibar 🇹🇿
          </span>

          <input 
            type="file" 
            ref={fileInputRef} 
            accept="video/*" 
            className="hidden" 
            onChange={handleFileInputChange} 
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Select video file (MP4) to play directly"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E7A93B]/15 hover:bg-[#E7A93B]/25 border border-[#E7A93B]/40 rounded-full text-xs font-semibold text-[#E7A93B] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{hasNativeVideo ? "Replace Video File" : "Load Video File (MP4)"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUploadGuide(!showUploadGuide)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center transition-colors"
            title="Video options info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Optional Upload Guide Banner */}
      {showUploadGuide && (
        <div className="bg-[#162D50] px-6 py-3 border-b border-white/10 text-xs text-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <FileVideo className="w-4 h-4 text-[#E7A93B] flex-shrink-0" />
            <span>
              <strong>Tip:</strong> Click <strong>"Load Video File"</strong> or drag-and-drop your MP4 video right onto this player. It will be saved into your browser automatically.
            </span>
          </div>
          <button 
            onClick={() => setShowUploadGuide(false)}
            className="text-stone-400 hover:text-white font-bold ml-auto"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Drag & Drop Overlay Indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-[#122544]/90 z-50 flex flex-col items-center justify-center border-4 border-dashed border-[#E7A93B] p-6 text-center">
          <Upload className="w-16 h-16 text-[#E7A93B] animate-bounce mb-3" />
          <p className="text-xl font-bold text-white">Drop your Zanzibar video here!</p>
          <p className="text-sm text-stone-300 mt-1">Supports MP4, MOV, WebM</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Main: Video Player Reel (9:16 vertical ratio) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center items-center bg-gradient-to-b from-[#070E1A] to-[#0D1A2D] relative border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-[#E7A93B]/40 group select-none">
            
            {/* 1. Native Video Element (if file is loaded) */}
            {hasNativeVideo && videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster="/images/zanzibar_holiday_hype.jpg"
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleNativeTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
            ) : (
              /* 2. High-Definition Cinematic Scene Reel (Fluid cross-fade motion) */
              <div 
                className="w-full h-full relative cursor-pointer overflow-hidden"
                onClick={togglePlay}
              >
                {SCENES.map((scene, idx) => (
                  <div
                    key={scene.id}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
                      activeSceneIndex === idx
                        ? "opacity-100 scale-105"
                        : "opacity-0 scale-100 pointer-events-none"
                    }`}
                    style={{ 
                      backgroundImage: `url('${scene.image}')`,
                      transitionProperty: "opacity, transform"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />
                  </div>
                ))}
              </div>
            )}

            {/* Top Floating Badge Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-[#E7A93B]"}`}></span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-white">
                  {hasNativeVideo ? "Official Video" : "Authentic Footage"}
                </span>
              </div>

              <div className="bg-[#122544]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E7A93B]/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E7A93B]" />
                <span className="text-[10px] font-semibold text-[#E7A93B]">Holiday Hype</span>
              </div>
            </div>

            {/* Center Big Play / Pause Overlay Button */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 bg-[#E7A93B] hover:bg-[#d6982b] text-[#122544] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-30 cursor-pointer"
                aria-label="Play Holiday Hype Zanzibar Video"
              >
                <Play className="w-9 h-9 ml-1 fill-[#122544]" />
              </button>
            )}

            {/* Lower In-Video Story Information Card */}
            <div className="absolute bottom-16 left-3 right-3 z-20 pointer-events-none">
              <div className="bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-[#E7A93B] uppercase tracking-wider">
                    {currentScene.badge}
                  </span>
                  <span className="text-[11px] font-mono text-stone-300">
                    {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                  {currentScene.title}
                </h4>
                <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-snug">
                  {currentScene.description}
                </p>
              </div>
            </div>

            {/* Right Side Social Action Stack */}
            <div className="absolute right-3 bottom-26 flex flex-col items-center gap-3 z-30">
              <button 
                type="button"
                onClick={handleHypeClick}
                className="flex flex-col items-center group cursor-pointer"
                title="Send Hype"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  hasHyped 
                    ? "bg-[#D2573F] text-white scale-110 ring-4 ring-[#D2573F]/30" 
                    : "bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 hover:scale-105"
                }`}>
                  <Flame className={`w-5 h-5 ${hasHyped ? "fill-white animate-bounce" : "text-[#E7A93B]"}`} />
                </div>
                <span className="text-[10px] font-bold text-white mt-1 drop-shadow">
                  {hypeCount.toLocaleString()}
                </span>
              </button>

              <button 
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-[#E7A93B]" />}
              </button>

              <a 
                href={zanzibarWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center shadow-lg transition-all hover:scale-110"
                title="WhatsApp About This Trip"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </a>
            </div>

            {/* Bottom Scrubber & Video Controls */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-3 pt-6 z-30 flex flex-col gap-2">
              {/* Progress Track */}
              <div 
                className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer relative group/scrub"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  jumpToTime(pos * TOTAL_DURATION);
                }}
              >
                <div 
                  className="bg-[#E7A93B] h-full transition-all duration-100 rounded-full group-hover/scrub:bg-[#f3bc56]"
                  style={{ width: `${Math.min(100, (currentTime / TOTAL_DURATION) * 100)}%` }}
                />
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center justify-between text-[11px] text-stone-300 px-1">
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={togglePlay}
                    className="hover:text-white transition-colors cursor-pointer p-1"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono">{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span className="font-mono">{formatTime(TOTAL_DURATION)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => jumpToTime(0)} 
                    className="hover:text-white transition-colors cursor-pointer p-1"
                    title="Restart"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setIsFullModalOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer p-1"
                    title="Expand View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Story, Scene Chapters & Call to Action */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7A93B]/10 border border-[#E7A93B]/30 text-[#E7A93B] text-xs font-semibold">
              <Film className="w-3.5 h-3.5" />
              Live Evidence from Zanzibar, Tanzania
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Why It's Called <span className="text-[#E7A93B]">"Holiday Hype"</span>
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed">
              Travel shouldn't be a generic itinerary — it should be pure exhilaration. Watch our travelers and local hosts holding the official <strong>"Holiday Hype Travel & Tours: Come, Travel & Experience"</strong> banner before diving into the turquoise waters off Stone Town's historic seafront.
            </p>

            {/* Clickable Chapter Jumps */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Video Timeline (Click Any Scene)
                </span>
                <span className="text-[11px] text-[#E7A93B] font-semibold flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  5 Key Moments
                </span>
              </div>

              <div className="space-y-2">
                {SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => jumpToTime(scene.time)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      activeSceneIndex === idx
                        ? "bg-[#162D50] border-[#E7A93B] text-white shadow-lg ring-1 ring-[#E7A93B]/50"
                        : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        activeSceneIndex === idx ? "bg-[#E7A93B] text-[#122544]" : "bg-white/10 text-stone-300"
                      }`}>
                        {formatTime(scene.time)}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          {scene.title}
                          {activeSceneIndex === idx && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E7A93B] inline-block animate-ping"></span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                          {scene.description}
                        </div>
                      </div>
                    </div>
                    <Play className={`w-3.5 h-3.5 flex-shrink-0 mt-1 ${activeSceneIndex === idx ? "text-[#E7A93B] fill-[#E7A93B]" : "text-stone-500"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Traveler Quote */}
            <div className="p-3.5 bg-white/5 border-l-2 border-[#E7A93B] rounded-r-lg text-xs text-stone-300 italic">
              "You don't just visit Africa with Holiday Hype; you feel every beat of the island. Unscripted joy, trusted hands, and memories for life."
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={zanzibarWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp About Zanzibar
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onBookZanzibar) {
                    onBookZanzibar();
                  } else {
                    window.location.href = "/packages";
                  }
                }}
                className="flex-1 bg-[#E7A93B] hover:bg-[#d6982b] text-[#122544] font-bold py-3 px-4 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all"
              >
                Explore Zanzibar Packages
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-1 gap-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                Verified Holiday Hype Experience
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#real-travel-gallery"
                  className="text-[#E7A93B] hover:underline cursor-pointer font-medium"
                >
                  View Photo Evidence ↓
                </a>
                <span className="text-stone-600">•</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-stone-400 hover:text-white cursor-pointer"
                >
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Modal View */}
      {isFullModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative w-full max-w-md aspect-[9/16] max-h-[90vh] bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
            <button
              type="button"
              onClick={() => setIsFullModalOpen(false)}
              className="absolute top-4 right-4 z-40 w-9 h-9 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
            >
              ✕
            </button>
            
            <div className="relative flex-1 w-full h-full">
              {hasNativeVideo && videoSrc ? (
                <video
                  ref={modalVideoRef}
                  src={videoSrc}
                  poster="/images/zanzibar_holiday_hype.jpg"
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  loop
                  controls
                />
              ) : (
                <div className="w-full h-full relative">
                  <img 
                    src={currentScene.image} 
                    alt={currentScene.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-[#E7A93B] uppercase tracking-wider">{currentScene.badge}</span>
                    <h3 className="font-serif text-xl font-bold text-white">{currentScene.title}</h3>
                    <p className="text-xs text-stone-300 mt-1">{currentScene.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
