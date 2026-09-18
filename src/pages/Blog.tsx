import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { blogPosts, BLOG_TOPICS, BlogPost } from "@/data/blogPosts";
import { getBlogPostViews } from "@/lib/blogViews";

const POSTS_PER_PAGE = 6; // 2 rows of 3 columns, clean pagination

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  // Floating draggable & shrinkable topics widget state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 20, y: 140 });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const navCardRef = React.useRef<HTMLDivElement>(null);

  // Initialize and load views for each post
  useEffect(() => {
    const initialViews: Record<string, number> = {};
    blogPosts.forEach((post) => {
      initialViews[post.slug] = getBlogPostViews(post.slug, post.views);
    });
    setViewsMap(initialViews);
  }, []);

  // Filter posts based on selected topic
  const filteredPosts = selectedTopic === "all"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedTopic);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Topic selection handler
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentPage(1);
    const element = document.getElementById("blog-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("nav, button, a")) return;
    setIsDragging(true);
    setHasMoved(false);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    const rect = navCardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartPos) return;
    const dx = Math.abs(e.clientX - dragStartPos.x);
    const dy = Math.abs(e.clientY - dragStartPos.y);
    if (dx > 5 || dy > 5) {
      setHasMoved(true);
    }
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setCardPosition({ x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleMouseUp = () => {
    if (!hasMoved) {
      setIsNavOpen((open) => !open);
    }
    setIsDragging(false);
    setDragStartPos(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("nav, button, a")) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    const rect = navCardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartPos) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - dragStartPos.x);
    const dy = Math.abs(touch.clientY - dragStartPos.y);
    if (dx > 5 || dy > 5) {
      setHasMoved(true);
    }
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    setCardPosition({ x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleTouchEnd = () => {
    if (!hasMoved) {
      setIsNavOpen((open) => !open);
    }
    setIsDragging(false);
    setDragStartPos(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridEl = document.getElementById("blog-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <SEO
        title="Our Senior Care Blog | Expert Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
        path="/blog"
      />

      {/* Floating Draggable & Shrinkable Topics Widget */}
      <div
        ref={navCardRef}
        className="fixed z-50 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-2 border-[#76248a]/30 bg-white shadow-2xl animate-pulse-glow transition-shadow duration-300"
        style={{ left: `${cardPosition.x}px`, top: `${cardPosition.y}px` }}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          className="flex items-center justify-between bg-gradient-to-r from-[#76248a] via-[#561868] to-[#40ddd3] px-4 py-3 text-white select-none button-shimmer"
          title="Click anywhere to open/shrink topics, or drag to reposition"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#40ddd3]"></span>
            </span>
            <i className="fa-solid fa-folder-open text-[#40ddd3] text-sm"></i>
            <div>
              <span className="text-xs font-black uppercase tracking-wider block">Blog Topics (7)</span>
              <span className="text-[10px] text-white/80 block -mt-0.5">
                Click to {isNavOpen ? "shrink" : "explore topics"}
              </span>
            </div>
          </div>
          <div className="rounded-lg p-1.5 bg-white/10 hover:bg-white/20 transition-colors">
            <i className={`fa-solid fa-chevron-${isNavOpen ? "up" : "down"} text-sm transition-transform duration-300`}></i>
          </div>
        </div>

        {isNavOpen && (
          <nav className="max-h-80 space-y-1.5 overflow-y-auto p-3" aria-label="Blog Topics">
            {BLOG_TOPICS.map((topic) => {
              const count = topic.id === "all"
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === topic.id).length;
              const isSelected = selectedTopic === topic.id;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#76248a] text-white shadow-sm"
                      : "text-gray-700 hover:bg-[#76248a]/10 hover:text-[#76248a]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <i className={`fa-solid ${topic.icon} text-sm ${isSelected ? "text-[#40ddd3]" : "text-[#76248a]"}`}></i>
                    <span className="truncate">{topic.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Hero Header with Background Image and Glass Gradient */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (4).jpg"
            alt="Akirapa Senior Care Blog"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/75" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-[#40ddd3] font-extrabold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
            Caregiver Resources & Articles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Our Senior Care Blog
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Clinical insights, caregiver burnout strategies, fall prevention tips, and family guidance from Akirapa Home Care specialists.
          </p>

          {/* Quick Topic Filter Chips on Hero */}
          <div className="flex flex-wrap justify-center gap-2 pt-4 max-w-4xl mx-auto">
            {BLOG_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                  selectedTopic === topic.id
                    ? "bg-[#40ddd3] text-gray-900 font-extrabold shadow-md scale-105"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Blog List Section */}
      <section id="blog-grid" className="section-padding bg-gray-50 scroll-mt-28">
        <div className="container-narrow mx-auto space-y-10">
          {/* Active Filter Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                {selectedTopic === "all" ? "All Healthcare Articles" : `${selectedTopic} Articles`}
              </h2>
              <p className="text-xs text-gray-500 pt-0.5">
                Showing {filteredPosts.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} published guides
              </p>
            </div>

            {selectedTopic !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectTopic("all")}
                className="text-xs border-gray-300 text-gray-700 hover:text-[#76248a]"
              >
                <i className="fa-solid fa-xmark mr-1.5"></i>
                Clear Topic Filter
              </Button>
            )}
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const views = viewsMap[post.slug] || post.views;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div>
                    <Link to={`/blog/${post.slug}`} className="block h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover img-zoom-hover"
                      />
                      <span className="absolute top-3 right-3 bg-[#76248a]/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </Link>

                    <div className="p-6 space-y-3">
                      {/* Meta: Date, Read Time, and Live Views Counter */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-calendar-days text-[#76248a]"></i>
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-clock text-[#76248a]"></i>
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-[#76248a] font-bold bg-[#76248a]/10 px-2 py-0.5 rounded-md ml-auto">
                          <i className="fa-solid fa-eye text-[#76248a]"></i>
                          <span>{views.toLocaleString()} views</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 leading-snug">
                        <Link to={`/blog/${post.slug}`} className="group-hover:text-[#76248a] transition-colors">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-5 mt-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <i className="fa-solid fa-user-nurse text-[#76248a]"></i>
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all duration-300 hover:scale-105 button-shimmer"
                    >
                      <span>Read Article</span>
                      <i className="fa-solid fa-arrow-right text-xs text-white"></i>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border-gray-200 text-gray-700 hover:text-[#76248a] disabled:opacity-40"
                >
                  <i className="fa-solid fa-chevron-left mr-1.5 text-xs"></i>
                  Previous
                </Button>

                <div className="flex items-center gap-1.5">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? "bg-[#76248a] text-white shadow-md scale-105"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border-gray-200 text-gray-700 hover:text-[#76248a] disabled:opacity-40"
                >
                  Next
                  <i className="fa-solid fa-chevron-right ml-1.5 text-xs"></i>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
