import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";

const BLOG_TOPICS = [
  { id: "all", label: "All Topics", icon: "fa-border-all" },
  { id: "Caregiver Support", label: "Caregiver Support", icon: "fa-heart-pulse" },
  { id: "Respite Care", label: "Respite Care", icon: "fa-user-nurse" },
  { id: "Senior Safety", label: "Senior Safety", icon: "fa-shield-halved" },
  { id: "Senior Living", label: "Senior Living", icon: "fa-house-medical" },
  { id: "Alzheimer's & Dementia", label: "Memory Care", icon: "fa-brain" },
  { id: "Nutrition & Wellness", label: "Nutrition & Wellness", icon: "fa-apple-whole" },
];

const POSTS_PER_PAGE = 6; // 2 rows of 3 cards (max 3 lines of blogs per page)

const Blog = () => {
  const { blogPosts, blogViews } = useData();
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Floating Draggable Widget State
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [cardPosition, setCardPosition] = useState({ x: 20, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const navCardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasMoved(false);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    const rect = navCardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
    if (distance > 5) setHasMoved(true);

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setCardPosition({ x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleMouseUp = () => {
    if (isDragging && !hasMoved) {
      setIsNavOpen((open) => !open);
    }
    setIsDragging(false);
  };

  // Filter posts by selected topic
  const filteredPosts = selectedTopic === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category.toLowerCase().includes(selectedTopic.toLowerCase()));

  // Calculate Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <SEO
        title="Our Blog | Senior Care Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
        path="/blog"
      />

      {/* Shrinkable Floating Draggable Topics Navigation Card */}
      <div
        ref={navCardRef}
        className="fixed z-50 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-2 border-[#76248a] bg-white shadow-2xl animate-pulse-glow"
        style={{ left: `${cardPosition.x}px`, top: `${cardPosition.y}px` }}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          className="flex items-center justify-between bg-gradient-to-r from-[#76248a] via-[#561868] to-[#76248a] px-4 py-3 text-white select-none transition-colors hover:brightness-110"
          title="Click anywhere to shrink/expand topics or drag to move"
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-grip-vertical text-white/60"></i>
            <i className="fa-solid fa-layer-group text-[#40ddd3]"></i>
            <span className="text-xs font-black uppercase tracking-wider">Blog Topics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#40ddd3] text-[#561868] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {isNavOpen ? "Shrink" : "Expand"}
            </span>
            <button
              type="button"
              aria-label={isNavOpen ? "Shrink topics" : "Expand topics"}
              className="rounded-lg p-1 hover:bg-white/20 text-white"
            >
              <i className={`fa-solid fa-chevron-${isNavOpen ? "up" : "down"}`}></i>
            </button>
          </div>
        </div>

        {isNavOpen && (
          <nav className="max-h-80 space-y-1 overflow-y-auto p-3 bg-white" aria-label="Blog Topics">
            {BLOG_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicSelect(topic.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-all ${
                  selectedTopic === topic.id
                    ? "bg-[#76248a] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#76248a]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className={`fa-solid ${topic.icon} w-4 text-center text-[#40ddd3]`}></i>
                  <span>{topic.label}</span>
                </div>
                {selectedTopic === topic.id && (
                  <i className="fa-solid fa-check text-xs text-white"></i>
                )}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Hero Header with 29% Opacity Background Image */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (4).jpg"
            alt="Akirapa Senior Care Blog"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Senior Care Blog
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Expert insights, caregiver burnout strategies, fall prevention tips, and family guidance from Akirapa Home Care specialists.
          </p>
        </div>
      </section>

      {/* Main Blog List View */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto space-y-12">
          {/* Active Filter Indicator */}
          {selectedTopic !== "all" && (
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Filtered by:</span>
                <span className="bg-[#76248a] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedTopic}
                </span>
              </div>
              <button
                onClick={() => handleTopicSelect("all")}
                className="text-xs font-bold text-[#76248a] hover:underline flex items-center gap-1"
              >
                <span>Clear Filter</span>
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          )}

          {/* Grid of Blog Posts (Max 3 lines/rows per page) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const viewsCount = blogViews[post.slug] || 0;
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div>
                    <Link to={`/blog/${post.slug}`} className="block h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover img-hover-effect"
                      />
                    </Link>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <i className="fa-solid fa-calendar-days text-[#76248a]"></i>
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fa-solid fa-clock text-[#76248a]"></i>
                            {post.readTime}
                          </span>
                        </div>

                        {/* Views Counter Badge */}
                        <span className="flex items-center gap-1 font-bold text-[#76248a] bg-[#76248a]/10 px-2.5 py-0.5 rounded-full">
                          <i className="fa-solid fa-eye text-xs text-[#76248a]"></i>
                          {viewsCount} views
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 leading-snug">
                        <Link to={`/blog/${post.slug}`} className="group-hover:text-[#76248a] transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-5 mt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <i className="fa-solid fa-user text-[#76248a]"></i>
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105 btn-animated"
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
            <div className="flex justify-center items-center gap-2 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="border-gray-300 font-bold"
              >
                ‹ Previous
              </Button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      currentPage === pageNum
                        ? "bg-[#76248a] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="border-gray-300 font-bold"
              >
                Next ›
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
