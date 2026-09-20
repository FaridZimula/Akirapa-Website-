import { useState, useMemo } from "react";
import { useData, BlogPost } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Search, Newspaper, Calendar, User } from "lucide-react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const BlogEditor = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const emptyForm: Omit<BlogPost, "id"> = {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    author: "Akirapa Home Care",
    category: "Senior Living",
    readTime: "4 min read",
    image: "",
  };

  const [formState, setFormState] = useState<Omit<BlogPost, "id">>(emptyForm);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogPosts, searchTerm]);

  const handleOpenAddModal = () => {
    setEditingPost(null);
    setSlugManuallyEdited(false);
    setFormState(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setSlugManuallyEdited(true);
    setFormState({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      image: post.image,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormState((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : slugify(title),
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalSlug = formState.slug.trim() || slugify(formState.title);

    if (editingPost && editingPost.id) {
      await updateBlogPost({
        ...editingPost,
        ...formState,
        slug: finalSlug,
      });
      toast({
        title: "Blog Post Updated",
        description: `Successfully updated "${formState.title}". Changes are live on /blog.`,
      });
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        ...formState,
        slug: finalSlug,
      };
      await addBlogPost(newPost);
      toast({
        title: "Blog Post Published",
        description: `Successfully published "${formState.title}". Visible now on /blog.`,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (post: BlogPost) => {
    if (window.confirm(`Are you sure you want to delete the blog post: "${post.title}"?`)) {
      await deleteBlogPost(post.id);
      toast({
        title: "Blog Post Deleted",
        description: `"${post.title}" has been removed from the blog.`,
      });
    }
  };

  return (
    <div className="space-y-8 font-sans text-left">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#76248a]">
            Manage Blog Posts
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Publish, edit, or remove articles displayed on the public Blog page (/blog).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleOpenAddModal}
            className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1 text-white" />
            <span>Add New Blog Post</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#76248a] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Blog Posts</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{blogPosts.length} Articles</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#40ddd3] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Most Recent</p>
            <h3 className="text-lg font-extrabold text-gray-900">{blogPosts[0]?.date || "—"}</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search post titles or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 text-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Blog Posts Management List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Blog Post Database</h2>
          <span className="text-xs font-semibold text-gray-500">Showing {filteredPosts.length} post(s)</span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredPosts.map((post) => (
              <div key={post.id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left Post Information */}
                <div className="flex items-start gap-4">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                    />
                  )}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#76248a]">{post.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#76248a]" />
                        {post.author}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-gray-700">{post.category}</span>
                      <span>•</span>
                      <span className="text-gray-400">{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => handleOpenEditModal(post)}
                    className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1 text-white" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-700 text-base">No blog posts found</h4>
            <p className="text-gray-500 text-xs">Try adjusting your search query or click "Add New Blog Post" to create one.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Blog Post Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-gray-100 my-auto text-left">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-[#76248a]">
                  {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {editingPost ? "Modify the fields below. Changes will sync immediately." : "Fill out the fields to publish a new article."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-xs font-bold text-gray-800 mb-1 block">
                  Post Title *
                </Label>
                <Input
                  id="title"
                  required
                  placeholder="e.g. 5 Ways to Regain Your Energy After Caregiver Burnout"
                  value={formState.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-gray-50 h-11 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="slug" className="text-xs font-bold text-gray-800 mb-1 block">
                  URL Slug (auto-generated, editable) *
                </Label>
                <Input
                  id="slug"
                  required
                  placeholder="5-ways-to-regain-your-energy"
                  value={formState.slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setFormState({ ...formState, slug: slugify(e.target.value) });
                  }}
                  className="bg-gray-50 h-11 text-xs font-mono"
                />
                <p className="text-[10px] text-gray-400 mt-1">Lives at /blog/{formState.slug || "your-slug-here"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-xs font-bold text-gray-800 mb-1 block">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    required
                    placeholder="Cathy Akirapa, CNA"
                    value={formState.author}
                    onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-xs font-bold text-gray-800 mb-1 block">
                    Category *
                  </Label>
                  <Input
                    id="category"
                    required
                    placeholder="Caregiver Support"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-xs font-bold text-gray-800 mb-1 block">
                    Publish Date Label
                  </Label>
                  <Input
                    id="date"
                    placeholder="March 21, 2025"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="readTime" className="text-xs font-bold text-gray-800 mb-1 block">
                    Read Time Label
                  </Label>
                  <Input
                    id="readTime"
                    placeholder="4 min read"
                    value={formState.readTime}
                    onChange={(e) => setFormState({ ...formState, readTime: e.target.value })}
                    className="bg-gray-50 h-11 text-xs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image" className="text-xs font-bold text-gray-800 mb-1 block">
                  Cover Image URL *
                </Label>
                <Input
                  id="image"
                  required
                  placeholder="https://images.unsplash.com/... or /your-image.jpg"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="bg-gray-50 h-11 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-xs font-bold text-gray-800 mb-1 block">
                  Excerpt (shown on the blog list & shared previews) *
                </Label>
                <Textarea
                  id="excerpt"
                  required
                  placeholder="A short 1-2 sentence summary of the article..."
                  value={formState.excerpt}
                  onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                  className="bg-gray-50 text-xs h-20"
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-xs font-bold text-gray-800 mb-1 block">
                  Full Article Content *
                </Label>
                <Textarea
                  id="content"
                  required
                  placeholder={"Write the full article. Use **bold** for emphasis, and numbered or bulleted lines for lists."}
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  className="bg-gray-50 text-xs h-56 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <Button
                  type="submit"
                  className="flex-1 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md"
                >
                  {editingPost ? "Save Changes" : "Publish Blog Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3.5 text-xs font-bold text-gray-600 border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BlogEditor;
