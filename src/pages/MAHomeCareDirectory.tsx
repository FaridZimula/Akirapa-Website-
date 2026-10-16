import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { maCompetitors, MACompetitor } from '@/data/maCompetitors';
import { Helmet } from 'react-helmet-async';

const REGIONS = [
  'All',
  'Middlesex County',
  'Greater Boston',
  'Worcester County',
  'North Shore',
  'South Shore',
  'Bristol County',
  'Cape Cod & Islands',
  'Western MA'
];

const ITEMS_PER_PAGE = 24;

export default function MAHomeCareDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [sortBy, setSortBy] = useState<'search' | 'rating' | 'name'>('search');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when search or region changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeRegion, sortBy]);

  const filteredCompetitors = useMemo(() => {
    const list = maCompetitors.filter((comp: MACompetitor) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        comp.name.toLowerCase().includes(term) || 
        comp.city.toLowerCase().includes(term) ||
        comp.region.toLowerCase().includes(term) ||
        comp.services.some(s => s.toLowerCase().includes(term));

      const matchesRegion = activeRegion === 'All' || comp.region === activeRegion;
      return matchesSearch && matchesRegion;
    });

    // Sort according to selection
    if (sortBy === 'search') {
      list.sort((a, b) => a.searchRank - b.searchRank);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchTerm, activeRegion, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCompetitors.length / ITEMS_PER_PAGE);
  const paginatedCompetitors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompetitors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCompetitors, currentPage]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Massachusetts Home Care Agencies Directory",
    "description": "Comprehensive index of 500 home care and senior care agencies across Massachusetts ranked by search volume and ratings.",
    "numberOfItems": filteredCompetitors.length,
    "itemListElement": filteredCompetitors.slice(0, 50).map((comp: MACompetitor, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": comp.name,
      "url": `https://akirapahomecareus.com/ma-home-care-directory/${comp.slug}`,
      "item": {
        "@type": "LocalBusiness",
        "name": comp.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": comp.address,
          "addressLocality": comp.city,
          "addressRegion": "MA",
          "addressCountry": "US"
        },
        "telephone": comp.phone,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": comp.rating.toString(),
          "reviewCount": comp.reviewCount.toString()
        }
      }
    }))
  };

  return (
    <Layout>
      <SEO 
        title="Top 500 Home Care Agencies in Massachusetts | 2025/2026 Directory | Akirapa Home Care"
        description="Search and compare 500 home care agencies across Massachusetts, including Burlington, Lexington, Boston, Worcester, and Cape Cod. Filter by popularity, ratings, and rates."
        path="/ma-home-care-directory"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#76248a] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/CARE GIVER  (14).jpg"
            alt="Massachusetts Senior Home Care Directory"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#561868] to-transparent opacity-90 mix-blend-multiply"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center text-white px-4">
          <div className="inline-flex items-center gap-2 bg-[#40ddd3] text-[#561868] font-black px-4 py-1.5 rounded-full text-xs md:text-sm mb-6 uppercase tracking-wider">
            <i className="fa-solid fa-ranking-star"></i>
            Massachusetts Senior Care Directory • 500 Verified Agencies
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Top 500 Home Care Agencies in Massachusetts
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Ranked by search volume and customer ratings across Middlesex County, Greater Boston, Worcester County, North Shore, South Shore, and Cape Cod.
          </p>
        </div>
      </section>

      {/* Intro Editorial Section */}
      <section className="section-padding bg-gray-50 px-4">
        <div className="container-narrow">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <span className="text-xs uppercase font-bold text-[#76248a] tracking-wider bg-[#76248a]/10 px-3 py-1 rounded-full">
                  Editorial Industry Guide
                </span>
                <h2 className="text-3xl font-black text-[#561868] mt-2">
                  Navigating Massachusetts Home Care in 2025/2026
                </h2>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <a href="tel:339-970-1214">
                  <Button className="bg-[#76248a] hover:bg-[#561868] text-white font-bold rounded-full px-6 py-5 shadow-md">
                    <i className="fa-solid fa-phone mr-2"></i> Free Care Advice: 339-970-1214
                  </Button>
                </a>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With more than 500 home care organizations operating across the Commonwealth of Massachusetts, finding the right balance of clinical quality, reliability, and fair pricing can feel overwhelming. From national franchised organizations to boutique private-duty agencies, Massachusetts families have diverse choices.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Headquartered in Burlington, MA, <strong>Akirapa Home Care</strong> is engineered specifically to eliminate common industry pitfalls: our proprietary <strong>AkiVault™ live GPS verification</strong> ensures clock-ins are never falsified, our <strong>strict zero-contract model</strong> lets you adjust care with zero commitment, and all caregivers are <strong>Certified Nursing Assistants (CNAs)</strong> vetted to the highest clinical standards.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Filter & Search Controls */}
      <section className="py-10 bg-white px-4 border-b border-gray-100">
        <div className="container-narrow">
          
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by agency, city, or service..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76248a] focus:border-transparent shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Toggle Controls */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1">
              <span className="text-xs uppercase font-bold text-gray-400 mr-2 shrink-0">Sort By:</span>
              <button
                onClick={() => setSortBy('search')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  sortBy === 'search'
                    ? 'bg-[#76248a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className="fa-solid fa-fire mr-1 text-[#40ddd3]"></i> Most Searched
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  sortBy === 'rating'
                    ? 'bg-[#76248a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className="fa-solid fa-star mr-1 text-yellow-400"></i> Highest Rated
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  sortBy === 'name'
                    ? 'bg-[#76248a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                A - Z
              </button>
            </div>
          </div>
          
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeRegion === region 
                    ? 'bg-[#561868] text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-sm text-gray-500 font-medium mb-8 pb-4 border-b border-gray-100">
            <div>
              Showing <strong className="text-gray-800">{paginatedCompetitors.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredCompetitors.length)}</strong> of <strong className="text-[#76248a]">{filteredCompetitors.length}</strong> Massachusetts agencies
              {activeRegion !== 'All' && <span> in <strong>{activeRegion}</strong></span>}
            </div>
            {totalPages > 1 && (
              <div className="text-xs text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {/* 500 Agencies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedCompetitors.map((comp: MACompetitor, index: number) => (
              <React.Fragment key={comp.slug}>
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full hover:border-[#76248a]/30 group">
                  <div className="mb-4 flex-grow">
                    
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-purple-50 text-[#76248a] text-xs font-bold px-2.5 py-1 rounded-full border border-purple-100">
                        #{comp.searchRank} Popularity
                      </span>
                      <div className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                        <span>★ {comp.rating}</span>
                        <span className="text-gray-400 font-normal ml-1">({comp.reviewCount})</span>
                      </div>
                    </div>

                    {/* Agency Title */}
                    <h3 className="text-xl font-black text-[#561868] group-hover:text-[#76248a] transition-colors mb-2">
                      <Link to={`/ma-home-care-directory/${comp.slug}`}>
                        {comp.name}
                      </Link>
                    </h3>

                    <div className="flex items-center text-xs text-gray-500 mb-3 font-medium">
                      <i className="fa-solid fa-location-dot mr-1.5 text-[#40ddd3]"></i>
                      {comp.city}, {comp.region}
                    </div>

                    <div className="text-xs font-bold text-[#76248a] mb-4 bg-gray-50 p-2 rounded-xl">
                      Est. Rates: <span className="text-gray-800">{comp.hourlyRate}</span>
                    </div>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {comp.services?.slice(0, 3).map((service: string, i: number) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                          {service}
                        </span>
                      ))}
                      {comp.services?.length > 3 && (
                        <span className="text-[11px] font-medium text-gray-400 self-center">
                          +{comp.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  {/* Footer Action Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link 
                      to={`/ma-home-care-directory/${comp.slug}`} 
                      className="text-xs font-bold text-[#76248a] hover:text-[#40ddd3] transition-colors flex items-center group-hover:translate-x-0.5"
                    >
                      Read Review & Compare
                      <i className="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                    </Link>
                    <span className="text-[11px] text-gray-400">MA Licensed</span>
                  </div>
                </div>

                {/* Sticky CTA Banner after every 8 items on page 1 */}
                {currentPage === 1 && (index + 1) === 8 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#76248a] to-[#561868] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden my-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#40ddd3] rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="md:w-2/3">
                        <span className="bg-[#40ddd3] text-[#561868] font-bold text-xs uppercase px-3 py-1 rounded-full mb-3 inline-block">
                          The Akirapa Difference
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black mb-4">
                          Why Families in Massachusetts Choose Akirapa Over Other Agencies
                        </h3>
                        <p className="text-white/90 text-base mb-0 leading-relaxed">
                          We eliminate home care uncertainty through <strong>AkiVault™ live GPS verification</strong>, ensuring caregivers are verified on-site. Coupled with our <strong>zero-contract policy</strong>, 100% Certified Nursing Assistants (CNAs), and 24/7 Burlington supervision, we deliver peace of mind that traditional agencies simply cannot offer.
                        </p>
                      </div>
                      <div className="md:w-1/3 flex flex-col gap-3 w-full shrink-0">
                        <Link to="/contact">
                          <Button className="w-full bg-[#40ddd3] text-[#561868] hover:bg-white button-shimmer font-bold rounded-full py-6 text-base shadow-lg">
                            Schedule Free Assessment
                          </Button>
                        </Link>
                        <a href="tel:339-970-1214">
                          <Button variant="outline" className="w-full border-2 border-white/40 text-white hover:bg-white/10 hover:text-white font-bold rounded-full py-6 text-base">
                            <i className="fa-solid fa-phone mr-2"></i> Call 339-970-1214
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* No Results Fallback */}
          {filteredCompetitors.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Massachusetts agencies found</h3>
              <p className="text-gray-500">Try searching for a different town, city, or clearing your region filter.</p>
              <Button 
                onClick={() => { setSearchTerm(''); setActiveRegion('All'); }}
                className="mt-6 bg-[#76248a] hover:bg-[#561868] text-white rounded-full px-8"
              >
                Reset Directory Filters
              </Button>
            </div>
          )}

          {/* Pagination Navigation Controls */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
              <div className="text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages} ({filteredCompetitors.length} total agencies)
              </div>

              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="rounded-full px-4 text-xs font-bold"
                >
                  <i className="fa-solid fa-chevron-left mr-1"></i> Prev
                </Button>

                {/* Display selective page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    return (
                      <React.Fragment key={page}>
                        {prev && page - prev > 1 && <span className="px-1 text-gray-400">...</span>}
                        <button
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                            currentPage === page
                              ? 'bg-[#76248a] text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="rounded-full px-4 text-xs font-bold"
                >
                  Next <i className="fa-solid fa-chevron-right ml-1"></i>
                </Button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Authority SEO Content */}
      <section className="section-padding bg-gray-50 px-4">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-black text-[#561868] mb-8">
              Why Akirapa Home Care is the #1 Alternative in Massachusetts
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                When researching home care agencies across Massachusetts, families quickly discover that promises of quality are everywhere, but real accountability is hard to find. Traditional agencies frequently rely on antiquated manual telephone timesheets, lock families into 12 to 20-hour weekly minimum commitments, and dispatch rotating aides with varying levels of credentials.
              </p>
              
              <p>
                Based in Burlington, MA, <strong>Akirapa Home Care</strong> was founded by healthcare professionals to set a new benchmark for Massachusetts elder care:
              </p>

              <ul className="space-y-3 pl-4 border-l-4 border-[#76248a]">
                <li>
                  <strong>AkiVault™ Real-Time GPS Clock-In:</strong> Every shift is timestamped and location-verified at your loved one's door. You know exactly when your caregiver arrives and leaves.
                </li>
                <li>
                  <strong>Zero-Contract Policy:</strong> Never get locked into restrictive long-term commitments. Pause, adjust, or end care whenever your family's needs evolve.
                </li>
                <li>
                  <strong>100% Certified Nursing Assistants:</strong> We prioritize medical competence. Our caregivers are certified CNAs trained in dementia, fall mitigation, and post-surgical recovery.
                </li>
                <li>
                  <strong>Local Middlesex & Greater Boston Leadership:</strong> You are supported directly by our Burlington office, not an out-of-state call center.
                </li>
              </ul>
            </div>
            
            <div className="mt-10 p-6 bg-[#76248a]/5 border border-[#76248a]/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-[#561868] mb-2">Ready for transparent, reliable Massachusetts home care?</h4>
                <p className="text-gray-600 mb-0">Call us today at 339-970-1214 for a free, personalized care evaluation.</p>
              </div>
              <Link to="/contact" className="shrink-0">
                <Button className="bg-[#76248a] hover:bg-[#561868] text-white button-shimmer font-bold rounded-full px-8 py-6 shadow-md">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
