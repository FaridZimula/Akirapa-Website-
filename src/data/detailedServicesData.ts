export interface DetailedService {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDefinition: string;
  whoCanBenefit: string[];
  whatIsIncluded: string[];
  familyConsiderations: string[];
  faqs: { question: string; answer: string }[];
  relatedServiceSlugs: string[];
  category: "Companion & Daily Care" | "Specialized Care" | "Clinical & Recovery Support";
  icon: string;
}

export const detailedServices: DetailedService[] = [
  {
    slug: "companion-care",
    title: "Companion Care Services",
    tagline: "Heartfelt Social Connection & Daily Living Companionship in Bedford, MA",
    shortDescription: "Compassionate, engaging companion care designed to alleviate isolation, foster emotional wellbeing, and assist with daily home routines.",
    fullDefinition: "Companion care provides non-medical emotional support, social interaction, and practical assistance with light everyday tasks for seniors and adults recovering from illness. At Akirapa Home Care, our companion caregivers offer friendly conversation, cognitive engagement, recreational hobbies, and gentle encouragement to help seniors thrive independently at home in Bedford and surrounding Middlesex County communities.",
    whoCanBenefit: [
      "Seniors living alone who desire social interaction and friendly companionship",
      "Older adults experiencing mild cognitive slowing or feelings of isolation",
      "Individuals whose family caregivers work during the day or live far away",
      "Seniors needing lightweight help with daily hobbies, reading, or walk accompaniment"
    ],
    whatIsIncluded: [
      "Engaging conversation, memory sharing, and mental games/puzzles",
      "Accompaniment on daily neighborhood walks and local outings in Bedford",
      "Assistance with recreational hobbies, reading aloud, and writing letters",
      "Light meal preparation and hydration encouragement",
      "Reminders for daily medication, appointments, and routines",
      "General supervision and safety oversight around the home"
    ],
    familyConsiderations: [
      "Companion care is non-medical and focuses on social/emotional wellness rather than hands-on personal hygiene.",
      "Visits can be scheduled flexibly from a few hours a week to daily companion shifts.",
      "Companion care can easily be expanded into personal care or specialized dementia care as needs evolve."
    ],
    faqs: [
      {
        question: "What is the difference between companion care and personal care?",
        answer: "Companion care focuses on social connection, emotional support, hobbies, and light household help without direct physical contact. Personal care includes hands-on assistance with activities of daily living such as bathing, dressing, grooming, and mobility."
      },
      {
        question: "Can companion caregivers drive clients to local appointments in Bedford?",
        answer: "Yes, our caregivers can accompany clients to appointments, grocery stores, and local community activities throughout Bedford and nearby towns."
      }
    ],
    relatedServiceSlugs: ["personal-care", "homemaker-services", "respite-care", "meal-preparation"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-user-group"
  },
  {
    slug: "skilled-nursing",
    title: "Skilled Nursing Services",
    tagline: "Professional In-Home Clinical & Nursing Oversight in Bedford, MA",
    shortDescription: "Certified nursing care delivered directly at home, including medication management, wound assessment, and post-clinical monitoring.",
    fullDefinition: "Skilled nursing at home delivers professional clinical assessment, medical treatment administration, and health monitoring under the supervision of licensed nurses. Akirapa Home Care connects families with qualified healthcare professionals to manage complex medical protocols, postoperative recovery, and chronic health condition management in the comfort of home.",
    whoCanBenefit: [
      "Seniors managing complex or multiple chronic health conditions",
      "Patients recovering from surgical procedures, orthopedic care, or cardiac events",
      "Individuals requiring professional medication administration, tube feeding, or catheter maintenance",
      "Families seeking professional clinical oversight alongside routine non-medical caregiving"
    ],
    whatIsIncluded: [
      "Comprehensive nursing health assessments and vital sign monitoring",
      "Medication setup, administration, and physician order compliance",
      "Post-surgical wound care, dressing changes, and skin integrity inspection",
      "Chronic condition tracking (diabetes, hypertension, congestive heart failure)",
      "Communication and reporting to primary care physicians and specialists",
      "Family instruction on medical device management and home safety"
    ],
    familyConsiderations: [
      "Skilled nursing is coordinated closely with the client's physician and medical care team.",
      "Visits can range from targeted clinical check-ins to ongoing post-hospital nursing support.",
      "Our care team performs a pre-care clinical assessment to establish a personalized nursing plan."
    ],
    faqs: [
      {
        question: "Do I need a doctor's order for skilled nursing services at home?",
        answer: "While non-medical home care does not require a prescription, skilled clinical nursing procedures are coordinated in alignment with your physician's treatment plan."
      },
      {
        question: "Are skilled nursing visits available in Bedford and nearby towns?",
        answer: "Yes, Akirapa Home Care provides skilled clinical support throughout Bedford, Lexington, Concord, Billerica, Burlington, and neighboring communities."
      }
    ],
    relatedServiceSlugs: ["post-hospitalization-care", "medication-assistance", "24-hour-home-care"],
    category: "Clinical & Recovery Support",
    icon: "fa-solid fa-user-nurse"
  },
  {
    slug: "hospice-supportive-care",
    title: "Hospice Supportive Care",
    tagline: "Compassionate End-of-Life Care & Comfort Support at Home",
    shortDescription: "Dignified, soothing supportive care for individuals facing advanced illness, providing peace of mind and comfort to families.",
    fullDefinition: "Hospice supportive care provides dedicated non-medical assistance, personal hygiene comfort, physical positioning, and gentle companionship for individuals receiving end-of-life care. Working hand-in-hand with hospice agency medical teams, Akirapa caregivers ensure clients remain peaceful, comfortable, and surrounded by dignity in their home environment.",
    whoCanBenefit: [
      "Individuals enrolled in hospice care who require continuous comfort and personal care support",
      "Families seeking sensitive, 24/7 overnight or daytime assistance during difficult transitions",
      "Seniors facing end-stage illness who wish to stay in the familiar surroundings of home"
    ],
    whatIsIncluded: [
      "Gentle personal hygiene, mouth care, and skin preservation support",
      "Frequent repositioning to prevent pressure sores and maximize physical comfort",
      "Calming presence, soothing companionship, and emotional support for loved ones",
      "Respite relief for exhausted family members during critical moments",
      "Coordination with hospice nurses, social workers, and spiritual support teams",
      "Assistance with ambient environment control (lighting, quiet music, aromatherapy)"
    ],
    familyConsiderations: [
      "Hospice supportive care complements clinical hospice services provided by Medicare or hospice agencies.",
      "Caregivers focus on relief, peace, and family relief without intrusive interventions.",
      "Care schedules can be adjusted instantly as family needs change, including round-the-clock coverage."
    ],
    faqs: [
      {
        question: "How does Akirapa work alongside a hospice agency?",
        answer: "Our caregivers provide continuous hands-on personal care, positioning, and family support, while the hospice agency manages clinical medications, medical equipment, and physician visits."
      },
      {
        question: "Can hospice supportive care be provided 24/7 in Bedford?",
        answer: "Yes, we offer continuous 24-hour shifts so your loved one is never left unattended."
      }
    ],
    relatedServiceSlugs: ["24-hour-home-care", "respite-care", "personal-care"],
    category: "Clinical & Recovery Support",
    icon: "fa-solid fa-hand-holding-heart"
  },
  {
    slug: "personal-care",
    title: "Personal Care Services",
    tagline: "Dignified Assistance with Activities of Daily Living in Bedford, MA",
    shortDescription: "Respectful, hands-on personal assistance with bathing, dressing, mobility, grooming, and personal hygiene.",
    fullDefinition: "Personal care encompasses direct hands-on support for individuals who experience physical limitations, mobility challenges, or cognitive changes that impair their ability to perform daily self-care tasks. Akirapa Home Care certified caregivers treat every client with profound respect, ensuring privacy, physical safety, and personal dignity.",
    whoCanBenefit: [
      "Seniors experiencing physical frailty, arthritis, or severe balance issues",
      "Individuals recovering from surgeries or stroke with impaired mobility",
      "Clients who feel unsafe bathing or dressing without steady assistance",
      "Older adults needing respectful assistance with bathroom safety and incontinence care"
    ],
    whatIsIncluded: [
      "Bathing, shower assistance, sponge baths, and hair washing",
      "Dressing, wardrobe selection, and grooming care",
      "Restroom assistance, mobility transfer, and incontinence management",
      "Oral hygiene, skin hydration, and nail filing support",
      "Safe transfer from bed to wheelchair or recliner",
      "Assistance with morning routines and evening bedtime preparation"
    ],
    familyConsiderations: [
      "Our caregivers are carefully vetted, background-checked, and trained in safe client transfer techniques.",
      "Personal care routines are tailored to respect individual modesty and lifetime personal habits.",
      "Care plans can range from morning/evening assistance to full-day personal care coverage."
    ],
    faqs: [
      {
        question: "What safety protocols are followed during shower/bath assistance?",
        answer: "Caregivers utilize non-slip mats, shower chairs, grab bars, and steady two-person stability methods where needed to ensure 100% fall prevention during bathing."
      },
      {
        question: "Is personal care available on weekends in Bedford?",
        answer: "Yes, personal care services are available 7 days a week, 365 days a year."
      }
    ],
    relatedServiceSlugs: ["activities-of-daily-living", "companion-care", "24-hour-home-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-hands-holding"
  },
  {
    slug: "dementia-care",
    title: "Dementia Care Services",
    tagline: "Specialized, Patient Memory Care & Cognitive Support in Bedford, MA",
    shortDescription: "Structured, calm, and reassuring in-home care tailored to the unique behavioral and cognitive needs of individuals with dementia.",
    fullDefinition: "Dementia care requires exceptional empathy, specialized communication skills, structured routines, and environmental safety management. Akirapa Home Care provides tailored dementia support that honors the client's past, reduces anxiety, manages wandering or agitation, and maintains cognitive engagement in comfortable surroundings.",
    whoCanBenefit: [
      "Seniors diagnosed with Lewy body dementia, vascular dementia, or frontotemporal dementia",
      "Individuals experiencing memory loss, confusion, orientation difficulty, or sundowning",
      "Families seeking experienced caregivers to prevent wandering and maintain home safety"
    ],
    whatIsIncluded: [
      "Consistent daily routines to minimize anxiety, confusion, and agitation",
      "Cognitive exercises, sensory stimulation, music therapy, and photo reflection",
      "Wandering prevention and secure door/home safety monitoring",
      "Gentle redirection and validation therapy during moments of confusion",
      "Assistance with personal hygiene, hydration, and nutritional intake",
      "Regular communication and updates with family care managers"
    ],
    familyConsiderations: [
      "Dementia care plans prioritize consistency in caregiver assignment to build trust.",
      "Caregivers use positive reinforcement and soothing tone rather than correction.",
      "Safety audits of the home are conducted to eliminate fall hazards and unsafe items."
    ],
    faqs: [
      {
        question: "How do caregivers manage 'sundowning' in dementia clients?",
        answer: "Caregivers establish calming late-afternoon routines, adjust indoor lighting, minimize noise, and engage clients in reassuring activities to ease evening confusion."
      },
      {
        question: "Can dementia care help prevent senior wandering?",
        answer: "Yes, continuous caregiver supervision and structured activities significantly reduce unescorted wandering and promote safety."
      }
    ],
    relatedServiceSlugs: ["alzheimers-care", "respite-care", "24-hour-home-care"],
    category: "Specialized Care",
    icon: "fa-solid fa-brain"
  },
  {
    slug: "alzheimers-care",
    title: "Alzheimer's Care Services",
    tagline: "Expert In-Home Memory Care Tailored to Every Stage of Alzheimer's",
    shortDescription: "Compassionate, stage-appropriate care designed to enhance quality of life and safety for individuals with Alzheimer's disease.",
    fullDefinition: "Alzheimer's disease alters how individuals experience the world around them. Akirapa Home Care's dedicated Alzheimer's care program provides stage-specific support, focusing on memory stimulation, emotional comfort, behavioral management, and dignity preservation, allowing seniors to remain at home safely.",
    whoCanBenefit: [
      "Individuals diagnosed with early, moderate, or advanced Alzheimer's disease",
      "Family caregivers needing expert relief from round-the-clock Alzheimer's management",
      "Seniors benefiting from familiar home surroundings over institutional memory units"
    ],
    whatIsIncluded: [
      "Stage-appropriate cognitive activities and familiar memory recall exercises",
      "Safety management for cooking, stairs, doors, and electrical safety",
      "Personal care assistance with patience, dignity, and step-by-step guidance",
      "Nutritious meal preparation and gentle encouragement during dining",
      "Support with emotional changes, anxiety, and sleep pattern disruptions",
      "Family caregiver education and coping guidance"
    ],
    familyConsiderations: [
      "Familiar home environments significantly reduce confusion for Alzheimer's patients.",
      "Caregivers receive continuous education on memory loss management techniques.",
      "Care plans adapt dynamically as the progressive stages of Alzheimer's evolve."
    ],
    faqs: [
      {
        question: "Why is in-home Alzheimer's care preferred over a care facility?",
        answer: "In-home care preserves familiar surroundings, daily personal routines, and beloved memories, which reduces disorientation and emotional distress."
      },
      {
        question: "How quickly can Alzheimer's care be established in Bedford?",
        answer: "We can perform a home safety assessment and start care within 24 to 48 hours."
      }
    ],
    relatedServiceSlugs: ["dementia-care", "respite-care", "live-in-care"],
    category: "Specialized Care",
    icon: "fa-solid fa-head-side-virus"
  },
  {
    slug: "respite-care",
    title: "Respite Care Services",
    tagline: "Contract-Free, Flexible Relief Care for Family Caregivers in Bedford, MA",
    shortDescription: "Temporary, reliable in-home care giving primary family caregivers essential rest, peace of mind, and time to recharge.",
    fullDefinition: "Family caregiving is an act of deep love, but without periodic rest, it can lead to physical exhaustion and burnout. Respite care from Akirapa Home Care provides short-term, flexible caregiver relief—whether for a few hours, a weekend, or several weeks—ensuring your loved one receives seamless, high-quality care while you restore your own energy.",
    whoCanBenefit: [
      "Family members providing primary daily care to aging parents or spouses",
      "Caregivers needing time off for personal medical appointments, work commitments, or vacations",
      "Families experiencing physical or emotional burnout from continuous caregiving",
      "Families wanting to try home care services without a long-term commitment"
    ],
    whatIsIncluded: [
      "Seamless continuation of established daily routines and personal care",
      "Medication reminders, meal preparation, and light housekeeping",
      "Companionship, social interaction, and recreational engagement",
      "Contract-free booking options tailored to family schedules",
      "Detailed status reporting upon the primary caregiver's return"
    ],
    familyConsiderations: [
      "Respite care protects the health and personal relationships of primary family caregivers.",
      "Services can be scheduled on a recurring weekly basis or as needed for travel/emergencies.",
      "Caregivers match the client's personality and daily routines for a smooth transition."
    ],
    faqs: [
      {
        question: "Is there a long-term contract required for respite care?",
        answer: "No, Akirapa Home Care offers flexible, contract-free respite care schedules tailored to your exact timeline."
      },
      {
        question: "Can I request respite care on short notice in Bedford?",
        answer: "Yes, we accommodate short-notice requests whenever emergency caregiver coverage is required."
      }
    ],
    relatedServiceSlugs: ["companion-care", "personal-care", "24-hour-home-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-clock-rotate-left"
  },
  {
    slug: "live-in-care",
    title: "Live-In Care Services",
    tagline: "Dedicated 24-Hour Residential Caregiver Presence in Bedford, MA",
    shortDescription: "Continuous caregiver residence providing daytime personal care, overnight security, and constant peace of mind.",
    fullDefinition: "Live-in care provides a single primary caregiver (or dedicated pair) who resides in the client's home to provide comprehensive daytime assistance, meal preparation, personal care, and overnight peace of mind. This model offers high continuity of care and cost-efficiency for seniors requiring round-the-clock home presence.",
    whoCanBenefit: [
      "Seniors who require constant companion availability and safety oversight",
      "Older adults looking for an affordable alternative to 24-hour hourly shift rotation",
      "Clients who benefit from forming a deep, trusting bond with one dedicated caregiver",
      "Individuals with severe mobility restrictions who should not remain home alone"
    ],
    whatIsIncluded: [
      "Full daily personal care, grooming, and mobility transfer assistance",
      "Home cooked meal preparation tailored to dietary guidelines",
      "Light housekeeping, laundry, and maintaining a clean environment",
      "Medication reminders and accompaniment to doctor visits",
      "Overnight presence for safety reassurance and emergency response",
      "Continuous companionship and emotional warmth"
    ],
    familyConsiderations: [
      "Live-in caregivers require a private room and an uninterrupted 8-hour sleep period.",
      "If the client requires continuous awake attention throughout the entire night, 24-hour shift care is recommended instead.",
      "Live-in care provides exceptional relationship continuity between caregiver and client."
    ],
    faqs: [
      {
        question: "What is required for a live-in caregiver's living arrangement?",
        answer: "The caregiver needs a private bedroom and access to standard bathroom facilities."
      },
      {
        question: "How does live-in care differ from 24-hour hourly shift care?",
        answer: "Live-in care utilizes one primary caregiver who lives on site with designated sleep hours, whereas 24-hour shift care uses multiple caregivers working rotating awake shifts."
      }
    ],
    relatedServiceSlugs: ["24-hour-home-care", "personal-care", "dementia-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-house-user"
  },
  {
    slug: "24-hour-home-care",
    title: "24-Hour Home Care Services",
    tagline: "Continuous, Awake Round-the-Clock Nursing & Caregiver Shifts",
    shortDescription: "Uninterrupted, continuous awake care provided by rotating caregiver shifts for maximum safety day and night.",
    fullDefinition: "For clients who require vigilant, awake supervision 24 hours a day, Akirapa Home Care delivers continuous 24-hour shift care. Dedicated caregivers work in 8-hour or 12-hour rotating shifts so that someone is alert, active, and available every second of the day and night to respond to health needs, mobility support, or emergencies.",
    whoCanBenefit: [
      "Clients who frequently wake during the night needing bathroom or mobility assistance",
      "Seniors with advanced dementia who experience nocturnal wandering or severe agitation",
      "Individuals recovering from high-risk medical events, paralysis, or severe injury",
      "Families seeking absolute certainty that their loved one is never unattended"
    ],
    whatIsIncluded: [
      "100% awake, alert caregiver monitoring 24 hours a day, 365 days a year",
      "Overnight turning, incontinence care, and bathroom transfer support",
      "Immediate assistance for nocturnal agitation, anxiety, or disorientation",
      "Continuous health monitoring, medication reminders, and vital check-ins",
      "Complete personal care, daily housekeeping, and customized meals",
      "Seamless shift handoffs with real-time family updates"
    ],
    familyConsiderations: [
      "24-hour shift care guarantees that caregivers are awake and active throughout the night.",
      "Ideal for clients whose nocturnal care needs prevent a live-in caregiver from sleeping.",
      "Care team shifts are managed seamlessly by Akirapa coordinators so families never worry about coverage."
    ],
    faqs: [
      {
        question: "Are 24-hour caregivers awake during the night?",
        answer: "Yes! In 24-hour shift care, caregivers work rotating awake shifts, ensuring someone is vigilant at all times."
      },
      {
        question: "Can 24-hour care be established post-hospitalization in Bedford?",
        answer: "Yes, we frequently arrange immediate 24-hour home care for hospital discharges."
      }
    ],
    relatedServiceSlugs: ["live-in-care", "post-hospitalization-care", "hospice-supportive-care"],
    category: "Clinical & Recovery Support",
    icon: "fa-solid fa-shield-halved"
  },
  {
    slug: "medication-assistance",
    title: "Medication Assistance Services",
    tagline: "Reliable In-Home Medication Reminders & Management in Bedford, MA",
    shortDescription: "Ensuring timely, accurate prescription adherence and health safety oversight to prevent medication errors.",
    fullDefinition: "Managing multiple daily prescriptions, dosage schedules, and pharmacy refills can become overwhelming for aging seniors. Akirapa Home Care provides dependable medication reminders, pill organizer setup oversight, and compliance tracking to prevent missed doses, double dosing, and dangerous drug interactions.",
    whoCanBenefit: [
      "Seniors managing complex medication regimens with multiple daily doses",
      "Older adults experiencing memory forgetfulness or vision challenges",
      "Individuals discharged from the hospital with new medication prescriptions",
      "Families wanting peace of mind that prescriptions are taken correctly"
    ],
    whatIsIncluded: [
      "Timely verbal reminders for scheduled oral medications, drops, and topicals",
      "Assistance opening pill bottles and reading prescription labels",
      "Pill organizer box verification and prescription inventory tracking",
      "Pharmacy refill coordination and pickup delivery support",
      "Monitoring and logging adverse side effects or behavioral changes",
      "Real-time communication with family and prescribing physicians"
    ],
    familyConsiderations: [
      "Non-medical caregivers provide reminders and opening assistance; pre-sorting or complex clinical injections are overseen by skilled nursing.",
      "Consistent medication compliance drastically lowers emergency room visits and hospital readmissions.",
      "Medication schedules are logged accurately in our client care portal."
    ],
    faqs: [
      {
        question: "Can caregivers open pill boxes for clients?",
        answer: "Yes, caregivers can open pill containers, remind clients to take medications, and assist with water or food requirements."
      },
      {
        question: "What happens if a client refuses their medication?",
        answer: "Our caregiver immediately documents the refusal, attempts calm redirection, and notifies the family care manager."
      }
    ],
    relatedServiceSlugs: ["skilled-nursing", "post-hospitalization-care", "companion-care"],
    category: "Clinical & Recovery Support",
    icon: "fa-solid fa-pills"
  },
  {
    slug: "meal-preparation",
    title: "Meal Preparation & Nutrition Care",
    tagline: "Wholesome, Dietary-Tailored Home Cooking & Hydration Support",
    shortDescription: "Freshly prepared, nutritious meals customized to dietary restrictions, promoting senior vitality and wellness.",
    fullDefinition: "Proper nutrition and adequate hydration are fundamental to senior health, energy, and immune strength. Akirapa Home Care meal preparation services ensure clients enjoy delicious, freshly cooked meals tailored to their dietary guidelines (diabetic, low sodium, renal, soft food) while making mealtime an enjoyable, social experience.",
    whoCanBenefit: [
      "Seniors who find cooking physically exhausting or hazardous",
      "Individuals coping with appetite loss, weight loss, or difficulty chewing",
      "Clients with specific dietary prescriptions (cardiac, diabetic, low sodium)",
      "Seniors living alone who tend to skip meals or rely on processed foods"
    ],
    whatIsIncluded: [
      "Personalized weekly menu planning in collaboration with client preferences",
      "Grocery shopping, pantry organization, and fresh ingredient sourcing",
      "Preparation of nutritious breakfast, lunch, dinner, and healthy snacks",
      "Accommodation of special diets (diabetic, low sodium, pureed, renal)",
      "Hydration tracking and gentle fluid intake encouragement",
      "Kitchen cleaning, dishwashing, and safe food storage"
    ],
    familyConsiderations: [
      "Meals are cooked fresh in the client's home kitchen using preferred family recipes.",
      "Caregivers can prepare batch meals for easy heating when caregivers are off duty.",
      "Mealtime companionship encourages improved eating habits and emotional joy."
    ],
    faqs: [
      {
        question: "Can caregivers follow specific doctor-recommended diets?",
        answer: "Absolutely. We strictly customize meal preparation around low-sodium, diabetic, renal, or texture-modified diet protocols."
      },
      {
        question: "Does meal preparation include grocery shopping?",
        answer: "Yes, caregivers can perform grocery shopping or accompany the senior to the store."
      }
    ],
    relatedServiceSlugs: ["homemaker-services", "companion-care", "personal-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-utensils"
  },
  {
    slug: "transportation",
    title: "Senior Transportation & Outing Services",
    tagline: "Safe, Accompanied Rides to Medical Appointments & Shopping in Bedford",
    shortDescription: "Door-through-door transportation assistance for medical visits, errands, religious services, and social events.",
    fullDefinition: "Losing the ability to drive can restrict a senior's independence and access to essential medical care. Akirapa Home Care provides safe, comfortable, accompanied transportation services. Our caregivers assist clients from inside the home into the vehicle, accompany them throughout their appointment or errand, and ensure safe return indoors.",
    whoCanBenefit: [
      "Seniors who no longer drive or feel unsafe navigating traffic",
      "Individuals needing reliable rides to physician visits, physical therapy, or dialysis",
      "Seniors who want to maintain community involvement, shopping, and church attendance",
      "Families unable to take time off work for routine medical transport"
    ],
    whatIsIncluded: [
      "Door-through-door assistance entering and exiting the vehicle",
      "Transport to medical appointments, dental visits, and therapy sessions",
      "Accompaniment inside grocery stores, pharmacies, and banks",
      "Rides to senior centers, religious services, and family gatherings in Greater Boston",
      "Assistance carrying packages, grocery bags, and medical paperwork",
      "Wheelchair/walker folding and vehicle loading"
    ],
    familyConsiderations: [
      "Caregivers possess valid driver's licenses, clean driving records, and insured vehicles.",
      "Door-through-door service ensures the client is never left unattended at curbsides.",
      "Outings help combat senior isolation by maintaining active community connections."
    ],
    faqs: [
      {
        question: "Is this curbside pickup or door-through-door assistance?",
        answer: "Our service is full door-through-door assistance—caregivers walk clients inside clinics and wait with them throughout appointments."
      },
      {
        question: "What areas are covered for senior transportation?",
        answer: "We cover Bedford, Burlington, Lexington, Concord, Billerica, Woburn, and healthcare facilities throughout Greater Boston."
      }
    ],
    relatedServiceSlugs: ["companion-care", "homemaker-services", "post-hospitalization-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-car"
  },
  {
    slug: "homemaker-services",
    title: "Homemaker Services",
    tagline: "Maintaining a Clean, Safe, and Organized Home Environment",
    shortDescription: "Essential household assistance, housekeeping, laundry, and organization to keep home safe and comfortable.",
    fullDefinition: "A clean, organized home environment is essential for fall prevention, respiratory health, and mental peace of mind. Akirapa Home Care homemaker services take care of routine household chores, allowing seniors to enjoy a safe, comfortable, clutter-free living space without physical strain.",
    whoCanBenefit: [
      "Seniors who experience difficulty bending, lifting, or managing household chores",
      "Older adults recovering from joint replacement surgery or severe illness",
      "Individuals needing assistance with laundry, bed linen changes, and trash removal",
      "Families wanting to ensure their loved one's home remains sanitary and safe"
    ],
    whatIsIncluded: [
      "Light housekeeping including dusting, vacuuming, and floor sweeping",
      "Bathroom and kitchen sanitization",
      "Washing, folding, and ironing laundry and linens",
      "Bed making and regular bed sheet changes",
      "Trash removal and recycling management",
      "Organizing closets, pantries, and living areas to eliminate fall hazards"
    ],
    familyConsiderations: [
      "Homemaker services focus on maintaining daily domestic cleanliness and home safety.",
      "Can easily be combined with companion care or personal hygiene care.",
      "Helps prevent common home accidents caused by clutter or slippery floors."
    ],
    faqs: [
      {
        question: "What household tasks are included in homemaker care?",
        answer: "Tasks include vacuuming, dusting, laundry, bed making, dishwashing, trash disposal, and light kitchen/bathroom cleaning."
      },
      {
        question: "Can homemaker services be scheduled weekly in Bedford?",
        answer: "Yes, schedules can be set up for weekly, bi-weekly, or daily household visits."
      }
    ],
    relatedServiceSlugs: ["companion-care", "meal-preparation", "personal-care"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-broom"
  },
  {
    slug: "post-hospitalization-care",
    title: "Post-Hospitalization Care Services",
    tagline: "Smooth Hospital-to-Home Transition & Readmission Prevention",
    shortDescription: "Dedicated recovery support following hospital discharge or rehabilitation to ensure safe, complete healing at home.",
    fullDefinition: "The days immediately following hospital discharge or rehab stay carry the highest risk for medication errors, falls, and emergency hospital readmissions. Akirapa Home Care post-hospitalization care bridges the gap between clinical discharge orders and daily home recovery, ensuring adherence to recovery plans and personal comfort.",
    whoCanBenefit: [
      "Patients being discharged after acute hospitalization, surgery, or rehab stay",
      "Seniors recovering from stroke, cardiac procedures, or joint replacement surgery",
      "Individuals requiring temporary intensive daily support during recovery",
      "Families needing professional guidance to transition a loved one safely home"
    ],
    whatIsIncluded: [
      "Review and adherence to hospital discharge documentation",
      "Prescription pickup, medication organization, and reminder schedules",
      "Transportation home from the hospital or rehab facility",
      "Home safety check to clear walkways, set up equipment, and prevent falls",
      "Wound care support, ice/heat application, and rest encouragement",
      "Coordination of follow-up doctor appointments and physical therapy rides"
    ],
    familyConsiderations: [
      "Care can begin immediately upon discharge, including transportation directly from the hospital.",
      "Post-hospital care drastically reduces 30-day hospital readmission rates.",
      "Shift length can start at 24/7 coverage and gradually step down as health improves."
    ],
    faqs: [
      {
        question: "How far in advance should we arrange post-hospitalization care?",
        answer: "We recommend contacting us 24 to 48 hours prior to expected discharge, but we can also handle urgent same-day discharge requests."
      },
      {
        question: "Does Akirapa communicate with hospital discharge planners?",
        answer: "Yes, our care coordinators work directly with hospital case managers, social workers, and nurses to review discharge plans."
      }
    ],
    relatedServiceSlugs: ["skilled-nursing", "medication-assistance", "24-hour-home-care"],
    category: "Clinical & Recovery Support",
    icon: "fa-solid fa-heart-pulse"
  },
  {
    slug: "activities-of-daily-living",
    title: "Activities of Daily Living (ADL) Support",
    tagline: "Comprehensive In-Home ADL & IADL Assistance in Bedford, MA",
    shortDescription: "Full-spectrum assistance with core daily self-care activities and instrumental home management tasks.",
    fullDefinition: "Activities of Daily Living (ADLs) and Instrumental Activities of Daily Living (IADLs) represent the core skills necessary for independent living. Akirapa Home Care provides comprehensive, structured ADL support, helping seniors maintain autonomy while receiving essential physical and operational assistance around the house.",
    whoCanBenefit: [
      "Seniors struggling with two or more basic daily self-care functions",
      "Individuals experiencing progressive physical weakness, tremor, or cognitive decline",
      "Clients qualifying for long-term care insurance benefits requiring ADL documentation",
      "Older adults needing structured daily support to remain living at home"
    ],
    whatIsIncluded: [
      "Core ADL Support: Bathing, dressing, eating, mobility transfer, toileting, hygiene",
      "Instrumental ADL (IADL) Support: Meal cooking, light cleaning, shopping, phone use",
      "Mobility exercise encouragement and safe ambulation support",
      "Detailed care logging for family members and long-term care insurance claim filing",
      "Personal care plan adjustments as physical independence changes over time"
    ],
    familyConsiderations: [
      "ADL assistance is essential for long-term care insurance claim approvals.",
      "Care plans focus on empowering clients to do what they can while assisting with difficult tasks.",
      "Caregivers are trained in ergonomic physical transfers and fall prevention."
    ],
    faqs: [
      {
        question: "What are the 6 basic Activities of Daily Living (ADLs)?",
        answer: "The 6 core ADLs are bathing, dressing, eating, transferring (mobility), toileting, and maintaining continence."
      },
      {
        question: "Does long-term care insurance cover ADL assistance?",
        answer: "Many long-term care insurance policies cover in-home ADL care when a policyholder requires assistance with 2 or more ADLs."
      }
    ],
    relatedServiceSlugs: ["personal-care", "companion-care", "homemaker-services"],
    category: "Companion & Daily Care",
    icon: "fa-solid fa-person-shelter"
  }
];
