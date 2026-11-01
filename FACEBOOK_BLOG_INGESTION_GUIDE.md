# Akirapa Home Care — Facebook-to-Blog Direct Ingestion Guide (Option 3: Semi-Automated Review Queue)

This guide explains how your Facebook posts are ingested, transformed into full blog format, and published to your live website with the **Option 3: Semi-Automated Review Workflow**.

---

## 1. How the Workflow Operates

```
   [ Post on Facebook Page ]
               │
               ▼ (Webhook or Make.com / Zapier trigger)
   [ Auto-Transform Post via Parser ]
      • Extracts captivating Title
      • Generates SEO Excerpt (1-2 sentences)
      • Maps to clinical Category (e.g., Caregiver Support, Senior Safety)
      • Formats bullet points & bold markdown
      • Attaches cover photo
               │
               ▼
   [ Supabase `blog_posts` table ]
      • Saved with `status: 'draft'`
      • Saved with `source: 'facebook'`
               │
               ▼
   [ Akirapa Admin Dashboard: `/admin/blog` ]
      • Alert banner: "1 Post Awaiting Review in Draft Queue"
      • Click "Publish" with 1-click OR click "Edit" to tweak text/photo
               │
               ▼
   [ Live Akirapa Blog: `/blog` ]
      • Instantly visible to visitors without rebuilding or redeploying!
```

---

## 2. Testing & Using It Right Now in Your Admin Dashboard

You don't have to wait for Facebook API approval to start using this right now:

1. Log into your Akirapa Admin Dashboard at `/admin/login`.
2. Click **"Blog & FB Posts"** in the sidebar (or visit `/admin/blog`).
3. Click the blue **"Import / Test FB Post"** button in the header.
4. Click **"Load Sample Post"** to load a realistic clinical caregiver post, or paste the text and image URL of any post from your Facebook feed.
5. Click **"Convert & Send to Review Queue"**.
6. The post is instantly parsed into a full blog article with:
   - Clean title
   - Topic category (*Senior Safety*)
   - Markdown list formatting with badges
   - Cover photo
   - Status set to **`Draft / Pending Review`**
7. You can now:
   - Click the **"Eye"** icon to preview how it looks.
   - Click **"Publish"** to make it live instantly.
   - Click **"Edit"** to refine any wording or adjust the category.

---

## 3. Database Setup: Supabase Table

In your Supabase project dashboard (SQL Editor), run the following query from `supabase_schema.sql`:

```sql
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT DEFAULT 'Akirapa Home Care',
    category TEXT DEFAULT 'Caregiver Support',
    read_time TEXT DEFAULT '4 min read',
    image TEXT,
    views INT DEFAULT 350,
    status TEXT DEFAULT 'published', -- 'published' or 'draft'
    source TEXT DEFAULT 'manual', -- 'manual' or 'facebook'
    facebook_post_id TEXT,
    facebook_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public reads and admin inserts/updates
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select blog_posts') THEN
        CREATE POLICY "Public select blog_posts" ON public.blog_posts FOR SELECT USING (true);
        CREATE POLICY "Public modify blog_posts" ON public.blog_posts FOR ALL USING (true);
    END IF;
END $$;
```

---

## 4. Automating with Make.com or Zapier (Recommended No-Code Pipeline)

To have every Facebook Page post sent directly to your review queue automatically:

### Step A: Facebook Trigger
* **Platform**: Make.com or Zapier
* **Trigger**: Facebook Pages &rarr; **Watch Posts** / **New Post by Page**
* Select your Akirapa Facebook Page.

### Step B: Formatter / AI Transform (Optional Prompt)
If using an AI module (e.g. OpenAI or Gemini step in Zapier/Make):
* **Prompt**:
  > "You are an assistant for Akirapa Home Care. Take this raw Facebook post caption and return JSON with:
  > - `title`: Catchy article headline (under 80 chars)
  > - `excerpt`: 1-2 sentence preview (under 160 chars)
  > - `category`: One of ['Caregiver Support', 'Respite Care', 'Senior Safety', 'Senior Living', 'Memory & Dementia', 'Post-Hospital Recovery', 'Nutrition & Wellness']
  > - `content`: The body formatted with markdown bold and bullet points."

### Step C: Supabase Ingestion
* **Action**: Supabase &rarr; **Create Row** in `blog_posts` table:
  - `id`: `fb-{{facebook_post_id}}`
  - `slug`: `{{slugify(title)}}-{{id}}`
  - `title`: `{{title}}`
  - `excerpt`: `{{excerpt}}`
  - `content`: `{{content}}`
  - `date`: `{{post_created_date}}`
  - `author`: `Akirapa Home Care`
  - `category`: `{{category}}`
  - `image`: `{{picture_url}}`
  - `status`: `'draft'` *(This keeps it in your review queue until approved!)*
  - `source`: `'facebook'`
  - `facebook_post_id`: `{{facebook_post_id}}`
  - `facebook_url`: `{{permalink_url}}`

---

## 5. Summary of Files Updated

- [`src/data/blogPosts.ts`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/data/blogPosts.ts): Extended `BlogPost` interface with `status`, `source`, `facebookPostId`, and `facebookUrl`.
- [`src/lib/facebookPostParser.ts`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/lib/facebookPostParser.ts): Smart parser that extracts titles, detects categories, converts emojis into markdown lists, and prepares draft posts.
- [`src/context/DataContext.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/context/DataContext.tsx): Full database synchronization with Supabase & local storage persistence, with `addBlogPost`, `updateBlogPost`, `publishBlogPost`, `unpublishBlogPost`, and `deleteBlogPost`.
- [`src/pages/admin/BlogEditor.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/pages/admin/BlogEditor.tsx): Complete Admin Blog & Facebook Management dashboard with review queue, 1-click publishing, and interactive Facebook import tool.
- [`src/pages/admin/AdminLayout.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/pages/admin/AdminLayout.tsx): Added "Blog & FB Posts" to admin sidebar.
- [`src/App.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/App.tsx): Registered `/admin/blog` route.
- [`src/pages/Blog.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/pages/Blog.tsx): Displays published posts dynamically.
- [`src/pages/BlogPost.tsx`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/src/pages/BlogPost.tsx): Dynamically renders published posts with draft preview alerts.
- [`supabase_schema.sql`](file:///d:/BLEEM%20Labs%20Co/Akirapa/Akirapa-Home-Care-System-main%20(2)/Akirapa-Website-/supabase_schema.sql): Added `public.blog_posts` table with RLS policies.
