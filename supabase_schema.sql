-- Akirapa Home Care - Supabase Database Schema

-- 1. Projects / Care Services
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Care Services',
    description TEXT,
    short_description TEXT,
    impact TEXT,
    images TEXT[] DEFAULT '{}',
    icon TEXT DEFAULT 'fa-solid fa-heart-pulse',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Leadership & Board Members
CREATE TABLE IF NOT EXISTS public.leaders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image TEXT,
    type TEXT DEFAULT 'LEADER', -- 'LEADER' or 'BOARD'
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Partners
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Video Showcase
CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Job Openings
CREATE TABLE IF NOT EXISTS public.job_openings (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT DEFAULT 'MA',
    employment_type TEXT NOT NULL,
    pay_rate TEXT NOT NULL,
    pay_type TEXT DEFAULT 'Hourly',
    posted_date TEXT,
    description TEXT,
    requirements TEXT[] DEFAULT '{}',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Donations
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    donor_name TEXT,
    email TEXT,
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Grant Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read & Write)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select projects') THEN
        CREATE POLICY "Public select projects" ON public.projects FOR SELECT USING (true);
        CREATE POLICY "Public modify projects" ON public.projects FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select leaders') THEN
        CREATE POLICY "Public select leaders" ON public.leaders FOR SELECT USING (true);
        CREATE POLICY "Public modify leaders" ON public.leaders FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select partners') THEN
        CREATE POLICY "Public select partners" ON public.partners FOR SELECT USING (true);
        CREATE POLICY "Public modify partners" ON public.partners FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select videos') THEN
        CREATE POLICY "Public select videos" ON public.videos FOR SELECT USING (true);
        CREATE POLICY "Public modify videos" ON public.videos FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select job_openings') THEN
        CREATE POLICY "Public select job_openings" ON public.job_openings FOR SELECT USING (true);
        CREATE POLICY "Public modify job_openings" ON public.job_openings FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select messages') THEN
        CREATE POLICY "Public select messages" ON public.messages FOR SELECT USING (true);
        CREATE POLICY "Public modify messages" ON public.messages FOR ALL USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select donations') THEN
        CREATE POLICY "Public select donations" ON public.donations FOR SELECT USING (true);
        CREATE POLICY "Public modify donations" ON public.donations FOR ALL USING (true);
    END IF;
END $$;
