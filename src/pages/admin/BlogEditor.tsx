import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { BlogPost } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { compressImage } from "@/lib/image-utils";
import {
  AKIRAPA_CATEGORIES,
  AkirapaCategory,
  parseFacebookPostToBlog,
  slugify,
  formatBlogDate,
  calculateReadTime
} from "@/lib/facebookPostParser";
import {
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Search,
  Upload,
  RefreshCw,
  FileText,
  AlertTriangle,
  ArrowRight,
  Eye,
  Check
} from "lucide-react";
import { toast } from "sonner";

const SAMPLE_FACEBOOK_POST = `🚨 5 Signs Your Aging Loved One Needs Extra Care at Home 💙

Caring for an elderly parent is a journey of love, but small changes can happen so gradually that they often go unnoticed until a crisis occurs.

Here are 5 key indicators that it might be time for certified in-home care support:
1️⃣ Frequent unsteadiness, near-falls, or bruising
2️⃣ Missed prescription doses or medication confusion
3️⃣ Weight loss, empty fridges, or skipped meals
4️⃣ Decreased personal hygiene and laundry piling up
5️⃣ Increasing isolation, confusion, or caregiver burnout for family members

At Akirapa Home Care in Burlington, MA, our certified nursing assistants provide compassionate, dignified support with zero long-term contract lock-in.

📞 Call us today or visit akirapahomecare.com for a free consultation.
#SeniorCare #CaregiverSupport #BurlingtonMA #AgingInPlace #AkirapaHomeCare`;

const BlogEditor: React.FC = () => {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    publishBlogPost,
    unpublishBlogPost,
    deleteBlogPost,
    resetBlogPosts,
    isSupabaseConnected
  } = useData();

  // Filter & Search States
  const [activeTab, setActiveTab] = useState<"all" | "drafts" | "published">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dialog States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFacebookImportOpen, setIsFacebookImportOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Facebook Ingestor Form State
  const [fbText, setFbText] = useState("");
  const [fbImageUrl, setFbImageUrl] = useState("");
  const [fbAuthor, setFbAuthor] = useState("Akirapa Home Care");
  const [fbCategoryOverride, setFbCategoryOverride] = useState<AkirapaCategory | "auto">("auto");

  // Post Editor Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    category: "Caregiver Support",
    author: "Akirapa Home Care",
    date: formatBlogDate(),
    readTime: "4 min read",
    excerpt: "",
    content: "",
    image: "/CARE GIVER  (13).jpg",
    status: "published",
    source: "manual",
  });

  // Filter calculations
  const draftPosts = blogPosts.filter((p) => p.status === "draft");
  const publishedPosts = blogPosts.filter((p) => p.status !== "draft");

  const filteredPosts = blogPosts.filter((post) => {
    // Tab filter
    if (activeTab === "drafts" && post.status !== "draft") return false;
    if (activeTab === "published" && post.status === "draft") return false;

    // Category filter
    if (categoryFilter !== "all" && post.category !== categoryFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt?.toLowerCase().includes(q);
      const matchAuthor = post.author?.toLowerCase().includes(q);
      const matchCategory = post.category?.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt && !matchAuthor && !matchCategory) return false;
    }

    return true;
  });

  // Open Edit Dialog
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ ...post });
    setIsEditOpen(true);
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      id: `post-${Date.now()}`,
      title: "",
      slug: "",
      category: "Caregiver Support",
      author: "Cathy Akirapa, CNA",
      date: formatBlogDate(),
      readTime: "4 min read",
      excerpt: "",
      content: "",
      image: "/CARE GIVER  (13).jpg",
      status: "published",
      source: "manual",
    });
    setIsEditOpen(true);
  };

  // Handle Form Change with Slug auto-sync
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-update slug if it was empty or matching previous title
      slug: prev.slug === "" || prev.slug === slugify(prev.title || "") ? slugify(title) : prev.slug,
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData((prev) => ({
      ...prev,
      content,
      readTime: calculateReadTime(content),
    }));
  };

  // Image Upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawBase64 = event.target?.result as string;
        try {
          const compressed = await compressImage(rawBase64, 1200, 800, 0.75);
          setFormData((prev) => ({ ...prev, image: compressed }));
          toast.success("Image uploaded & optimized successfully!");
        } catch {
          setFormData((prev) => ({ ...prev, image: rawBase64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Blog Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.content?.trim()) {
      toast.error("Please provide both a Title and Article Content.");
      return;
    }

    setIsSaving(true);
    try {
      const postToSave: BlogPost = {
        id: editingPost ? editingPost.id : formData.id || `post-${Date.now()}`,
        slug: formData.slug?.trim() || slugify(formData.title),
        title: formData.title.trim(),
        excerpt: formData.excerpt?.trim() || formData.title.trim(),
        content: formData.content.trim(),
        date: formData.date || formatBlogDate(),
        author: formData.author?.trim() || "Akirapa Home Care",
        category: formData.category || "Caregiver Support",
        readTime: formData.readTime || calculateReadTime(formData.content || ""),
        image: formData.image || "/CARE GIVER  (13).jpg",
        initialViews: formData.initialViews || 350,
        status: formData.status || "published",
        source: formData.source || "manual",
        facebookPostId: formData.facebookPostId,
        facebookUrl: formData.facebookUrl,
        created_at: formData.created_at || new Date().toISOString(),
      };

      if (editingPost) {
        await updateBlogPost(postToSave);
      } else {
        await addBlogPost(postToSave);
      }
      setIsEditOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Process Facebook Ingestion
  const handleProcessFacebookPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbText.trim()) {
      toast.error("Please paste the Facebook post content.");
      return;
    }

    setIsSaving(true);
    try {
      const parsedPost = parseFacebookPostToBlog(fbText, fbImageUrl || undefined, {
        author: fbAuthor,
        customCategory: fbCategoryOverride !== "auto" ? fbCategoryOverride : undefined,
      });

      // Save as draft to review queue
      await addBlogPost(parsedPost);
      toast.success("Facebook post ingested into Review Queue as a Draft!");
      setIsFacebookImportOpen(false);
      setFbText("");
      setFbImageUrl("");
      setActiveTab("drafts"); // Switch tab to review queue
    } finally {
      setIsSaving(false);
    }
  };

  // Load sample post into Facebook Ingestor
  const handleLoadSampleFacebookPost = () => {
    setFbText(SAMPLE_FACEBOOK_POST);
    setFbImageUrl("/CARE GIVER  (16).jpg");
    setFbAuthor("Akirapa Home Care");
    setFbCategoryOverride("Senior Safety");
    toast.info("Sample Facebook post loaded. Click 'Convert to Blog Post' to process!");
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#76248a]/10 text-[#76248a] px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Share2 className="w-3.5 h-3.5" /> Social Media & Blog Ingestion
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Blog & Facebook Post Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl">
            Automatically ingest posts from your Facebook account into a review queue, format them into articles, and publish them directly to the live blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setIsFacebookImportOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-sm"
          >
            <i className="fa-brands fa-facebook-f"></i>
            Import / Test FB Post
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-[#76248a] hover:bg-[#5b196b] text-white font-bold gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Blog Post
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetBlogPosts}
            title="Reset articles to default preset"
            className="text-gray-500 hover:text-red-600"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Supabase status indicator */}
      <div className="flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isSupabaseConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
            }`}
          />
          <span className="font-semibold text-gray-600">
            {isSupabaseConnected
              ? "Live Supabase Cloud Synchronized — Changes instantly reflect on production"
              : "Local Storage Mode — Supabase keys not detected, changes saved locally"}
          </span>
        </div>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#76248a] hover:underline font-bold flex items-center gap-1"
        >
          View Live Blog <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Review Queue Banner (Option 3 Semi-Automated workflow) */}
      {draftPosts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-teal-500/10 border-2 border-amber-400/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-base">
                {draftPosts.length} Post{draftPosts.length > 1 ? "s" : ""} Awaiting Review in Draft Queue
              </h4>
              <p className="text-gray-600 text-xs">
                Incoming Facebook posts and drafts are kept private until you approve them. Review the formatting, click "Publish", and it goes live!
              </p>
            </div>
          </div>
          <Button
            onClick={() => setActiveTab("drafts")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shrink-0"
          >
            View Review Queue ({draftPosts.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Navigation Tabs & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#76248a] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Posts ({blogPosts.length})
          </button>

          <button
            onClick={() => setActiveTab("drafts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "drafts"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>Review Queue / Drafts</span>
            {draftPosts.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "drafts" ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-800"
              }`}>
                {draftPosts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("published")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "published"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Published ({publishedPosts.length})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl bg-gray-50 border-gray-200"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 h-9 text-xs rounded-xl bg-gray-50 border-gray-200">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {AKIRAPA_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts Grid / List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#76248a] flex items-center justify-center mx-auto text-2xl font-black">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No blog posts found</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {activeTab === "drafts"
              ? "All Facebook imports and drafts have been reviewed and published!"
              : "Try adjusting your search filters or click 'New Blog Post' to add an article."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isDraft = post.status === "draft";
            const isFacebook = post.source === "facebook";

            return (
              <div
                key={post.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition-all flex flex-col justify-between ${
                  isDraft
                    ? "border-amber-300 ring-2 ring-amber-200/50 hover:shadow-md"
                    : "border-gray-200/80 hover:border-[#76248a]/30 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Image header with status & source badges */}
                  <div className="h-48 overflow-hidden relative group bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {isDraft ? (
                        <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Draft / Pending
                        </span>
                      ) : (
                        <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      )}

                      {isFacebook && (
                        <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <i className="fa-brands fa-facebook-f text-[9px]"></i> FB Import
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Publish / Unpublish Toggle */}
                    {isDraft ? (
                      <Button
                        size="sm"
                        onClick={() => publishBlogPost(post.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-8 px-3 gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Publish
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => unpublishBlogPost(post.id)}
                        className="text-gray-600 hover:text-amber-700 text-xs h-8 px-2.5"
                        title="Unpublish back to draft mode"
                      >
                        Move to Draft
                      </Button>
                    )}

                    {/* Preview Live link */}
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#76248a] hover:border-[#76248a]/40 shadow-xs"
                      title="Preview article on live site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Edit Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(post)}
                      className="text-gray-700 hover:text-[#76248a] text-xs h-8 px-2.5 gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                          deleteBlogPost(post.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DIALOG 1: FACEBOOK POST INGESTOR & TESTER */}
      <Dialog open={isFacebookImportOpen} onOpenChange={setIsFacebookImportOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
          <DialogHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold w-fit">
              <i className="fa-brands fa-facebook-f"></i> Facebook Direct Ingestor
            </div>
            <DialogTitle className="text-2xl font-black text-gray-900">
              Import Facebook Post into Blog
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-xs">
              Paste the text and photo from any Facebook post. The intelligent parser will automatically format it with a captivating title, clinical category, SEO excerpt, and markdown lists, then send it straight to your Review Queue as a Draft.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleProcessFacebookPost} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-gray-700">Facebook Post Text / Caption *</Label>
                <button
                  type="button"
                  onClick={handleLoadSampleFacebookPost}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Load Sample Post
                </button>
              </div>
              <Textarea
                rows={6}
                value={fbText}
                onChange={(e) => setFbText(e.target.value)}
                placeholder="Paste the raw text of your Facebook post here..."
                required
                className="rounded-xl border-gray-200 text-xs leading-relaxed"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Photo URL (Optional)</Label>
                <Input
                  type="url"
                  value={fbImageUrl}
                  onChange={(e) => setFbImageUrl(e.target.value)}
                  placeholder="https://... or /CARE GIVER (13).jpg"
                  className="rounded-xl border-gray-200 text-xs"
                />
                <p className="text-[10px] text-gray-400">If blank, a relevant Akirapa care image will be selected automatically.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Category</Label>
                <Select
                  value={fbCategoryOverride}
                  onValueChange={(val) => setFbCategoryOverride(val as AkirapaCategory | "auto")}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 text-xs">
                    <SelectValue placeholder="Auto-detect based on text" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">✨ Auto-Detect from Content</SelectItem>
                    {AKIRAPA_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Author Name</Label>
              <Input
                type="text"
                value={fbAuthor}
                onChange={(e) => setFbAuthor(e.target.value)}
                className="rounded-xl border-gray-200 text-xs"
              />
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Option 3 Workflow In Action:
              </p>
              <p className="text-blue-800/90 text-[11px] leading-relaxed">
                When submitted, this post will enter your <strong>Review Queue (Drafts)</strong>. It will NOT appear on the public website until you click "Publish". You can review, refine, or edit it anytime.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFacebookImportOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2"
              >
                {isSaving ? "Converting..." : "Convert & Send to Review Queue"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: FULL BLOG POST CREATE / EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-black text-gray-900">
              {editingPost ? "Edit Blog Article" : "Create New Blog Article"}
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-xs">
              Configure article details, formatting, categories, and live publication status.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePost} className="space-y-5 pt-3">
            {/* Status toggle banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <div>
                <span className="text-xs font-bold text-gray-900 block">Publication Status</span>
                <span className="text-[11px] text-gray-500 block">
                  {formData.status === "published"
                    ? "Live on the website for public visitors."
                    : "Draft mode: Hidden from public, only visible in Admin."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, status: "draft" }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    formData.status === "draft"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, status: "published" }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    formData.status === "published"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Article Title *</Label>
              <Input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. 5 Fall Prevention Strategies for Seniors Living at Home"
                required
                className="rounded-xl border-gray-200 text-sm font-semibold"
              />
            </div>

            {/* Slug & Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">URL Slug *</Label>
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="5-fall-prevention-strategies"
                  required
                  className="rounded-xl border-gray-200 text-xs font-mono"
                />
                <p className="text-[10px] text-gray-400">URL path: /blog/{formData.slug || "slug"}</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData((p) => ({ ...p, category: val }))}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 text-xs font-semibold">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {AKIRAPA_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Author, Date, ReadTime */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Author</Label>
                <Input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                  placeholder="Cathy Akirapa, CNA"
                  className="rounded-xl border-gray-200 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Date</Label>
                <Input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                  placeholder="March 21, 2025"
                  className="rounded-xl border-gray-200 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Read Time</Label>
                <Input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData((p) => ({ ...p, readTime: e.target.value }))}
                  placeholder="4 min read"
                  className="rounded-xl border-gray-200 text-xs"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Excerpt / Preview (1-2 sentences) *</Label>
              <Textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                placeholder="A short engaging summary that appears on blog cards and Google search results."
                required
                className="rounded-xl border-gray-200 text-xs leading-relaxed"
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Featured Cover Image</Label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                  placeholder="/CARE GIVER  (13).jpg or https://images.unsplash.com/..."
                  className="rounded-xl border-gray-200 text-xs flex-1"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.image && (
                <div className="w-24 h-16 rounded-xl overflow-hidden border border-gray-200 mt-2 bg-gray-50">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-gray-700">Article Content *</Label>
                <span className="text-[10px] text-gray-400">
                  Supports **bold text**, numbered lists (1. **Title**: desc), and bullets (- Point)
                </span>
              </div>
              <Textarea
                rows={10}
                value={formData.content}
                onChange={handleContentChange}
                placeholder={`Write or paste your article text here...

1. **First Strategy**: Details go here.
2. **Second Strategy**: More details.

- **Key Takeaway**: Summary bullet.`}
                required
                className="rounded-xl border-gray-200 text-xs leading-relaxed font-mono"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#76248a] hover:bg-[#5b196b] text-white font-bold text-xs gap-2"
              >
                {isSaving ? "Saving..." : editingPost ? "Save Changes" : "Publish Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogEditor;
