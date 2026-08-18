import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderArticleContent = (content: string) => {
  const lines = content.split("\n");
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

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(\*\*(.*?)\*\*:?\s*)?(.*)$/);
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

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
  }, [post, navigate]);

  if (!post) return null;

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Layout>
      <SEO
        title={`${post.title} | Akirapa Home Care`}
        description={post.excerpt}
        image={post.image.startsWith("http") ? post.image : post.image}
        path={`/blog/${post.slug}`}
        type="article"
        article={{
          publishedTime: new Date(post.date).toISOString(),
          author: post.author,
          section: post.category,
        }}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-[0.29] mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#76248a]/70" />
        </div>
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>›</span>
            <span className="text-white/90">{post.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-user text-[#40ddd3]"></i>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-calendar-days text-[#40ddd3]"></i>
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-clock text-[#40ddd3]"></i>
              {post.readTime}
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-start">

            {/* Main Content */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-6">
                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden h-72 sm:h-96 -mx-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Excerpt highlight */}
                <p className="font-semibold text-lg text-gray-900 text-left border-l-4 border-[#76248a] pl-4 py-1 bg-[#76248a]/5 rounded-r-xl">
                  {post.excerpt}
                </p>

                {/* Article Content */}
                <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed text-base space-y-4 text-left">
                  {renderArticleContent(post.content)}
                </div>

                {/* CTA Box */}
                <div className="p-6 rounded-2xl bg-[#76248a]/5 border border-[#76248a]/20 mt-8 text-left space-y-2">
                  <h3 className="font-bold text-[#76248a] text-lg text-left">
                    Need Dedicated Care Support in Burlington, MA?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed text-left">
                    At Akirapa Home Care in Burlington, MA, our certified nursing assistants and care managers work closely with families to implement these strategies seamlessly. Whether your family needs hourly support or continuous daily care, we are here to support your journey.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-xl">
                      <Link to="/contact">Schedule Free Assessment</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#76248a] text-[#76248a] rounded-xl">
                      <a href="tel:3399701214">Call 339 970 1214</a>
                    </Button>
                  </div>
                </div>

                {/* Back Link */}
                <div className="pt-4 border-t border-gray-200">
                  <Button asChild variant="outline" className="border-[#76248a] text-[#76248a]">
                    <Link to="/blog">← Back to All Articles</Link>
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* More Articles */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-5">
                <h2 className="font-black text-gray-900 text-lg">More Articles</h2>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/blog/${p.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-gray-900 group-hover:text-[#76248a] transition-colors leading-snug">
                          {p.title}
                        </p>
                        <span className="text-xs text-gray-500">{p.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-[#76248a] text-white p-6 rounded-3xl shadow-lg space-y-4">
                <i className="fa-solid fa-phone-volume text-3xl text-[#40ddd3]"></i>
                <h3 className="font-black text-white text-lg leading-snug">
                  Ready for a Free Care Assessment?
                </h3>
                <p className="text-white/80 text-sm">
                  Our Burlington care team is available 24/7 to discuss your family's options.
                </p>
                <a
                  href="tel:3399701214"
                  className="flex items-center gap-2 bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-extrabold px-5 py-3 rounded-xl transition-all hover:scale-105 text-sm"
                >
                  <i className="fa-solid fa-phone"></i>
                  Call 339 970 1214
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostPage;
