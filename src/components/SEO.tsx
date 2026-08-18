import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = "Akirapa Home Care - Compassionate Home Care Services",
    description = "Providing compassionate, high-quality, and personalized home care services designed around your schedule. Care Your Way.",
    image = "/akirapa-logo.png",
    url = "https://akirapahomecareus.com",
    type = "website"
}: SEOProps) => {
    const siteTitle = title.includes("Akirapa") ? title : `${title} | Akirapa Home Care`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Akirapa Home Care",
                    "url": "https://akirapahomecareus.com",
                    "logo": "https://akirapahomecareus.com/akirapa-logo.png",
                    "description": description,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "209 Burlington Rd",
                        "addressLocality": "Bedford",
                        "addressRegion": "MA",
                        "postalCode": "01730",
                        "addressCountry": "US"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-339-970-1214",
                        "contactType": "Customer Service"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
