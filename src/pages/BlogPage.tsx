import React, { useState } from "react";
import { BlogPost } from "../lib/types";
import { Search, Clock, User, Tag, Sparkles, ArrowRight } from "lucide-react";

interface BlogPageProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all",
    "Safari Guides",
    "Wildlife Insights",
    "Travel Tips",
    "Photography",
    "Destination Focus",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#122544] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A93B]/20 text-[#E7A93B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Field Guides & Expert Advice
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
          The Holiday Hype Safari Journal
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Insider guides on the Great Migration, gorilla trekking packing essentials, safari camera setups, and cultural etiquettes written by certified African naturalists.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#122544] text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & tips..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#122544]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#122544]/90 backdrop-blur-md text-white text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTimeMinutes} min read
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#122544] group-hover:text-[#D2573F] transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-2 text-xs">
              <span className="font-semibold text-stone-700">{post.author}</span>
              <span className="flex items-center gap-1 font-bold text-[#122544] group-hover:text-[#D2573F]">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
