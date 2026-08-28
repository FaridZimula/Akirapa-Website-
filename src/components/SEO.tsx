import { Helmet } from "react-helmet-async";

const SITE_URL = "https://akirapahomecareus.com";
const SITE_NAME = "Akirapa Home Care";
const DEFAULT_OG_IMAGE = `${SITE_URL}/akirapa-og-image.jpg`;

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    /** Relative path like "/services" or "/locations/bedford-ma" */
    path?: string;
    type?: "website" | "article";
    /** For blog articles */
    article?: {
        publishedTime?: string;
        author?: string;
        section?: string;
    };
    noindex?: boolean;
    googleSiteVerification?: string;
    /** Extra JSON-LD Schema.org objects for specific page types */
    schemaExtra?: object[];
}

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/akirapa-logo.png`,
    "image": DEFAULT_OG_IMAGE,
    "description": "Compassionate in-home senior care headquartered in Bedford, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support.",
    "telephone": "+1-339-970-1214",
    "email": "info@akirapahomecareus.com",
    "priceRange": "$$",
    "areaServed": [
        { "@type": "City", "name": "Bedford", "addressRegion": "MA" },
        { "@type": "City", "name": "Lexington", "addressRegion": "MA" },
        { "@type": "City", "name": "Concord", "addressRegion": "MA" },
        { "@type": "City", "name": "Billerica", "addressRegion": "MA" },
        { "@type": "City", "name": "Burlington", "addressRegion": "MA" },
        { "@type": "City", "name": "Woburn", "addressRegion": "MA" }
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "209 Burlington Rd",
        "addressLocality": "Bedford",
        "addressRegion": "MA",
        "postalCode": "01730",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.4939,
        "longitude": -71.2678
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        }
    ],
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "telephone": "+1-339-970-1214",
            "contactType": "Customer Service",
            "availLanguage": "English",
            "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        }
    ],
    "sameAs": [
        "https://www.facebook.com/akirapahomecare",
        "https://akirapahomecareus.com"
    ]
};

const SEO = ({
    title = `${SITE_NAME} | In-Home Senior Care & 24/7 Services — Bedford, MA`,
    description = "Compassionate in-home senior care in Bedford, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support. Call 339-970-1214.",
    image = DEFAULT_OG_IMAGE,
    path = "/",
    type = "website",
    article,
    noindex = false,
    googleSiteVerification,
    schemaExtra = []
}: SEOProps) => {
    const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const gscVerificationCode = googleSiteVerification || (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined);

    const isAdminPath = path.startsWith("/admin");
    const shouldNoIndex = noindex || isAdminPath;

    return (
        <Helmet>
            {/* Standard */}
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            {shouldNoIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}
            {gscVerificationCode && <meta name="google-site-verification" content={gscVerificationCode} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image.startsWith("http") ? image : `${SITE_URL}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={canonicalUrl} />

            {/* Article-specific OG (for blog posts) */}
            {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
            {article?.author && <meta property="article:author" content={article.author} />}
            {article?.section && <meta property="article:section" content={article.section} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image.startsWith("http") ? image : `${SITE_URL}${image}`} />

            {/* Base LocalBusiness Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>

            {/* Additional Page-Specific Schemas */}
            {schemaExtra.map((schemaObj, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schemaObj)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
