import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const TOPICS = [
  { id: "all", label: "All Topics", icon: "fa-newspaper" },
  { id: "Caregiver Support", label: "Caregiver Support", icon: "fa-heart-pulse" },
  { id: "Respite Care", label: "Respite Care", icon: "fa-couch" },
  { id: "Senior Safety", label: "Senior Safety", icon: "fa-shield-halved" },
  { id: "Senior Living", label: "Senior Living", icon: "fa-house-user" },
  { id: "Memory & Dementia", label: "Memory & Dementia", icon: "fa-brain" },
  { id: "Post-Hospital Recovery", label: "Post-Hospital Recovery", icon: "fa-hospital-user" },
];

const POSTS_PER_PAGE = 6; // 6 posts per page (2 rows of 3 columns, or 3 rows of 2 columns)

const getPostViews = (post: BlogPost): number => {
  try {
    const key = `akirapa_blog_views_${post.id}`;
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : post.initialViews || 350;
  } catch {
    return post.initialViews || 350;
  }
};

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  // Floating topics widget state
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 24, y: 140 });
  const dragDistanceRef = React.useRef(0);
  const startPosRef = React.useRef({ x: 0, y: 0 });
  const navCardRef = React.useRef<HTMLDivElement>(null);

  // Load view counts on mount
  useEffect(() => {
    const map: Record<string, number> = {};
    blogPosts.forEach((post) => {
      map[post.id] = getPostViews(post);
    });
    setViewsMap(map);
  }, []);

  // Filter posts by topic
  const filteredPosts = selectedTopic === "all"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedTopic);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentPage(1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    dragDistanceRef.current = 0;
    setIsDragging(true);
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
    const dist = Math.hypot(e.clientX - startPosRef.current.x, e.clientY - startPosRef.current.y);
    dragDistanceRef.current = dist;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setCardPosition({
      x: Math.max(8, Math.min(window.innerWidth - 290, newX)),
      y: Math.max(80, Math.min(window.innerHeight - 100, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    dragDistanceRef.current = 0;
    setIsDragging(true);
    const rect = navCardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dist = Math.hypot(touch.clientX - startPosRef.current.x, touch.clientY - startPosRef.current.y);
    dragDistanceRef.current = dist;
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    setCardPosition({
      x: Math.max(8, Math.min(window.innerWidth - 290, newX)),
      y: Math.max(80, Math.min(window.innerHeight - 100, newY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleHeaderClick = () => {
    if (dragDistanceRef.current < 8) {
      setIsTopicsOpen((prev) => !prev);
    }
  };

  return (
    <Layout>
      <SEO
        title="Our Blog | Senior Care Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
        path="/blog"
      />

      {/* Floating Interactive & Draggable Topics Navigator Widget */}
      <div
        ref={navCardRef}
        className="fixed z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-2 border-[#76248a]/35 bg-white shadow-2xl animate-pulse-glow transition-shadow duration-300"
        style={{ left: `${cardPosition.x}px`, top: `${cardPosition.y}px` }}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleHeaderClick}
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          className="flex items-center justify-between bg-gradient-to-r from-[#76248a] via-[#561868] to-[#218981] px-4 py-3.5 text-white select-none button-shimmer shadow-md transition-all hover:brightness-105"
          title="Click anywhere to shrink/expand topics, or drag to move"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#40ddd3]"></span>
            </span>
            <i className="fa-solid fa-layer-group text-[#40ddd3] text-base"></i>
            <div>
              <span className="text-xs font-black uppercase tracking-wider block">Blog Topics Navigator</span>
              <span className="text-[10px] text-white/85 block font-medium -mt-0.5">
                Click to {isTopicsOpen ? "shrink" : "explore 7 topics"} • Drag to move
              </span>
            </div>
          </div>
          <div className="rounded-lg p-1.5 bg-white/15 hover:bg-white/25 transition-transform duration-300">
            <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isTopicsOpen ? "rotate-180 text-[#40ddd3]" : "rotate-0 text-white"}`}></i>
          </div>
        </div>

        {isTopicsOpen && (
          <nav className="max-h-80 space-y-1.5 overflow-y-auto p-3 bg-white animate-fadeIn" aria-label="Blog Topics">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              const count = topic.id === "all"
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === topic.id).length;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#76248a] text-white shadow-md scale-[1.02]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#76248a]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <i className={`fa-solid ${topic.icon} w-4 text-center ${isSelected ? "text-[#40ddd3]" : "text-[#76248a]"}`}></i>
                    <span>{topic.label}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-[#40ddd3] text-gray-950" : "bg-gray-200 text-gray-700"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Hero Header with 29% Opacity Background Image */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        {/* Background Image at 29% Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (4).jpg"
            alt="Akirapa Senior Care Blog"
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>

        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#40ddd3] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-[#40ddd3]/30">
            <i className="fa-solid fa-book-open"></i> Senior Care Insights & Guides
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Senior Care Blog
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Expert insights, caregiver burnout strategies, fall prevention tips, and family guidance from Akirapa Home Care specialists.
          </p>

          {/* Inline Quick Topic Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  selectedTopic === topic.id
                    ? "bg-[#40ddd3] text-gray-950 shadow-md scale-105"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Blog List View with Pagination */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto space-y-10">
          {/* Active Filter Status & Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-600">
              Showing <span className="text-[#76248a] font-bold">{filteredPosts.length === 0 ? 0 : startIndex + 1}</span> to{" "}
              <span className="text-[#76248a] font-bold">
                {Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)}
              </span>{" "}
              of <span className="text-gray-900 font-bold">{filteredPosts.length}</span> articles
              {selectedTopic !== "all" && (
                <span className="ml-2 inline-flex items-center gap-1.5 bg-[#76248a]/10 text-[#76248a] text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {selectedTopic}
                  <button onClick={() => setSelectedTopic("all")} className="hover:text-red-500">×</button>
                </span>
              )}
            </div>

            {selectedTopic !== "all" && (
              <button
                onClick={() => setSelectedTopic("all")}
                className="text-xs font-bold text-[#76248a] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const views = viewsMap[post.id] || post.initialViews || 350;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between picture-card-pro group"
                >
                  <div>
                    <Link to={`/blog/${post.slug}`} className="block h-52 overflow-hidden relative picture-glaze">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover img-zoom-hover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 floating-photo-badge text-[#76248a] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm z-10">
                        {post.category}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#76248a]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </Link>
                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-medium">
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

                        {/* Real-Time LocalStorage Views Counter Badge */}
                        <span className="inline-flex items-center gap-1 bg-[#40ddd3]/15 text-[#218981] font-bold text-[11px] px-2 py-0.5 rounded-md">
                          <i className="fa-regular fa-eye"></i>
                          <span>{views.toLocaleString()} views</span>
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

                  <div className="px-6 py-5 mt-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <i className="fa-solid fa-user-pen text-[#76248a]"></i>
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105 button-shimmer"
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 pb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-[#76248a] text-[#76248a] font-bold rounded-xl disabled:opacity-40"
              >
                <i className="fa-solid fa-chevron-left mr-1.5 text-xs"></i>
                Previous
              </Button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
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
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-[#76248a] text-[#76248a] font-bold rounded-xl disabled:opacity-40"
              >
                Next
                <i className="fa-solid fa-chevron-right ml-1.5 text-xs"></i>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
