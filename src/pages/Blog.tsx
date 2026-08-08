import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderArticleContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: { num?: string; title: string; text: string }[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <div key={`list-${elements.length}`} className="my-6 space-y-3">
          {currentList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/90 border border-gray-200/80 shadow-xs hover:border-[#76248a]/40 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#76248a] text-white font-black flex items-center justify-center text-sm shadow-sm mt-0.5">
                {item.num ? item.num : <i className="fa-solid fa-check text-xs"></i>}
              </div>
              <div className="space-y-1 text-left flex-1">
                {item.title && (
                  <h4 className="font-bold text-gray-900 text-base text-left">
                    {item.title}
                  </h4>
                )}
                {item.text && (
                  <p className="text-gray-700 text-sm leading-relaxed text-left">
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Match ordered item: e.g. "1. **Title**: text" or "1. text"
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(\*\*(.*?)\*\*:?\s*)?(.*)$/);
    // Match unordered item: e.g. "- **Title**: text" or "- text"
    const unorderedMatch = trimmed.match(/^[-*]\s+(\*\*(.*?)\*\*:?\s*)?(.*)$/);

    if (orderedMatch) {
      const num = orderedMatch[1];
      const title = orderedMatch[3] || "";
      const text = orderedMatch[4] || "";
      currentList.push({ num, title, text });
    } else if (unorderedMatch) {
      const title = unorderedMatch[2] || "";
      const text = unorderedMatch[3] || "";
      currentList.push({ title, text });
    } else {
      flushList();
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed text-base mb-4 text-left">
          {parseBoldText(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <Layout>
      <SEO
        title="Our Blog | Senior Care Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
      />

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
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Senior Care Blog
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Expert insights, caregiver burnout strategies, fall prevention tips, and family guidance from Akirapa Home Care specialists.
          </p>
        </div>
      </section>

      {/* Main Blog List / Article View */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          {!selectedPost ? (
            /* Blog Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-calendar-days text-[#76248a]"></i>
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-clock text-[#76248a]"></i>
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#76248a] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <i className="fa-solid fa-user text-[#76248a]"></i>
                      {post.author}
                    </span>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76248a] hover:text-[#561868]"
                    >
                      <span>Read Article</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Single Article Full View */
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#76248a] hover:underline mb-2"
              >
                ← Back to All Senior Care Articles
              </button>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-72 sm:h-96">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed text-base space-y-4 text-left">
                <p className="font-semibold text-lg text-gray-900 text-left border-l-4 border-[#76248a] pl-4 py-1 bg-[#76248a]/5 rounded-r-xl">
                  {selectedPost.excerpt}
                </p>

                {renderArticleContent(selectedPost.content)}

                <div className="p-6 rounded-2xl bg-[#76248a]/5 border border-[#76248a]/20 mt-8 text-left space-y-2">
                  <h4 className="font-bold text-[#76248a] text-lg text-left">Need Dedicated Care Support in Burlington, MA?</h4>
                  <p className="text-gray-700 text-sm leading-relaxed text-left">
                    At Akirapa Home Care in Burlington, MA, our certified nursing assistants and care managers work closely with families to implement these strategies seamlessly. Whether your family needs hourly support or continuous daily care, we are here to support your journey.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedPost(null)} className="border-[#76248a] text-[#76248a]">
                  View Other Articles
                </Button>
                <Button asChild className="bg-[#76248a] text-white font-bold">
                  <Link to="/contact">Discuss Care Options With Us</Link>
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
