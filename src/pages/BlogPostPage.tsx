import React, { useState } from "react";
import { BlogPost } from "../lib/types";
import { ArrowLeft, Clock, User, Share2, Tag, Sparkles, BookOpen, MessageCircle } from "lucide-react";
import { siteConfig } from "../lib/config";

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onOpenPlanTrip: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, onOpenPlanTrip }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button and Share */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#122544] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-[#122544] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? "Link Copied!" : "Share Article"}</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#122544] text-white text-xs font-semibold">
            {post.category}
          </span>
          <span className="text-xs text-stone-500">•</span>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTimeMinutes} min read
          </span>
          <span className="text-xs text-stone-500">•</span>
          <span className="text-xs text-stone-500">{post.publishedAt}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#122544] tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 text-xs text-stone-600">
          <div className="w-8 h-8 rounded-full bg-[#E7A93B] text-[#122544] font-bold flex items-center justify-center">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-[#122544]">{post.author}</p>
            <p className="text-[11px] text-stone-400">Senior Safari Specialist & Field Contributor</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] bg-stone-100">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-800 text-sm leading-relaxed">
        <p className="font-serif text-lg text-stone-900 leading-relaxed font-medium italic border-l-4 border-[#E7A93B] pl-4 py-1">
          {post.excerpt}
        </p>

        <div className="space-y-4 pt-4 border-t border-stone-100">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="font-serif text-2xl font-bold text-[#122544] pt-4">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-serif text-xl font-bold text-[#122544] pt-2">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-stone-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[#D2573F]" />
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Safari Callout Box */}
      <div className="p-8 rounded-3xl bg-[#122544] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-bold">
            Inspired to Experience This in Person?
          </h3>
          <p className="text-xs text-slate-300">
            Let our safari specialists customize an itinerary incorporating the exact destinations and wildlife timing described in this guide.
          </p>
        </div>
        <button
          onClick={onOpenPlanTrip}
          className="px-6 py-3.5 rounded-xl bg-[#E7A93B] hover:bg-[#d89b30] text-[#122544] font-bold text-xs shadow-md transition-all whitespace-nowrap"
        >
          Plan This Trip
        </button>
      </div>
    </article>
  );
};
