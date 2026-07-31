import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <Layout>
      <SEO
        title="Our Blog | Senior Care Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[#76248a] via-[#561868] to-[#40ddd3] text-white">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#40ddd3] bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Senior Care Advice & Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Senior Care Blog
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Expert insights, caregiver burnout strategies, fall prevention tips, and family guidance from Akirapa Home Care specialists.
          </p>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          {!selectedPost ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#76248a] text-[#40ddd3] text-xs font-bold px-3 py-1 rounded-full shadow">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#76248a]" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#76248a]" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl font-black text-gray-900 group-hover:text-[#76248a] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-0 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#76248a]" />
                      {post.author}
                    </span>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1 text-[#76248a] font-bold text-sm hover:text-[#561868]"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Single Article View */
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-8">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#76248a] bg-[#76248a]/10 px-4 py-2 rounded-xl hover:bg-[#76248a] hover:text-white transition-colors"
              >
                ← Back to All Articles
              </button>

              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#76248a] bg-[#40ddd3]/20 px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-72">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none text-gray-700 space-y-4 whitespace-pre-line leading-relaxed">
                {selectedPost.content}
              </div>

              <div className="pt-8 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-sm font-bold text-[#76248a] hover:underline"
                >
                  ← Back to All Articles
                </button>

                <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-bold">
                  <Link to="/contact">Discuss Care Needs</Link>
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
