import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = "SUYEL - Step Up Uganda Youth Empowerment League",
    description = "Empowering young people in Uganda to become leaders of positive change through education, skills development, and community engagement.",
    image = "/Favi Icon.png",
    url = "https://suyel.org",
    type = "website"
}: SEOProps) => {
    const siteTitle = title.includes("SUYEL") ? title : `${title} | SUYEL`;

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
                    "@type": "NGO",
                    "name": "SUYEL",
                    "alternateName": "Step Up Uganda Youth Empowerment League",
                    "url": "https://suyel.org",
                    "logo": "https://suyel.org/Favi%20Icon.png",
                    "description": description,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Iganga & Wakiso",
                        "addressCountry": "UG"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+256 745878827",
                        "contactType": "General inquiries"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
