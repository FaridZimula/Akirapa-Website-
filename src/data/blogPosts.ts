export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  initialViews?: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "5-ways-to-regain-your-energy-after-caregiver-burnout",
    title: "5 Ways to Regain Your Energy After Caregiver Burnout",
    excerpt: "Caring for an aging loved one is physically and emotionally demanding. Discover practical strategies to restore your energy and well-being.",
    content: `Caring for a senior family member is a labor of love, but over time, physical exhaustion and emotional stress can build up unnoticed. Caregiver burnout is a recognized condition that affects millions of primary family caregivers each year.

Here are 5 proven strategies to help you recharge your mind and body:

1. **Acknowledge Your Limits**: Recognizing that you cannot do everything alone is the first step toward recovery. Accept that taking time for yourself is essential, not selfish.
2. **Utilize Professional Respite Care**: Short-term respite care allows professional home caregivers to step in while you take a break, travel, or catch up on sleep.
3. **Establish Daily Quiet Rituals**: Set aside 20-30 minutes each day dedicated solely to relaxation—whether reading, taking a walk, or meditating.
4. **Join a Caregiver Support Network**: Sharing experiences with others who understand your journey reduces isolation and provides emotional validation.
5. **Prioritize Sleep and Nutrition**: Proper rest and balanced meals provide the physiological foundation needed to manage daily caregiving responsibilities.`,
    date: "March 21, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Caregiver Support",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    initialViews: 642
  },
  {
    id: "post-2",
    slug: "how-family-caregivers-can-benefit-from-respite-care",
    title: "How Family Caregivers Can Benefit from Respite Care",
    excerpt: "Explore how temporary, contract-free respite care services protect your physical health and preserve family relationships.",
    content: `Many family members feel guilty about asking for outside help, assuming that caregiving is entirely their sole responsibility. However, continuous caregiving without pauses often leads to chronic fatigue, depression, and health deterioration.

Respite care provides temporary relief for primary family caregivers. Benefits include:
- **Preventing Physical Strain**: Allowing your body time to recover from heavy lifting, nighttime assistance, and physical tasks.
- **Improving Relationship Dynamics**: Spending quality time with your loved one as a family member rather than solely as a full-time nurse.
- **Ensuring Continuity of High-Quality Care**: Professional certified nursing assistants ensure your loved one receives uninterrupted, safe attention.`,
    date: "March 17, 2025",
    author: "Stuart Ssemwogerere",
    category: "Respite Care",
    readTime: "3 min read",
    image: "/CARE GIVER  (13).jpg",
    initialViews: 518
  },
  {
    id: "post-3",
    slug: "four-fall-prevention-strategies-for-seniors",
    title: "Four Fall Prevention Strategies for Seniors Living at Home",
    excerpt: "Falls are the leading cause of injury among seniors. Implement these essential environmental and physical modifications to keep your home safe.",
    content: `According to health statistics, one out of three older adults experiences a fall each year. Most falls occur right in the home during daily activities. Fortunately, simple modifications can dramatically reduce fall risks:

1. **Clear Household Hazards**: Remove throw rugs, unclutter hallways, and secure loose electrical cords.
2. **Upgrade Home Lighting**: Ensure stairwells, bedrooms, and bathrooms have bright nightlights and easy-to-reach switches.
3. **Install Grab Bars and Handrails**: Place sturdy grab bars inside showers, near toilets, and along both sides of staircases.
4. **Schedule Regular Vision & Mobility Assessments**: Have a healthcare provider review medications that cause dizziness and assess balance exercises.`,
    date: "March 14, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Senior Safety",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    initialViews: 835
  },
  {
    id: "post-4",
    slug: "when-to-hire-senior-home-care-services",
    title: "When Is it Time to Hire Senior Home Care Services?",
    excerpt: "Recognize the key indicators that signal it is time for professional in-home care support for your aging parent or relative.",
    content: `Deciding when to seek professional in-home care is one of the most important decisions families face. Key signs that indicate senior home care assistance is needed include:
- Unexplained weight loss or missed meals
- Changes in personal hygiene or unwashed clothing
- Forgotten medications or missed medical appointments
- Frequent minor accidents, bruises, or balance stumbles
- Increased confusion, mood changes, or social withdrawal

Early intervention with customized hourly or daily home care helps seniors maintain their dignity and independence while providing total safety.`,
    date: "March 10, 2025",
    author: "Stuart Ssemwogerere",
    category: "Senior Living",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    initialViews: 429
  },
  {
    id: "post-5",
    slug: "supporting-loved-ones-with-early-stage-dementia",
    title: "Compassionate Strategies for Supporting Loved Ones with Early-Stage Dementia",
    excerpt: "Practical techniques to foster calm, dignity, and cognitive engagement for seniors navigating memory loss and Alzheimer's disease.",
    content: `Early-stage dementia introduces subtle behavioral shifts and moments of frustration for both seniors and their families. Empathy and consistent daily structure make a profound difference:

1. **Establish Predictable Daily Routines**: Keeping wake-up times, meals, and activities at standard hours reduces anxiety and confusion.
2. **Communicate with Simplicity & Warmth**: Make gentle eye contact, use direct sentences, and allow ample time for responses without interrupting.
3. **Engage in Reminiscence & Cognitive Games**: Photo albums, favorite music from younger years, and structured memory activities stimulate neuro-pathways and spark joy.
4. **Partner with Dementia-Trained Caregivers**: Certified professionals understand agitation de-escalation, sensory orientation, and safe wandering prevention.`,
    date: "March 05, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Memory & Dementia",
    readTime: "6 min read",
    image: "/CARE GIVER  (16).jpg",
    initialViews: 712
  },
  {
    id: "post-6",
    slug: "safe-hospital-to-home-transition-guide",
    title: "The Ultimate Hospital-to-Home Transition Guide for Seniors",
    excerpt: "How dedicated post-discharge care prevents rehospitalization and speeds up physical recovery in the first 30 days after discharge.",
    content: `Nearly 20% of elderly patients discharged from hospitals are readmitted within 30 days due to medication errors, missed follow-ups, or sudden falls. 

Steps to ensure a smooth recovery at home:
- **Medication Reconciliation**: Have a nurse or caregiver cross-verify new hospital prescriptions against previous home medications.
- **Physical Home Preparation**: Set up first-floor sleeping arrangements, clear walking pathways, and prepare easy-prep nutrition.
- **Scheduled Transportation & Escort**: Ensure a professional caregiver attends discharge consultations and handles pharmacy pick-ups.
- **Continuous Monitoring via AkiVault**: Real-time shift welfare checks spot early signs of infection, fluid retention, or appetite decline before emergency room visits become necessary.`,
    date: "February 28, 2025",
    author: "Stuart Ssemwogerere",
    category: "Post-Hospital Recovery",
    readTime: "5 min read",
    image: "/CARE GIVER  (8).jpg",
    initialViews: 593
  },
  {
    id: "post-7",
    slug: "vital-nutrition-and-hydration-tips-for-seniors",
    title: "Vital Nutrition and Hydration Guidelines for Aging Well at Home",
    excerpt: "Healthy aging starts on the plate. Discover how balanced meal planning and proper hydration promote vitality and immune resilience.",
    content: `As we age, natural thirst cues diminish and metabolism shifts, making seniors particularly vulnerable to subtle dehydration and nutrient deficiencies.

Essential dietary guidelines:
1. **Hydration Throughout the Day**: Do not wait for thirst. Encourage small sips of water, herbal teas, and electrolyte-rich broths every 90 minutes.
2. **High-Density Protein Meals**: Incorporate eggs, lean poultry, Greek yogurt, or plant proteins to preserve muscle mass and prevent sarcopenia.
3. **Fiber for Gut & Heart Health**: Colorful berries, steamed vegetables, and whole oats support cardiovascular health and digestion.
4. **Assisted Meal Preparation**: Having a compassionate caregiver prepare fresh, flavorful meals restores the joy of dining for seniors with reduced appetite.`,
    date: "February 20, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Nutrition & Wellness",
    readTime: "4 min read",
    image: "/CARE GIVER  (5).jpg",
    initialViews: 378
  },
  {
    id: "post-8",
    slug: "navigating-massachusetts-senior-care-options",
    title: "Navigating Senior Care Options in Massachusetts: A Family Guide",
    excerpt: "Understand private-duty home care, Medicaid waivers, and community resources available across Bedford, Middlesex County, and Greater Boston.",
    content: `Massachusetts families have numerous care options, but navigating eligibility and services can feel overwhelming without clear guidance.

Key care models explained:
- **Private-Duty Non-Medical Home Care**: Comprehensive hourly or 24/7 assistance with activities of daily living (bathing, dressing, meal prep, companionship) with zero contract lock-in.
- **Respite Programs for Primary Family Caregivers**: Flexible blocks of time allowing family members to rest, travel, and recharge without disrupting care routines.
- **Skilled Clinical Services vs. Personal Care**: Understanding when certified nursing assistants (CNAs) vs visiting therapists are needed.
- **AkiVault Verified Verification**: Ensuring your chosen agency provides automated GPS electronic visit verification for absolute punctuality and trust.`,
    date: "February 12, 2025",
    author: "Stuart Ssemwogerere",
    category: "Senior Living",
    readTime: "5 min read",
    image: "/CARE GIVER  (2).jpg",
    initialViews: 489
  }
];
