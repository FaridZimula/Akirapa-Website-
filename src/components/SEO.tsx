import { Helmet } from "react-helmet-async";

const SITE_URL = "https://akirapahomecareus.com";
const SITE_NAME = "Akirapa Home Care";
const DEFAULT_OG_IMAGE = `${SITE_URL}/akirapa-og-image.jpg`;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Relative path like "/services" or "/blog/my-post-slug" */
  path?: string;
  type?: "website" | "article";
  /** For blog articles */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  schemaExtra?: object[];
  noindex?: boolean;
  googleSiteVerification?: string;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeHealthCareService", "MedicalBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  "name": SITE_NAME,
  "legalName": "Akirapa Home Care Inc.",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/akirapa-logo.png`,
    "width": "400",
    "height": "120"
  },
  "image": DEFAULT_OG_IMAGE,
  "description": "Premier Massachusetts in-home senior care headquartered in Burlington, MA. Specializing in hourly care, 24/7 live-in care, hospital-to-home recovery, certified Alzheimer's & dementia care, and respite services with AkiVault™ real-time GPS EVV verification.",
  "telephone": "+1 781-226-9910",
  "email": "info@akirapahomecareus.com",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Check, Long-Term Care Insurance, Private Duty",
  "knowsAbout": [
    "In-Home Senior Care",
    "Alzheimer's and Dementia Care",
    "24/7 Around the Clock Live-In Care",
    "Hospital-to-Home Post-Discharge Recovery",
    "Respite Care for Family Caregivers",
    "Activities of Daily Living (ADL) Assistance",
    "Companion Care",
    "Personal Care Services",
    "Electronic Visit Verification (EVV) & GPS Verification",
    "Medication Reminders",
    "Massachusetts Senior Care Services"
  ],
  "medicalSpecialty": ["Geriatrics", "PrimaryCare"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "281 Cambridge Street",
    "addressLocality": "Burlington",
    "addressRegion": "MA",
    "postalCode": "01803",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.50289,
    "longitude": -71.19694
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Massachusetts", "sameAs": "https://en.wikipedia.org/wiki/Massachusetts" },
    { "@type": "City", "name": "Burlington", "addressRegion": "MA" },
    { "@type": "City", "name": "Woburn", "addressRegion": "MA" },
    { "@type": "City", "name": "Lexington", "addressRegion": "MA" },
    { "@type": "City", "name": "Bedford", "addressRegion": "MA" },
    { "@type": "City", "name": "Billerica", "addressRegion": "MA" },
    { "@type": "City", "name": "Winchester", "addressRegion": "MA" },
    { "@type": "City", "name": "Arlington", "addressRegion": "MA" },
    { "@type": "City", "name": "Belmont", "addressRegion": "MA" },
    { "@type": "City", "name": "Concord", "addressRegion": "MA" },
    { "@type": "City", "name": "Waltham", "addressRegion": "MA" },
    { "@type": "City", "name": "Newton", "addressRegion": "MA" },
    { "@type": "City", "name": "Brookline", "addressRegion": "MA" },
    { "@type": "City", "name": "Boston", "addressRegion": "MA" },
    { "@type": "City", "name": "Cambridge", "addressRegion": "MA" },
    { "@type": "City", "name": "Somerville", "addressRegion": "MA" },
    { "@type": "City", "name": "Medford", "addressRegion": "MA" },
    { "@type": "City", "name": "Malden", "addressRegion": "MA" },
    { "@type": "City", "name": "Melrose", "addressRegion": "MA" },
    { "@type": "City", "name": "Reading", "addressRegion": "MA" },
    { "@type": "City", "name": "North Reading", "addressRegion": "MA" },
    { "@type": "City", "name": "Wakefield", "addressRegion": "MA" },
    { "@type": "City", "name": "Stoneham", "addressRegion": "MA" },
    { "@type": "City", "name": "Lynnfield", "addressRegion": "MA" },
    { "@type": "City", "name": "Peabody", "addressRegion": "MA" },
    { "@type": "City", "name": "Danvers", "addressRegion": "MA" },
    { "@type": "City", "name": "Beverly", "addressRegion": "MA" },
    { "@type": "City", "name": "Salem", "addressRegion": "MA" },
    { "@type": "City", "name": "Wellesley", "addressRegion": "MA" },
    { "@type": "City", "name": "Needham", "addressRegion": "MA" },
    { "@type": "City", "name": "Natick", "addressRegion": "MA" },
    { "@type": "City", "name": "Framingham", "addressRegion": "MA" },
    { "@type": "City", "name": "Worcester", "addressRegion": "MA" },
    { "@type": "City", "name": "Quincy", "addressRegion": "MA" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1 781-226-9910",
      "contactType": "Customer Service & Care Intake",
      "areaServed": "US-MA",
      "availableLanguage": ["English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61593927368567",
    "https://www.instagram.com/akirapahomecare/",
    "https://x.com/akirapahomecare",
    "https://www.google.com/maps?q=281+Cambridge+Street+Burlington+MA+01803"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Massachusetts In-Home Care Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hourly Home Care" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Daily & Live-In Home Care" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospital to Home Recovery Care" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Respite Care for Family Caregivers" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alzheimer's & Dementia Care" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Companion Care Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Care & ADL Support" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skilled Nursing Oversight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Post-Hospitalization Transitional Care" } }
    ]
  }
};

const SEO = ({
  title = `${SITE_NAME} | In-Home Senior Care & 24/7 Services — Burlington, MA`,
  description = "Compassionate in-home senior care headquartered in Burlington, MA. Hourly care, 24/7 daily care, hospital-to-home recovery, respite care, and specialized Alzheimer's support across Massachusetts. Call +1 781-226-9910.",
  keywords = "home care Massachusetts, senior care Burlington MA, in-home care MA, 24-hour home care Massachusetts, Alzheimer's care MA, dementia home care, respite care Burlington MA, caregiver Burlington MA, elder care Middlesex County, home health aide MA",
  image = DEFAULT_OG_IMAGE,
  path = "/",
  type = "website",
  article,
  breadcrumbs,
  faqs,
  schemaExtra = [],
  noindex = false,
  googleSiteVerification,
}: SEOProps) => {
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const fullImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  const gscVerificationCode = googleSiteVerification || (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined);

  // Auto-generate BreadcrumbList schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.path.startsWith("http") ? crumb.path : `${SITE_URL}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`
    }))
  } : null;

  // Auto-generate FAQPage schema if faqs are provided
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Auto-generate BlogPosting / Article schema if type is article
  const articleSchema = type === "article" && article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title.replace(` | ${SITE_NAME}`, ""),
    "description": description,
    "image": [fullImageUrl],
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "author": {
      "@type": "Person",
      "name": article.author || "Akirapa Home Care Team",
      "jobTitle": "Care Management Specialist",
      "worksFor": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/akirapa-logo.png`
      }
    },
    "articleSection": article.section || "Senior Home Care",
    "inLanguage": "en-US"
  } : null;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      {gscVerificationCode && <meta name="google-site-verification" content={gscVerificationCode} />}

      {/* Local & Geographic Targeting for Massachusetts */}
      <meta name="geo.region" content="US-MA" />
      <meta name="geo.placename" content="Burlington, Massachusetts" />
      <meta name="geo.position" content="42.5029;-71.1969" />
      <meta name="ICBM" content="42.5029, -71.1969" />

      {/* Open Graph / Social Sharing */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Article-specific OG */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@akirapahomecare" />
      <meta name="twitter:creator" content="@akirapahomecare" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* LocalBusiness Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* BreadcrumbList Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* FAQPage Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Article Schema */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Additional Page-Specific Schemas */}
      {schemaExtra.map((schema, index) => (
        <script key={`schema-extra-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
