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
  views: number;
}

export const BLOG_TOPICS = [
  { id: "all", label: "All Topics", icon: "fa-border-all" },
  { id: "Caregiver Support", label: "Caregiver Support", icon: "fa-hand-holding-heart" },
  { id: "Respite Care", label: "Respite Care", icon: "fa-bed" },
  { id: "Senior Safety", label: "Senior Safety & Fall Prevention", icon: "fa-shield-halved" },
  { id: "Dementia Care", label: "Dementia & Memory Care", icon: "fa-brain" },
  { id: "Hospital Recovery", label: "Hospital to Home Recovery", icon: "fa-house-chimney-medical" },
  { id: "Daily Living & Nutrition", label: "Daily Living & Nutrition", icon: "fa-apple-whole" },
  { id: "Care Planning", label: "Family Care Planning", icon: "fa-file-signature" },
];

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
    image: "/CARE GIVER  (4).jpg",
    views: 428
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
    views: 315
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
    image: "/CARE GIVER  (8).jpg",
    views: 592
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
    category: "Care Planning",
    readTime: "4 min read",
    image: "/CARE GIVER  (16).jpg",
    views: 480
  },
  {
    id: "post-5",
    slug: "navigating-dementia-communication-tips-for-families",
    title: "Navigating Dementia: Effective Communication Tips for Families",
    excerpt: "Communicating with a loved one who has Alzheimer's or dementia requires patience, validation, and specialized techniques.",
    content: `When a loved one is diagnosed with memory impairment, traditional conversation patterns can lead to frustration and distress. Developing specialized communication habits can foster peace and emotional connection:

1. **Connect Before Speaking**: Make gentle eye contact and call your loved one by name before asking a question or starting a task.
2. **Simplify Sentences**: Speak clearly using positive, straightforward phrasing rather than complex multi-step instructions.
3. **Practice Emotional Validation**: Rather than correcting memory inaccuracies, acknowledge the underlying feeling behind their words.
4. **Utilize Familiar Reminiscence**: Look at treasured family photo albums or play beloved songs from their youth to spark positive memories.`,
    date: "March 04, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Dementia Care",
    readTime: "6 min read",
    image: "/CARE GIVER  (17).jpg",
    views: 641
  },
  {
    id: "post-6",
    slug: "smooth-hospital-to-home-transitions-preventing-readmissions",
    title: "Smooth Hospital-to-Home Transitions: Preventing Readmissions",
    excerpt: "The first 30 days post-discharge are crucial for surgical and medical recovery. Learn how coordinated in-home assistance ensures healing.",
    content: `Hospital readmissions often occur due to missed medication dosages, inadequate hydration, or physical setbacks during the first two weeks at home.

Key components of safe post-hospital recovery include:
- **Discharge Medication Reconciliation**: Ensuring new prescriptions match clinical instructions and are taken on schedule.
- **Mobility Supervision & Transfer Safety**: Preventing surgical site strain and fall injuries during bathroom transfers and bed transitions.
- **Hydration & Nutritional Fortification**: Preparing light, nutrient-dense meals to promote tissue repair and restore strength.
- **Dedicated Electronic Visit Verification**: Constant logging of patient vitals and recovery milestones via the AkiVault family portal.`,
    date: "February 27, 2025",
    author: "Stuart Ssemwogerere",
    category: "Hospital Recovery",
    readTime: "5 min read",
    image: "/CARE GIVER  (2).jpg",
    views: 389
  },
  {
    id: "post-7",
    slug: "senior-nutrition-and-hydration-essential-guidelines",
    title: "Senior Nutrition and Hydration: Essential Guidelines for Healthy Aging",
    excerpt: "As we age, appetite cues diminish. Learn how personalized meal planning and fluid management sustain vitality.",
    content: `Malnutrition and dehydration are two of the most commonly overlooked health threats among independent seniors. Natural changes in taste buds and thirst receptors often mask these deficits:

1. **Establish a Hydration Schedule**: Provide small glasses of water, herbal tea, or electrolyte infusions every two hours rather than waiting for thirst.
2. **Focus on High-Density Protein**: Incorporate Greek yogurt, eggs, poultry, and legumes into daily meals to preserve muscle mass.
3. **Address Dentition & Texture**: Adapt meals to soft-chew or smooth textures if chewing or swallowing fatigue occurs.
4. **Make Mealtime Engaging**: Eating together or having a friendly caregiver assist with meal prep encourages healthy intake.`,
    date: "February 20, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Daily Living & Nutrition",
    readTime: "4 min read",
    image: "/CARE GIVER  (5).jpg",
    views: 298
  },
  {
    id: "post-8",
    slug: "creating-a-personalized-home-care-plan",
    title: "Creating a Personalized Home Care Plan: What Every Family Should Know",
    excerpt: "A comprehensive care plan bridges client preferences, family scheduling, and clinical oversight for optimal outcomes.",
    content: `No two aging journeys are alike. An effective personalized care plan begins with an in-depth in-home assessment:

- **Activities of Daily Living (ADLs)**: Evaluating bathing, dressing, grooming, and mobility support requirements.
- **Instrumental ADLs**: Coordinating light housekeeping, grocery errands, meal preparation, and transportation.
- **Care Pod Consistency**: Assigning a primary caregiver and dedicated backup caregivers to ensure uninterrupted familiarity.
- **Dynamic Digital Welfare Checks**: Tracking daily mood, appetite, and mobility updates in real time for total family transparency.`,
    date: "February 14, 2025",
    author: "Stuart Ssemwogerere",
    category: "Care Planning",
    readTime: "5 min read",
    image: "/CARE GIVER  (14).jpg",
    views: 520
  },
  {
    id: "post-9",
    slug: "emotional-wellbeing-combating-senior-isolation",
    title: "Emotional Well-Being: Combating Senior Isolation at Home",
    excerpt: "Social connection is as vital to senior longevity as physical health. Discover practical ways companion care enriches life.",
    content: `Prolonged social isolation can increase cognitive decline and elevate risks for chronic cardiovascular conditions. Compassionate in-home companionship transforms daily living:

1. **Stimulating Conversation & Shared Hobbies**: Engaging in board games, puzzles, gardening, and storytelling keeps cognitive pathways active.
2. **Community Outings**: Safe visits to local parks, senior centers, or family gatherings foster connection with the world.
3. **Active Listening & Validation**: Having a dedicated companion who genuinely listens reduces anxiety and boosts daily morale.`,
    date: "February 08, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Caregiver Support",
    readTime: "4 min read",
    image: "/CARE GIVER  (9).jpg",
    views: 412
  },
  {
    id: "post-10",
    slug: "overnight-care-vs-24-7-live-in-care",
    title: "Overnight Care vs. 24/7 Live-In Care: Selecting the Right Solution",
    excerpt: "Understand the structural differences between overnight awake monitoring and comprehensive 24-hour around-the-clock assistance.",
    content: `When a senior experiences nighttime wandering, insomnia, or needs medication assistance during late hours, families must choose between overnight monitoring and 24/7 care.

- **Overnight Awake Care**: A certified caregiver remains awake throughout the night (typically 8-12 hours) to assist with bathroom transfers and fall prevention.
- **24/7 Round-the-Clock Shifts**: Multiple dedicated caregivers rotate in scheduled 8-hour or 12-hour shifts for continuous alertness and care management.
- **Continuity Safeguards**: Both options benefit from our Care Pod allocation model, preventing stranger visits and guaranteeing familiarity.`,
    date: "January 29, 2025",
    author: "Stuart Ssemwogerere",
    category: "Respite Care",
    readTime: "5 min read",
    image: "/CARE GIVER  (15).jpg",
    views: 377
  },
  {
    id: "post-11",
    slug: "bathroom-safety-modifications-preventing-slipping-accidents",
    title: "Bathroom Safety Modifications: Preventing Common Slipping Accidents",
    excerpt: "Over 70% of senior home accidents occur in the bathroom. Practical updates ensure privacy and safety.",
    content: `Slick tile surfaces, wet shower floors, and low toilet seats create high-risk environments for seniors with limited mobility.

Essential bathroom modifications include:
1. **Curbless Walk-In Showers**: Eliminating high tub ledges to remove tripping obstacles entirely.
2. **Commercial-Grade Suction or Anchored Grab Bars**: Positioned at entrance points, inside showers, and beside toilets.
3. **Non-Slip Flooring Treatments**: Textured adhesive treads and rubberized backing mats.
4. **Shower Chairs with Handheld Spray Nozzles**: Allowing comfortable seated bathing without balance strain.`,
    date: "January 22, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Senior Safety",
    readTime: "4 min read",
    image: "/CARE GIVER  (10).jpg",
    views: 489
  },
  {
    id: "post-12",
    slug: "early-signs-of-memory-loss-vs-normal-aging",
    title: "Early Signs of Memory Loss vs. Normal Aging: A Clinical Perspective",
    excerpt: "Learn how to differentiate benign age-related forgetfulness from early cognitive changes requiring assessment.",
    content: `Misplacing car keys occasionally is a normal aspect of healthy aging. However, consistent difficulty completing familiar daily tasks signals the need for professional evaluation:

- **Normal Aging**: Forgetting which day it is and remembering it later; momentarily forgetting names of acquaintances.
- **Early Cognitive Changes**: Losing track of dates, seasons, or passing of time; difficulty managing monthly bills or familiar recipes.
- **Behavioral Indicators**: Rapid mood swings, withdrawal from beloved social activities, and misplacing items in bizarre locations (e.g. putting a wallet in the freezer).

Early identification enables families to implement proactive support and structured daily routines.`,
    date: "January 15, 2025",
    author: "Cathy Akirapa, CNA",
    category: "Dementia Care",
    readTime: "6 min read",
    image: "/CARE GIVER  (18).jpg",
    views: 610
  }
];
