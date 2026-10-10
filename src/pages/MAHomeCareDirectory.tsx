import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { maCompetitors } from '@/data/maCompetitors';
import { Helmet } from 'react-helmet-async';

const REGIONS = [
  'All',
  'Greater Boston',
  'Middlesex County',
  'Worcester County',
  'Western MA',
  'South Shore',
  'North Shore',
  'Cape Cod & Islands'
];

export default function MAHomeCareDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const filteredCompetitors = useMemo(() => {
    return maCompetitors.filter((comp: any) => {
      const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            comp.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = activeRegion === 'All' || comp.region === activeRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, activeRegion]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredCompetitors.slice(0, 100).map((comp: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": comp.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": comp.city,
          "addressRegion": "MA"
        }
      }
    }))
  };

  return (
    <Layout>
      <SEO 
        title="Top 100 Home Care Agencies in Massachusetts | 2025 Comparison Guide | Akirapa Home Care"
        description="Compare the top 100 home care agencies across Massachusetts including Burlington, Boston, Worcester, Springfield, and Cape Cod. Find the best senior care provider for your family."
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
            alt="Massachusetts Senior Care"
            className="w-full h-full object-cover opacity-29"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#561868] to-transparent opacity-80 mix-blend-multiply"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center text-white px-4">
          <div className="inline-block bg-[#40ddd3] text-[#561868] font-bold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider">
            Massachusetts Senior Care Directory
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Top 100 Home Care Agencies in Massachusetts
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Compare the top agencies across Burlington, Boston, Worcester, Springfield, and Cape Cod to find the perfect care for your loved ones.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-gray-50 px-4">
        <div className="container-narrow">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden text-center md:text-left">
            <h2 className="text-3xl font-black text-[#561868] mb-6">Choosing the Right Home Care Agency is Critical</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Massachusetts has hundreds of agencies offering varying levels of home care services, which makes choosing the right provider for your family an overwhelming task. Whether you need specialized dementia care, post-surgical assistance, or general companionship, this guide helps you compare the top 100 home care agencies across the state. While many of these companies offer standard care, <strong>Akirapa Home Care</strong> stands out as a premier choice in Burlington, MA and the Greater Boston area, distinguishing itself with our innovative AkiVault GPS verification, certified nursing assistants, and a no-contract model that prioritizes your flexibility.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Use the directory below to explore your options. Need immediate assistance or a free care assessment? Call us directly at <a href="tel:339-970-1214" className="text-[#76248a] font-bold hover:text-[#40ddd3] transition-colors">339-970-1214</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Filter & Search */}
      <section className="py-12 bg-white px-4">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#561868]">Agency Directory</h2>
            <div className="relative w-full md:w-96">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by company or city..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#76248a] focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeRegion === region 
                    ? 'bg-[#76248a] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="mb-6 text-gray-500 font-medium">
            Showing {filteredCompetitors.length} {filteredCompetitors.length === 1 ? 'agency' : 'agencies'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompetitors.map((comp: any, index: number) => (
              <React.Fragment key={comp.name + index}>
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-xl font-black text-[#561868] mb-2">{comp.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                      <i className="fa-solid fa-location-dot mr-2 text-[#40ddd3]"></i>
                      {comp.city}, {comp.region}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {comp.services?.map((service: string, i: number) => (
                        <span key={i} className="bg-[#76248a]/10 text-[#76248a] text-xs font-bold px-2 py-1 rounded-md">
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {comp.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to="/contact" className="text-sm font-bold text-[#76248a] hover:text-[#40ddd3] transition-colors flex items-center justify-between group">
                      Compare with Akirapa Home Care 
                      <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>

                {/* Sticky CTA Banner after every 10 items */}
                {(index + 1) % 10 === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#76248a] to-[#561868] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden my-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#40ddd3] rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="md:w-2/3">
                        <h3 className="text-2xl md:text-3xl font-black mb-4">
                          Why Families in {activeRegion !== 'All' ? activeRegion : 'Massachusetts'} Choose Akirapa Home Care
                        </h3>
                        <p className="text-white/90 text-lg mb-0">
                          We eliminate the uncertainty of home care with our proprietary <strong>AkiVault GPS verification</strong>, ensuring caregivers are exactly where they need to be. Combined with our zero-contract policy, certified nursing assistants, and 24/7 availability, we deliver peace of mind that other agencies simply can't match.
                        </p>
                      </div>
                      <div className="md:w-1/3 flex flex-col gap-4 w-full">
                        <Link to="/contact">
                          <Button className="w-full bg-[#40ddd3] text-[#561868] hover:bg-white button-shimmer font-bold rounded-full py-6 text-lg shadow-lg">
                            Schedule Free Assessment
                          </Button>
                        </Link>
                        <a href="tel:339-970-1214">
                          <Button variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold rounded-full py-6 text-lg">
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
          
          {filteredCompetitors.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No agencies found</h3>
              <p className="text-gray-500">Try adjusting your search term or selecting a different region.</p>
              <Button 
                onClick={() => { setSearchTerm(''); setActiveRegion('All'); }}
                className="mt-6 bg-[#76248a] hover:bg-[#561868] text-white rounded-full px-8"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom SEO Content */}
      <section className="section-padding bg-gray-50 px-4">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-black text-[#561868] mb-8">
              Why Akirapa Home Care Stands Out Among Massachusetts Home Care Agencies
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                When comparing the top home care agencies in Massachusetts, families are often presented with similar promises. However, finding reliable, transparent, and compassionate care is a significant decision. Based in Burlington, MA, <strong>Akirapa Home Care</strong> fundamentally changes how home care is delivered across the state by focusing on accountability, flexibility, and the highest standards of care.
              </p>
              
              <p>
                Unlike traditional agencies, Akirapa Home Care introduces total transparency through our proprietary <strong>AkiVault GPS verification system</strong>. This technology ensures that you always know exactly when your caregiver arrives and leaves, eliminating the stress and uncertainty that often accompanies in-home care. We believe families deserve to have absolute confidence in their loved one's caregivers.
              </p>
              
              <p>
                Furthermore, we recognize that care needs can change rapidly. That is why we operate on a strict <strong>no-contract model</strong>. We earn your trust through our daily commitment to excellence, rather than locking you into long-term obligations. This flexible approach allows you to adjust or cancel services as your family's circumstances evolve, providing unparalleled freedom and peace of mind.
              </p>
              
              <p>
                Our team is comprised of highly trained Certified Nursing Assistants (CNAs) and experienced caregivers who are available 24/7. From Burlington to Boston and beyond, we are dedicated to offering personalized, dignified care that allows seniors to age safely and comfortably in their own homes.
              </p>
            </div>
            
            <div className="mt-10 p-6 bg-[#76248a]/5 border border-[#76248a]/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-[#561868] mb-2">Ready to experience the Akirapa difference?</h4>
                <p className="text-gray-600 mb-0">Contact us today for a free, no-obligation care assessment.</p>
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
