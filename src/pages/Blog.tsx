import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <Layout>
      <SEO
        title="Our Blog | Senior Care Advice & Guides | Akirapa Home Care"
        description="Read senior care guides, caregiver burnout tips, fall prevention strategies, and in-home care advice from Akirapa Home Care."
        path="/blog"
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

      {/* Main Blog List View */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <Link to={`/blog/${post.slug}`} className="block h-52 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
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
                    className="inline-flex items-center gap-2 bg-[#76248a] hover:bg-[#561868] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                  >
                    <span>Read Article</span>
                    <i className="fa-solid fa-arrow-right text-xs text-white"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
