export interface MACompetitor {
  id: number;
  name: string;
  slug: string;
  city: string;
  region: string;
  services: string[];
  description: string;
}

export const maCompetitors: MACompetitor[] = [
  {
    id: 1,
    name: "Minute Women Home Care",
    slug: "minute-women-home-care-lexington",
    city: "Lexington",
    region: "Middlesex County",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "Companion Care"],
    description: "Minute Women Home Care is a family-owned agency operating since 1969, specializing in memory and dementia care."
  },
  {
    id: 2,
    name: "BrightStar Care",
    slug: "brightstar-care-lexington",
    city: "Lexington",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Personal Care", "24/7 Live-In Care"],
    description: "BrightStar Care offers both comprehensive in-home care and medical staffing services."
  },
  {
    id: 3,
    name: "Metropolitan Home Health Services",
    slug: "metropolitan-home-health-arlington",
    city: "Arlington",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Personal Care"],
    description: "Metropolitan Home Health Services is a family-owned agency founded by RNs, providing compassionate home health care."
  },
  {
    id: 4,
    name: "Right at Home",
    slug: "right-at-home-bedford",
    city: "Bedford",
    region: "Middlesex County",
    services: ["Companion Care", "Personal Care", "Light Housekeeping"],
    description: "Right at Home provides comprehensive non-medical home care services in the Boston Northwest area."
  },
  {
    id: 5,
    name: "Home Helpers Home Care",
    slug: "home-helpers-burlington",
    city: "Burlington",
    region: "Middlesex County",
    services: ["Personal Care", "Medication Reminders", "Companion Care"],
    description: "Home Helpers Home Care delivers personalized senior care to help clients maintain their independence."
  },
  {
    id: 6,
    name: "Home Instead",
    slug: "home-instead-lexington",
    city: "Lexington",
    region: "Middlesex County",
    services: ["Companion Care", "Light Housekeeping", "Meal Preparation"],
    description: "Home Instead in Lexington offers non-medical support and companionship for seniors aging in place."
  },
  {
    id: 7,
    name: "Assisting Hands",
    slug: "assisting-hands-lexington",
    city: "Lexington",
    region: "Middlesex County",
    services: ["Personal Care", "Companion Care"],
    description: "Assisting Hands provides personal care and companionship to ensure a safe and comfortable home environment."
  },
  {
    id: 8,
    name: "Mass General Brigham Home Care",
    slug: "mass-general-brigham-home-care",
    city: "Boston",
    region: "Greater Boston",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "Mass General Brigham Home Care offers skilled nursing and rehab therapy across Eastern Massachusetts."
  },
  {
    id: 9,
    name: "All At Home Health Care",
    slug: "all-at-home-brookline",
    city: "Brookline",
    region: "Greater Boston",
    services: ["Skilled Nursing", "Personal Care"],
    description: "All At Home Health Care is a certified home health agency offering clinical and personal care services."
  },
  {
    id: 10,
    name: "All Care VNA & Hospice",
    slug: "all-care-vna-hospice",
    city: "Lynn",
    region: "North Shore",
    services: ["Skilled Nursing", "Hospice Support"],
    description: "All Care VNA & Hospice delivers certified home health and compassionate hospice care."
  },
  {
    id: 11,
    name: "Elara Caring",
    slug: "elara-caring-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Personal Care", "Skilled Nursing", "Post-Hospital Recovery"],
    description: "Elara Caring provides a spectrum of services from personal care to skilled home health."
  },
  {
    id: 12,
    name: "TheKey Home Care",
    slug: "thekey-home-care-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["24/7 Live-In Care", "Personal Care", "Companion Care"],
    description: "TheKey Home Care offers personalized services ranging from hourly assistance to 24/7 live-in care."
  },
  {
    id: 13,
    name: "BAYADA Home Health Care",
    slug: "bayada-quincy",
    city: "Quincy",
    region: "South Shore",
    services: ["Skilled Nursing", "Personal Care"],
    description: "BAYADA Home Health Care specializes in highly skilled nursing and personal care services."
  },
  {
    id: 14,
    name: "Visiting Angels Worcester",
    slug: "visiting-angels-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Personal Care", "Companion Care", "Respite Care"],
    description: "Visiting Angels in Worcester provides private duty personal care and supportive companionship."
  },
  {
    id: 15,
    name: "Home Instead Worcester",
    slug: "home-instead-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Alzheimer's & Dementia Care", "Personal Care"],
    description: "Home Instead Worcester assists seniors with daily activities and provides specialized memory support."
  },
  {
    id: 16,
    name: "Notre Dame Health Care",
    slug: "notre-dame-health-care-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Personal Care", "Hospice Support"],
    description: "Notre Dame Health Care focuses on private duty care, mobility assistance, and hygiene support."
  },
  {
    id: 17,
    name: "Seven Hills Foundation",
    slug: "seven-hills-foundation-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Companion Care", "Respite Care"],
    description: "Seven Hills Foundation offers dedicated companionship and respite care for families."
  },
  {
    id: 18,
    name: "Worcester Home Care",
    slug: "worcester-home-care",
    city: "Worcester",
    region: "Worcester County",
    services: ["Personal Care", "24/7 Live-In Care"],
    description: "Worcester Home Care provides comprehensive 1:1 personal care throughout the Metrowest area."
  },
  {
    id: 19,
    name: "Visiting Angels West Springfield",
    slug: "visiting-angels-west-springfield",
    city: "West Springfield",
    region: "Hampden County",
    services: ["Personal Care", "Meal Preparation"],
    description: "Visiting Angels offers reliable senior home care to help clients live comfortably at home."
  },
  {
    id: 20,
    name: "Cornerstone Caregiving",
    slug: "cornerstone-caregiving-springfield",
    city: "Springfield",
    region: "Hampden County",
    services: ["Companion Care", "Personal Care"],
    description: "Cornerstone Caregiving provides compassionate and personalized in-home care services."
  },
  {
    id: 21,
    name: "Chanda Care",
    slug: "chanda-care-springfield",
    city: "Springfield",
    region: "Hampden County",
    services: ["Personal Care", "Meal Preparation", "Companion Care"],
    description: "Chanda Care delivers attentive personal care, meal preparation, and companion care."
  },
  {
    id: 22,
    name: "HomeCare Hands",
    slug: "homecare-hands-western-ma",
    city: "Springfield",
    region: "Hampden County",
    services: ["24/7 Live-In Care", "Personal Care"],
    description: "HomeCare Hands provides round-the-clock in-home care and professional staffing solutions."
  },
  {
    id: 23,
    name: "Golden Heart Home Healthcare",
    slug: "golden-heart-hampden",
    city: "Springfield",
    region: "Hampden County",
    services: ["Light Housekeeping", "Personal Care", "Transportation & Errands"],
    description: "Golden Heart Home Healthcare assists with homemaking, personal care, and transportation needs."
  },
  {
    id: 24,
    name: "Interim HealthCare",
    slug: "interim-healthcare-west-springfield",
    city: "West Springfield",
    region: "Hampden County",
    services: ["Personal Care", "Skilled Nursing"],
    description: "Interim HealthCare offers professional at-home personal care and clinical support."
  },
  {
    id: 25,
    name: "Always Best Care Senior Services",
    slug: "always-best-care-cambridge",
    city: "Cambridge",
    region: "Middlesex County",
    services: ["Companion Care", "Personal Care"],
    description: "Always Best Care Senior Services delivers trusted non-medical in-home care for seniors."
  },
  {
    id: 26,
    name: "iMed Home Care",
    slug: "imed-home-care-cambridge",
    city: "Cambridge",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Post-Hospital Recovery"],
    description: "iMed Home Care provides skilled home health services with rigorous RN supervision."
  },
  {
    id: 27,
    name: "Somerville-Cambridge Elder Services",
    slug: "somerville-cambridge-elder-services",
    city: "Somerville",
    region: "Middlesex County",
    services: ["Transportation & Errands", "Meal Preparation"],
    description: "Somerville-Cambridge Elder Services provides extensive in-home support for the aging community."
  },
  {
    id: 28,
    name: "Cottage Caregivers",
    slug: "cottage-caregivers-lexington",
    city: "Lexington",
    region: "Middlesex County",
    services: ["Companion Care", "Personal Care", "Respite Care"],
    description: "Cottage Caregivers offers a holistic approach to senior care and reliable respite for families."
  },
  {
    id: 29,
    name: "Comfort Keepers",
    slug: "comfort-keepers-ma",
    city: "Needham",
    region: "Greater Boston",
    services: ["Personal Care", "Companion Care"],
    description: "Comfort Keepers provides interactive caregiving that enhances quality of life and independence."
  },
  {
    id: 30,
    name: "Griswold Home Care",
    slug: "griswold-home-care-ma",
    city: "Newton",
    region: "Greater Boston",
    services: ["Personal Care", "Light Housekeeping", "Respite Care"],
    description: "Griswold Home Care offers compassionate support and non-medical home care services."
  },
  {
    id: 31,
    name: "Boston Senior Home Care",
    slug: "boston-senior-home-care",
    city: "Boston",
    region: "Greater Boston",
    services: ["Meal Preparation", "Personal Care", "Transportation & Errands"],
    description: "Boston Senior Home Care helps elderly residents maintain healthy, independent lives in their own homes."
  },
  {
    id: 32,
    name: "Traditions Home Health Services",
    slug: "traditions-home-health",
    city: "Dedham",
    region: "Norfolk County",
    services: ["Personal Care", "Companion Care", "Alzheimer's & Dementia Care"],
    description: "Traditions Home Health Services specializes in custom-tailored care plans and dementia support."
  },
  {
    id: 33,
    name: "Aviv Home Care",
    slug: "aviv-home-care-peabody",
    city: "Peabody",
    region: "North Shore",
    services: ["Skilled Nursing", "Physical Therapy", "Personal Care"],
    description: "Aviv Home Care provides robust clinical care and personal support to North Shore residents."
  },
  {
    id: 34,
    name: "ABC Home Healthcare Professionals",
    slug: "abc-home-healthcare-wakefield",
    city: "Wakefield",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Personal Care", "Post-Hospital Recovery"],
    description: "ABC Home Healthcare Professionals offer comprehensive nursing and private duty care."
  },
  {
    id: 35,
    name: "VNA Care",
    slug: "vna-care-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Skilled Nursing", "Hospice Support", "Physical Therapy"],
    description: "VNA Care provides top-tier visiting nursing, hospice, and rehabilitative services."
  },
  {
    id: 36,
    name: "Best of Care",
    slug: "best-of-care-quincy",
    city: "Quincy",
    region: "South Shore",
    services: ["Personal Care", "Light Housekeeping", "Companion Care"],
    description: "Best of Care has been helping South Shore seniors with personal care and daily living since 1981."
  },
  {
    id: 37,
    name: "O'Connell Care at Home",
    slug: "oconnell-care-springfield",
    city: "Springfield",
    region: "Hampden County",
    services: ["Personal Care", "24/7 Live-In Care", "Respite Care"],
    description: "O'Connell Care at Home offers dependable and compassionate in-home care for the Pioneer Valley."
  },
  {
    id: 38,
    name: "Beacon Hospice",
    slug: "beacon-hospice-fall-river",
    city: "Fall River",
    region: "Bristol County",
    services: ["Hospice Support", "Skilled Nursing", "Respite Care"],
    description: "Beacon Hospice provides dedicated end-of-life care and support for patients and families."
  },
  {
    id: 39,
    name: "BAMSI Home Care",
    slug: "bamsi-home-care-brockton",
    city: "Brockton",
    region: "Plymouth County",
    services: ["Personal Care", "Companion Care", "Transportation & Errands"],
    description: "BAMSI Home Care delivers supportive human services and home care across Plymouth County."
  },
  {
    id: 40,
    name: "Tribute Home Care",
    slug: "tribute-home-care-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "24/7 Live-In Care"],
    description: "Tribute Home Care specializes in high-quality personal care and dementia support in Greater Boston."
  },
  {
    id: 41,
    name: "Associated Home Care",
    slug: "associated-home-care-beverly",
    city: "Beverly",
    region: "North Shore",
    services: ["Companion Care", "Personal Care", "Meal Preparation"],
    description: "Associated Home Care provides extensive non-medical care options across the North Shore."
  },
  {
    id: 42,
    name: "Celtic Home Care",
    slug: "celtic-home-care",
    city: "Framingham",
    region: "Metrowest",
    services: ["Personal Care", "Medication Reminders", "Companion Care"],
    description: "Celtic Home Care offers experienced caregiving for elders seeking independence in Metrowest."
  },
  {
    id: 43,
    name: "Amada Senior Care",
    slug: "amada-senior-care-newton",
    city: "Newton",
    region: "Greater Boston",
    services: ["Personal Care", "Companion Care", "Transportation & Errands"],
    description: "Amada Senior Care in Newton focuses on enriching lives through compassionate personal assistance."
  },
  {
    id: 44,
    name: "Caring Friends Home Care",
    slug: "caring-friends-framingham",
    city: "Framingham",
    region: "Metrowest",
    services: ["Light Housekeeping", "Personal Care", "Meal Preparation"],
    description: "Caring Friends Home Care ensures clients are safe and supported with their daily routines."
  },
  {
    id: 45,
    name: "Northeast Clinical Services",
    slug: "northeast-clinical-danvers",
    city: "Danvers",
    region: "North Shore",
    services: ["Skilled Nursing", "Personal Care", "Physical Therapy"],
    description: "Northeast Clinical Services delivers complex medical care and rehabilitative services at home."
  },
  {
    id: 46,
    name: "Amedisys Home Health",
    slug: "amedisys-home-health-lawrence",
    city: "Lawrence",
    region: "Essex County",
    services: ["Skilled Nursing", "Post-Hospital Recovery", "Medication Reminders"],
    description: "Amedisys Home Health provides expert nursing care to accelerate post-hospital recovery."
  },
  {
    id: 47,
    name: "South Shore VNA",
    slug: "south-shore-vna-weymouth",
    city: "Weymouth",
    region: "South Shore",
    services: ["Skilled Nursing", "Physical Therapy", "Hospice Support"],
    description: "South Shore VNA brings high-quality clinical and therapeutic services directly to the patient's home."
  },
  {
    id: 48,
    name: "Ezra Home Care",
    slug: "ezra-home-care-newton",
    city: "Newton",
    region: "Greater Boston",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "24/7 Live-In Care"],
    description: "Ezra Home Care provides highly personalized and culturally sensitive private duty care."
  },
  {
    id: 49,
    name: "Hospice of Western & Central Massachusetts",
    slug: "hospice-western-central-ma",
    city: "Springfield",
    region: "Pioneer Valley",
    services: ["Hospice Support", "Respite Care", "Companion Care"],
    description: "This agency provides compassionate end-of-life care across Western and Central Massachusetts."
  },
  {
    id: 50,
    name: "Old Colony Elder Services",
    slug: "old-colony-elder-services",
    city: "Brockton",
    region: "Plymouth County",
    services: ["Meal Preparation", "Personal Care", "Light Housekeeping"],
    description: "Old Colony Elder Services assists seniors and individuals with disabilities in leading independent lives."
  },
  {
    id: 51,
    name: "Century Homecare",
    slug: "century-homecare-worcester",
    city: "Worcester",
    region: "Worcester County",
    services: ["Skilled Nursing", "Physical Therapy", "Personal Care"],
    description: "Century Homecare is a comprehensive home health agency focusing on skilled and non-skilled care."
  },
  {
    id: 52,
    name: "Carepro Home Health",
    slug: "carepro-home-health-lowell",
    city: "Lowell",
    region: "Middlesex County",
    services: ["Personal Care", "Companion Care", "Medication Reminders"],
    description: "Carepro Home Health offers attentive personal care to seniors residing in the Greater Lowell area."
  },
  {
    id: 53,
    name: "Anodyne Homemaker Services",
    slug: "anodyne-homemaker-quincy",
    city: "Quincy",
    region: "South Shore",
    services: ["Light Housekeeping", "Personal Care", "Companion Care"],
    description: "Anodyne Homemaker Services has provided trusted home making and personal care for decades."
  },
  {
    id: 54,
    name: "Home Care Alliance of MA",
    slug: "home-care-alliance-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Companion Care", "Personal Care", "Advocacy"],
    description: "Home Care Alliance provides connections to extensive home care services and health advocacy."
  },
  {
    id: 55,
    name: "HouseWorks",
    slug: "houseworks-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "Light Housekeeping"],
    description: "HouseWorks helps seniors age safely at home through flexible and customized home care solutions."
  },
  {
    id: 56,
    name: "Tender Care",
    slug: "tender-care-lawrence",
    city: "Lawrence",
    region: "Essex County",
    services: ["Personal Care", "Companion Care", "Transportation & Errands"],
    description: "Tender Care provides community-based senior support and personal care services."
  },
  {
    id: 57,
    name: "Berkshire Healthcare",
    slug: "berkshire-healthcare-pittsfield",
    city: "Pittsfield",
    region: "Berkshire County",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "Berkshire Healthcare offers robust post-acute care and rehabilitative home health services."
  },
  {
    id: 58,
    name: "Home Health VNA",
    slug: "home-health-vna-lawrence",
    city: "Lawrence",
    region: "Essex County",
    services: ["Skilled Nursing", "Physical Therapy", "Medication Reminders"],
    description: "Home Health VNA delivers expert clinical care to patients recovering at home."
  },
  {
    id: 59,
    name: "Suburban Home Health Care",
    slug: "suburban-home-health-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Skilled Nursing", "Personal Care", "Post-Hospital Recovery"],
    description: "Suburban Home Health Care focuses on transitional care and managing chronic conditions."
  },
  {
    id: 60,
    name: "Family Service Association",
    slug: "family-service-fall-river",
    city: "Fall River",
    region: "Bristol County",
    services: ["Companion Care", "Personal Care", "Transportation & Errands"],
    description: "Family Service Association provides comprehensive elder care programs in Bristol County."
  },
  {
    id: 61,
    name: "Greater Springfield Senior Services",
    slug: "greater-springfield-senior-services",
    city: "Springfield",
    region: "Hampden County",
    services: ["Meal Preparation", "Personal Care", "Respite Care"],
    description: "This agency supports independent living for older adults throughout the greater Springfield region."
  },
  {
    id: 62,
    name: "Guardian Healthcare",
    slug: "guardian-healthcare-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "Guardian Healthcare offers skilled medical services to help patients recover comfortably at home."
  },
  {
    id: 63,
    name: "FirstLight Home Care",
    slug: "firstlight-home-care-needham",
    city: "Needham",
    region: "Greater Boston",
    services: ["Companion Care", "Personal Care", "Light Housekeeping"],
    description: "FirstLight Home Care provides innovative and compassionate non-medical home care."
  },
  {
    id: 64,
    name: "AideCare",
    slug: "aidecare-lowell",
    city: "Lowell",
    region: "Middlesex County",
    services: ["Personal Care", "24/7 Live-In Care", "Medication Reminders"],
    description: "AideCare specializes in daily assistance and continuous care for elderly clients."
  },
  {
    id: 65,
    name: "A Better Life Homecare",
    slug: "a-better-life-homecare-springfield",
    city: "Springfield",
    region: "Hampden County",
    services: ["Personal Care", "Companion Care", "Transportation & Errands"],
    description: "A Better Life Homecare helps seniors in Western MA enjoy a dignified and active lifestyle."
  },
  {
    id: 66,
    name: "Premier Home Health Care",
    slug: "premier-home-health-ma",
    city: "New Bedford",
    region: "Bristol County",
    services: ["Skilled Nursing", "Personal Care", "Companion Care"],
    description: "Premier Home Health Care delivers culturally competent medical and non-medical support."
  },
  {
    id: 67,
    name: "LifeCare Advocates",
    slug: "lifecare-advocates-newton",
    city: "Newton",
    region: "Greater Boston",
    services: ["Companion Care", "Personal Care", "Respite Care"],
    description: "LifeCare Advocates provides care management and holistic home support for seniors."
  },
  {
    id: 68,
    name: "HopeHealth",
    slug: "hopehealth-hyannis",
    city: "Hyannis",
    region: "Cape Cod",
    services: ["Hospice Support", "Skilled Nursing", "Respite Care"],
    description: "HopeHealth offers extensive palliative and hospice care across the Cape and Islands."
  },
  {
    id: 69,
    name: "Community VNA",
    slug: "community-vna-attleboro",
    city: "Attleboro",
    region: "Bristol County",
    services: ["Skilled Nursing", "Physical Therapy", "Alzheimer's & Dementia Care"],
    description: "Community VNA provides exceptional visiting nurse services and specialty dementia care."
  },
  {
    id: 70,
    name: "Care Central VNA",
    slug: "care-central-vna-webster",
    city: "Webster",
    region: "Worcester County",
    services: ["Skilled Nursing", "Hospice Support", "Personal Care"],
    description: "Care Central VNA delivers trusted home health and hospice services to Central Massachusetts."
  },
  {
    id: 71,
    name: "VNA of Cape Cod",
    slug: "vna-of-cape-cod",
    city: "Falmouth",
    region: "Cape Cod",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "VNA of Cape Cod supports patients transitioning from hospital to home with expert clinical care."
  },
  {
    id: 72,
    name: "Tuckahoe Home Care",
    slug: "tuckahoe-home-care-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Personal Care", "Light Housekeeping", "Meal Preparation"],
    description: "Tuckahoe Home Care provides reliable and caring assistance for daily living activities."
  },
  {
    id: 73,
    name: "Overlook VNA",
    slug: "overlook-vna-charlton",
    city: "Charlton",
    region: "Worcester County",
    services: ["Skilled Nursing", "Physical Therapy", "Hospice Support"],
    description: "Overlook VNA offers a broad range of home-based clinical therapies and nursing support."
  },
  {
    id: 74,
    name: "Natick VNA",
    slug: "natick-vna",
    city: "Natick",
    region: "Metrowest",
    services: ["Skilled Nursing", "Post-Hospital Recovery", "Medication Reminders"],
    description: "Natick VNA provides award-winning healthcare services in the comfort of patients' homes."
  },
  {
    id: 75,
    name: "Seniors Helping Seniors",
    slug: "seniors-helping-seniors-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Companion Care", "Light Housekeeping", "Transportation & Errands"],
    description: "Seniors Helping Seniors pairs mature caregivers with seniors needing companionship and support."
  },
  {
    id: 76,
    name: "Maxim Healthcare Services",
    slug: "maxim-healthcare-woburn",
    city: "Woburn",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Personal Care", "Respite Care"],
    description: "Maxim Healthcare Services offers comprehensive medical and personal care solutions."
  },
  {
    id: 77,
    name: "Northeast Arc",
    slug: "northeast-arc-danvers",
    city: "Danvers",
    region: "North Shore",
    services: ["Personal Care", "Companion Care", "Respite Care"],
    description: "Northeast Arc provides vital home care and support services for individuals of all abilities."
  },
  {
    id: 78,
    name: "Visting Rehab and Nursing Services",
    slug: "visiting-rehab-nursing-mansfield",
    city: "Mansfield",
    region: "Bristol County",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "This agency focuses on intense rehabilitation and nursing care following hospitalization."
  },
  {
    id: 79,
    name: "Home Care Solutions",
    slug: "home-care-solutions-plymouth",
    city: "Plymouth",
    region: "South Shore",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "Light Housekeeping"],
    description: "Home Care Solutions provides specialized dementia care and daily assistance on the South Shore."
  },
  {
    id: 80,
    name: "Salmon Home Care",
    slug: "salmon-home-care-milford",
    city: "Milford",
    region: "Worcester County",
    services: ["Skilled Nursing", "Hospice Support", "Personal Care"],
    description: "Salmon Home Care delivers a continuum of health services across Central Massachusetts."
  },
  {
    id: 81,
    name: "Caring Company",
    slug: "caring-company-cambridge",
    city: "Cambridge",
    region: "Middlesex County",
    services: ["Companion Care", "Meal Preparation", "Transportation & Errands"],
    description: "Caring Company offers neighborly support and errand running for local elders."
  },
  {
    id: 82,
    name: "Northbridge Home Care",
    slug: "northbridge-home-care-burlington",
    city: "Burlington",
    region: "Middlesex County",
    services: ["Personal Care", "Companion Care", "Respite Care"],
    description: "Northbridge Home Care focuses on maintaining dignity and independence through tailored services."
  },
  {
    id: 83,
    name: "Brockton VNA",
    slug: "brockton-vna",
    city: "Brockton",
    region: "Plymouth County",
    services: ["Skilled Nursing", "Physical Therapy", "Post-Hospital Recovery"],
    description: "Brockton VNA has served the community with premier visiting nurse services for over 100 years."
  },
  {
    id: 84,
    name: "Integrity Home Care",
    slug: "integrity-home-care-waltham",
    city: "Waltham",
    region: "Middlesex County",
    services: ["Personal Care", "24/7 Live-In Care", "Light Housekeeping"],
    description: "Integrity Home Care provides reliable live-in and hourly personal care services."
  },
  {
    id: 85,
    name: "Apex Healthcare Services",
    slug: "apex-healthcare-springfield",
    city: "Springfield",
    region: "Hampden County",
    services: ["Skilled Nursing", "Personal Care", "Physical Therapy"],
    description: "Apex Healthcare Services delivers holistic medical and non-medical care at home."
  },
  {
    id: 86,
    name: "Loving Care at Home",
    slug: "loving-care-at-home-newton",
    city: "Newton",
    region: "Greater Boston",
    services: ["Companion Care", "Medication Reminders", "Personal Care"],
    description: "Loving Care at Home focuses on emotional well-being and consistent physical support."
  },
  {
    id: 87,
    name: "Southcoast VNA",
    slug: "southcoast-vna-fairhaven",
    city: "Fairhaven",
    region: "Bristol County",
    services: ["Skilled Nursing", "Hospice Support", "Physical Therapy"],
    description: "Southcoast VNA brings advanced clinical care and hospice services to the South Coast region."
  },
  {
    id: 88,
    name: "Vibrant Homecare",
    slug: "vibrant-homecare-framingham",
    city: "Framingham",
    region: "Metrowest",
    services: ["Personal Care", "Companion Care", "Transportation & Errands"],
    description: "Vibrant Homecare helps seniors live active, engaged lives with flexible support options."
  },
  {
    id: 89,
    name: "Silver Linings Home Care",
    slug: "silver-linings-andover",
    city: "Andover",
    region: "Essex County",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "Respite Care"],
    description: "Silver Linings Home Care offers highly specialized memory care and respite for families."
  },
  {
    id: 90,
    name: "Heart to Heart Home Care",
    slug: "heart-to-heart-boston",
    city: "Boston",
    region: "Greater Boston",
    services: ["Companion Care", "Light Housekeeping", "Meal Preparation"],
    description: "Heart to Heart Home Care offers warm companionship and household assistance."
  },
  {
    id: 91,
    name: "Pioneer Valley Home Care",
    slug: "pioneer-valley-home-care",
    city: "Northampton",
    region: "Hampshire County",
    services: ["Personal Care", "24/7 Live-In Care", "Companion Care"],
    description: "Pioneer Valley Home Care supports independent living in Western Massachusetts."
  },
  {
    id: 92,
    name: "Ocean State Home Health",
    slug: "ocean-state-home-health-fall-river",
    city: "Fall River",
    region: "Bristol County",
    services: ["Skilled Nursing", "Personal Care", "Physical Therapy"],
    description: "Ocean State Home Health offers exceptional rehabilitative and nursing care across the border region."
  },
  {
    id: 93,
    name: "Emerson Home Care",
    slug: "emerson-home-care-concord",
    city: "Concord",
    region: "Middlesex County",
    services: ["Personal Care", "Companion Care", "Post-Hospital Recovery"],
    description: "Emerson Home Care works closely with local hospitals to ensure a safe transition home."
  },
  {
    id: 94,
    name: "Minute Care",
    slug: "minute-care-chelmsford",
    city: "Chelmsford",
    region: "Middlesex County",
    services: ["Personal Care", "Medication Reminders", "Light Housekeeping"],
    description: "Minute Care provides prompt, dependable daily assistance for aging adults."
  },
  {
    id: 95,
    name: "Dignity Home Care",
    slug: "dignity-home-care-lynn",
    city: "Lynn",
    region: "North Shore",
    services: ["Personal Care", "Alzheimer's & Dementia Care", "Respite Care"],
    description: "Dignity Home Care honors elders by providing respectful, dignified personal care services."
  },
  {
    id: 96,
    name: "Care Advantage",
    slug: "care-advantage-marlborough",
    city: "Marlborough",
    region: "Metrowest",
    services: ["Skilled Nursing", "Personal Care", "Post-Hospital Recovery"],
    description: "Care Advantage delivers skilled nursing interventions and robust personal assistance."
  },
  {
    id: 97,
    name: "Lighthouse Home Care",
    slug: "lighthouse-home-care-gloucester",
    city: "Gloucester",
    region: "North Shore",
    services: ["Companion Care", "Transportation & Errands", "Meal Preparation"],
    description: "Lighthouse Home Care ensures seniors on the North Shore have safe transport and nutritious meals."
  },
  {
    id: 98,
    name: "New England Home Health",
    slug: "new-england-home-health-woburn",
    city: "Woburn",
    region: "Middlesex County",
    services: ["Skilled Nursing", "Physical Therapy", "Medication Reminders"],
    description: "New England Home Health offers top-tier clinical care designed to keep patients out of the hospital."
  },
  {
    id: 99,
    name: "Compassionate Caregivers",
    slug: "compassionate-caregivers-canton",
    city: "Canton",
    region: "Norfolk County",
    services: ["Personal Care", "Companion Care", "Light Housekeeping"],
    description: "Compassionate Caregivers focuses on building strong, trusting relationships with clients."
  },
  {
    id: 100,
    name: "Ascend Home Care",
    slug: "ascend-home-care-shrewsbury",
    city: "Shrewsbury",
    region: "Worcester County",
    services: ["24/7 Live-In Care", "Personal Care", "Respite Care"],
    description: "Ascend Home Care provides reliable round-the-clock support for those requiring constant care."
  }
];
