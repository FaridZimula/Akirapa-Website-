export interface CareService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  icon: string; // Lucide icon name
  features: string[];
  idealFor: string[];
  callToAction: string;
}

export const careServices: CareService[] = [
  {
    id: "hourly-home-care",
    title: "Hourly Home Care",
    tagline: "Flexible Care Around Your Daily Schedule",
    description: "Customized care plans designed around your routine, from a few hours a week to daily visits.",
    detailedDescription: "Hourly home care allows clients to maintain their independence in the comfort of home while receiving assistance only when needed. Whether you require help with morning routines, meal preparation, medication reminders, or evening assistance, our certified caregivers adjust flexible shift hours based on a free care assessment.",
    icon: "Clock",
    features: [
      "Customized care plans tailored around your 24-hour day",
      "Assistance with bathing, dressing & personal grooming",
      "Medication reminders & prescription pickup",
      "Nutritious meal planning and preparation",
      "Light housekeeping and laundry",
      "Transportation to doctor appointments & errands"
    ],
    idealFor: [
      "Seniors needing assistance for specific hours of the day",
      "Individuals recovering from illness or minor procedures",
      "Families seeking supplemental care for aging relatives"
    ],
    callToAction: "Schedule Hourly Care Assessment"
  },
  {
    id: "daily-home-care",
    title: "Daily & 24/7 Home Care",
    tagline: "Comprehensive Around-the-Clock Care at Home",
    description: "A continuous, compassionate alternative to nursing homes or assisted living facilities.",
    detailedDescription: "For seniors requiring continuous supervision and care, our daily around-the-clock home care program provides 24/7 peace of mind. Experienced, dedicated caregivers work in shifts to ensure maximum comfort, dignity, safety, and engagement around the clock in the familiar environment of home.",
    icon: "ShieldCheck",
    features: [
      "24/7 continuous in-home supervision and caregiving shifts",
      "Full assistance with activities of daily living (ADLs)",
      "Continuous mobility support & fall prevention oversight",
      "Companionship, emotional support & mental engagement",
      "Coordination with family members and healthcare providers",
      "Real-time family monitoring portal and status updates"
    ],
    idealFor: [
      "Seniors with advanced mobility limitations or chronic conditions",
      "Individuals looking for an alternative to nursing home facilities",
      "Families wanting maximum around-the-clock safety for loved ones"
    ],
    callToAction: "Explore 24/7 Home Care"
  },
  {
    id: "hospital-to-home",
    title: "Hospital to Home Care",
    tagline: "Seamless Transition & Readmission Prevention",
    description: "Specialized post-hospitalization support to ensure a smooth recovery and avoid hospital readmission.",
    detailedDescription: "Transitioning from a hospital or rehab center back home can be overwhelming. Our Hospital to Home Care program bridges the gap between clinical discharge instructions and home execution, helping clients adhere to recovery protocols, manage prescriptions, and prevent costly hospital readmissions.",
    icon: "Activity",
    features: [
      "Discharge plan coordination with hospital social workers & doctors",
      "Post-surgical wound care support & medication management",
      "Transportation from hospital or rehab facility to home",
      "Home environment safety inspection & hazard elimination",
      "Follow-up appointment scheduling & transportation",
      "Dietary adherence according to discharge instructions"
    ],
    idealFor: [
      "Patients being discharged after surgery or acute hospitalization",
      "Individuals undergoing rehabilitation after stroke or cardiac events",
      "Seniors needing temporary intensive monitoring post-discharge"
    ],
    callToAction: "Plan Post-Hospital Recovery"
  },
  {
    id: "respite-home-care",
    title: "Respite Home Care",
    tagline: "Temporary Relief for Family Caregivers",
    description: "Contract-free, flexible relief care allowing primary family caregivers time to rest and recharge.",
    detailedDescription: "Caring for an aging family member is deeply rewarding, but it can also lead to mental and physical burnout. Respite Home Care provides family caregivers with a trusted partner to step in seamlessly, whether for a weekend getaway, vacation, or regular weekly breaks.",
    icon: "HeartHandshake",
    features: [
      "Flexible short-term and contract-free caregiver relief",
      "Seamless continuation of established daily care routines",
      "Coverage for vacations, business trips, or personal days",
      "Reduction of caregiver stress and emotional burnout",
      "Professional, background-checked certified nursing assistants"
    ],
    idealFor: [
      "Family caregivers experiencing exhaustion or stress",
      "Primary caregivers planning upcoming travel or time off",
      "Families testing home care services before long-term commitment"
    ],
    callToAction: "Request Respite Care Support"
  },
  {
    id: "specialized-care",
    title: "Specialized Condition Care",
    tagline: "Expert Support for Alzheimer's, Parkinson's & Memory Care",
    description: "Tailored care plans for individuals coping with progressive neurological conditions, stroke, or hospice support.",
    detailedDescription: "Progressive health conditions demand specialized knowledge and compassionate understanding. Our caregivers receive specialized training in managing cognitive changes, memory loss, agitation, mobility challenges, and end-of-life hospice support with dignity and respect.",
    icon: "Brain",
    features: [
      "Alzheimer's & Dementia memory care & cognitive stimulation",
      "Parkinson's disease assistance with mobility & tremors",
      "Stroke rehabilitation support & speech exercise encouragement",
      "End-of-life and Hospice care support in partnership with local hospice agencies",
      "Behavioral management & wandering prevention strategies",
      "Sensory enrichment and structured daily routines"
    ],
    idealFor: [
      "Individuals diagnosed with Alzheimer's, Dementia, or memory loss",
      "Clients managing Parkinson's, ALS, or post-stroke recovery",
      "Families seeking compassionate end-of-life care at home"
    ],
    callToAction: "Consult a Specialized Care Advisor"
  }
];
