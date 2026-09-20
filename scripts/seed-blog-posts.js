/**
 * One-time seed: copies the 4 blog posts that used to live only in
 * src/data/blogPosts.ts into the new public.blog_posts Supabase table, so the
 * site's existing articles become editable from /admin/blog instead of
 * requiring a code deploy to change.
 *
 * Run this AFTER creating the table with supabase_blog_posts_migration.sql
 * (paste that into the Supabase SQL Editor first - this script uses the
 * public anon key, which can insert/upsert rows but cannot run DDL).
 *
 *   node scripts/seed-blog-posts.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, '..', '.env');
  const text = readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of text.split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) env[match[1]] = match[2].trim();
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

// Mirrors src/data/blogPosts.ts - kept in sync manually since this is a
// one-time migration script, not an ongoing source of truth.
const blogPosts = [
  {
    id: 'post-1',
    slug: '5-ways-to-regain-your-energy-after-caregiver-burnout',
    title: '5 Ways to Regain Your Energy After Caregiver Burnout',
    excerpt: 'Caring for an aging loved one is physically and emotionally demanding. Discover practical strategies to restore your energy and well-being.',
    content: `Caring for a senior family member is a labor of love, but over time, physical exhaustion and emotional stress can build up unnoticed. Caregiver burnout is a recognized condition that affects millions of primary family caregivers each year.

Here are 5 proven strategies to help you recharge your mind and body:

1. **Acknowledge Your Limits**: Recognizing that you cannot do everything alone is the first step toward recovery. Accept that taking time for yourself is essential, not selfish.
2. **Utilize Professional Respite Care**: Short-term respite care allows professional home caregivers to step in while you take a break, travel, or catch up on sleep.
3. **Establish Daily Quiet Rituals**: Set aside 20-30 minutes each day dedicated solely to relaxation—whether reading, taking a walk, or meditating.
4. **Join a Caregiver Support Network**: Sharing experiences with others who understand your journey reduces isolation and provides emotional validation.
5. **Prioritize Sleep and Nutrition**: Proper rest and balanced meals provide the physiological foundation needed to manage daily caregiving responsibilities.`,
    date: 'March 21, 2025',
    author: 'Cathy Akirapa, CNA',
    category: 'Caregiver Support',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'post-2',
    slug: 'how-family-caregivers-can-benefit-from-respite-care',
    title: 'How Family Caregivers Can Benefit from Respite Care',
    excerpt: 'Explore how temporary, contract-free respite care services protect your physical health and preserve family relationships.',
    content: `Many family members feel guilty about asking for outside help, assuming that caregiving is entirely their sole responsibility. However, continuous caregiving without pauses often leads to chronic fatigue, depression, and health deterioration.

Respite care provides temporary relief for primary family caregivers. Benefits include:
- **Preventing Physical Strain**: Allowing your body time to recover from heavy lifting, nighttime assistance, and physical tasks.
- **Improving Relationship Dynamics**: Spending quality time with your loved one as a family member rather than solely as a full-time nurse.
- **Ensuring Continuity of High-Quality Care**: Professional certified nursing assistants ensure your loved one receives uninterrupted, safe attention.`,
    date: 'March 17, 2025',
    author: 'Stuart Ssemwogerere',
    category: 'Respite Care',
    readTime: '3 min read',
    image: '/CARE GIVER  (13).jpg',
  },
  {
    id: 'post-3',
    slug: 'four-fall-prevention-strategies-for-seniors',
    title: 'Four Fall Prevention Strategies for Seniors Living at Home',
    excerpt: 'Falls are the leading cause of injury among seniors. Implement these essential environmental and physical modifications to keep your home safe.',
    content: `According to health statistics, one out of three older adults experiences a fall each year. Most falls occur right in the home during daily activities. Fortunately, simple modifications can dramatically reduce fall risks:

1. **Clear Household Hazards**: Remove throw rugs, unclutter hallways, and secure loose electrical cords.
2. **Upgrade Home Lighting**: Ensure stairwells, bedrooms, and bathrooms have bright nightlights and easy-to-reach switches.
3. **Install Grab Bars and Handrails**: Place sturdy grab bars inside showers, near toilets, and along both sides of staircases.
4. **Schedule Regular Vision & Mobility Assessments**: Have a healthcare provider review medications that cause dizziness and assess balance exercises.`,
    date: 'March 14, 2025',
    author: 'Cathy Akirapa, CNA',
    category: 'Senior Safety',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'post-4',
    slug: 'when-to-hire-senior-home-care-services',
    title: 'When Is it Time to Hire Senior Home Care Services?',
    excerpt: 'Recognize the key indicators that signal it is time for professional in-home care support for your aging parent or relative.',
    content: `Deciding when to seek professional in-home care is one of the most important decisions families face. Key signs that indicate senior home care assistance is needed include:
- Unexplained weight loss or missed meals
- Changes in personal hygiene or unwashed clothing
- Forgotten medications or missed medical appointments
- Frequent minor accidents, bruises, or balance stumbles
- Increased confusion, mood changes, or social withdrawal

Early intervention with customized hourly or daily home care helps seniors maintain their dignity and independence while providing total safety.`,
    date: 'March 10, 2025',
    author: 'Stuart Ssemwogerere',
    category: 'Senior Living',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
  },
];

async function main() {
  const rows = blogPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    date: p.date,
    author: p.author,
    category: p.category,
    read_time: p.readTime,
    image: p.image,
  }));

  const { data, error } = await supabase.from('blog_posts').upsert(rows).select('id, title');
  if (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
    return;
  }

  console.log(`Seeded ${data.length} blog post(s):`);
  for (const row of data) console.log(`  - ${row.id}: ${row.title}`);
}

main();
