import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { massachusettsLocations } from "@/data/massachusettsLocations";

export default function LocationsHub() {
  const hubItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Massachusetts Senior Home Care Service Areas",
    "description": "Cities and communities served by Akirapa Home Care across Middlesex County and Massachusetts.",
    "numberOfItems": massachusettsLocations.length,
    "itemListElement": massachusettsLocations.map((loc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `Akirapa Home Care in ${loc.cityName}, MA`,
      "url": `https://akirapahomecareus.com/locations/${loc.slug}`
    }))
  };

  return (
    <Layout>
      <SEO
        title="Massachusetts Service Areas & Communities | Akirapa Home Care"
        description="Explore Massachusetts cities and towns served by Akirapa Home Care. Headquartered in Burlington, MA with 24/7 CNA care in Lexington, Woburn, Bedford, Concord, Boston, and beyond."
        keywords="home care Massachusetts locations, senior care Middlesex County, home care Burlington MA, in home care Lexington, senior care Woburn, home health aide Boston MA"
        path="/locations"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/locations" }
        ]}
        schemaExtra={[hubItemListSchema]}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#76248a] text-white overflow-hidden text-center">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-[#40ddd3] text-gray-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
            <i className="fa-solid fa-map-location-dot"></i>
            <span>Middlesex County & Greater Massachusetts</span>
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Massachusetts Communities We Proudly Serve
          </h1>

          <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Headquartered at 281 Cambridge Street in Burlington, MA, Akirapa Home Care provides dedicated local caregiver pods and immediate nurse supervisor check-ins across Eastern Massachusetts.
          </p>

          <div className="pt-2">
            <a
              href="tel:+17812269910"
              className="inline-flex items-center gap-2 bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-black px-8 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <i className="fa-solid fa-phone"></i>
              <span>24/7 Care Helpline: +1 781-226-9910</span>
            </a>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              Select Your Community for Local Care Details
            </h2>
            <p className="text-gray-600 text-base">
              Every town in our service network is covered by licensed CNAs, real-time AkiVault™ GPS arrival verification, and a strict contract-free policy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {massachusettsLocations.map((loc) => {
              const isHQ = loc.slug === "burlington-ma";
              return (
                <div
                  key={loc.slug}
                  className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isHQ
                      ? "bg-purple-50/60 border-[#76248a] shadow-md ring-2 ring-[#76248a]/20"
                      : "bg-white border-gray-200 hover:border-[#76248a]/50 hover:shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#76248a] bg-white px-3 py-1 rounded-full border border-[#76248a]/20">
                        {isHQ ? "★ Headquarters" : loc.county}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {loc.distanceFromHQ}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {loc.cityName}, MA
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        Zip Codes: {loc.zipCodes.join(", ")}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {loc.shortDescription}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/locations/${loc.slug}`}
                      className="text-sm font-bold text-[#76248a] hover:text-[#561868] inline-flex items-center gap-1.5"
                    >
                      <span>View {loc.cityName} Care Page</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                    <span className="text-[11px] font-bold bg-[#40ddd3]/20 text-[#0f5c56] px-2 py-0.5 rounded-full">
                      CNAs Available
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick FAQ / Guidance */}
          <div className="bg-gray-50 rounded-3xl p-8 max-w-4xl mx-auto border border-gray-200 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              Don't See Your Exact Massachusetts Town Listed?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We frequently accommodate clients throughout Middlesex, Suffolk, Essex, and Norfolk Counties. Contact our Burlington care coordination office at <strong>+1 781-226-9910</strong> to confirm caregiver availability in your neighborhood.
            </p>
            <div className="pt-2">
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-xl text-sm">
                <Link to="/contact">Request Care Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
