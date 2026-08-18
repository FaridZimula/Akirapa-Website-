import { Helmet } from "react-helmet-async";

const SITE_URL = "https://akirapahomecareus.com";
const SITE_NAME = "Akirapa Home Care";
const DEFAULT_OG_IMAGE = `${SITE_URL}/akirapa-og-image.jpg`;

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    /** Relative path like "/services" or "/blog/my-post-slug" */
    path?: string;
    type?: "website" | "article";
    /** For blog articles */
    article?: {
        publishedTime?: string;
        author?: string;
        section?: string;
    };
    noindex?: boolean;
}

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/akirapa-logo.png`,
    "image": DEFAULT_OG_IMAGE,
    "description": "Compassionate in-home senior care in Burlington, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support.",
    "telephone": "+1-339-970-1214",
    "email": "info@akirapahomecareus.com",
    "priceRange": "$$",
    "areaServed": [
        { "@type": "City", "name": "Burlington", "addressRegion": "MA" },
        { "@type": "City", "name": "Woburn", "addressRegion": "MA" },
        { "@type": "City", "name": "Lexington", "addressRegion": "MA" },
        { "@type": "City", "name": "Bedford", "addressRegion": "MA" },
        { "@type": "City", "name": "Billerica", "addressRegion": "MA" }
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "83 Cambridge Street",
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
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
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
        "https://www.google.com/maps?q=83+Cambridge+Street+Burlington+MA+01803"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home Care Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hourly Home Care" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Daily Home Care" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospital to Home Recovery Care" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Respite Care" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alzheimer's & Dementia Care" } }
        ]
    }
};

const SEO = ({
    title = `${SITE_NAME} | In-Home Senior Care & 24/7 Services`,
    description = "Compassionate in-home senior care in Burlington, MA. Hourly care, 24/7 daily care, hospital to home recovery, respite care, and specialized Alzheimer's support. Call 339-970-1214.",
    image = DEFAULT_OG_IMAGE,
    path = "/",
    type = "website",
    article,
    noindex = false,
}: SEOProps) => {
    const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;

    return (
        <Helmet>
            {/* Standard */}
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

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

            {/* LocalBusiness Structured Data (injected on every page for Google) */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
