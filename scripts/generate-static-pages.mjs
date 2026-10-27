import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

async function run() {
  console.log('🚀 Starting Akirapa Static Page Pre-Renderer...');

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  // Import data
  const { maCompetitors } = await import('../src/data/maCompetitors.ts');
  const { blogPosts } = await import('../src/data/blogPosts.ts');
  const { detailedServices } = await import('../src/data/detailedServicesData.ts');

  console.log(`📊 Loaded: ${maCompetitors.length} competitors, ${blogPosts.length} blog posts, ${Object.keys(detailedServices).length} services.`);

  let pageCount = 0;

  // Helper to escape HTML attributes
  const esc = (str = '') => String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Helper to write an HTML page
  function writePage(relPath, { title, description, keywords, canonical, jsonLdList = [], bodyHtml = '' }) {
    const targetDir = path.join(distDir, relPath);
    fs.mkdirSync(targetDir, { recursive: true });

    let html = baseTemplate;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/is, `<title>${esc(title)}</title>`);

    // 2. Replace Meta Description
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="description" content="${esc(description)}" />`);

    // 3. Replace Meta Keywords
    if (keywords) {
      html = html.replace(/<meta\s+name=["']keywords["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="keywords" content="${esc(keywords)}" />`);
    }

    // 4. Replace Canonical URL
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/is, `<link rel="canonical" href="${esc(canonical)}" />`);

    // 5. Replace Open Graph Tags
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:title" content="${esc(title)}" />`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:description" content="${esc(description)}" />`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:url" content="${esc(canonical)}" />`);

    // 6. Replace Twitter Tags
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:title" content="${esc(title)}" />`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:description" content="${esc(description)}" />`);

    // Injected Google SERP Thumbnail tags
    const thumbnailTags = `  <meta name="thumbnail" content="https://akirapahomecareus.com/akirapa-og-image.jpg" />\n  <link rel="image_src" href="https://akirapahomecareus.com/akirapa-og-image.jpg" />`;
    html = html.replace('</head>', `${thumbnailTags}\n</head>`);

    // 7. Inject JSON-LD Schema scripts before </head>
    if (jsonLdList && jsonLdList.length > 0) {
      const jsonLdHtml = jsonLdList
        .map(schema => `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`)
        .join('\n');
      html = html.replace('</head>', `${jsonLdHtml}\n</head>`);
    }

    // 8. Inject Semantic Pre-rendered HTML inside <div id="root"></div> for immediate crawler indexing
    if (bodyHtml) {
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
    }

    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    pageCount++;
  }

  // ==========================================
  // 1. Generate 500 Competitor Pages
  // ==========================================
  console.log('⚡ Generating 500 competitor profile pages...');

  for (const comp of maCompetitors) {
    const slug = comp.slug;
    const pageUrl = `https://akirapahomecareus.com/ma-home-care-directory/${slug}`;
    const pageTitle = `${comp.name} - ${comp.city}, MA | Care Reviews & Alternatives — Akirapa Home Care`;
    const pageDesc = `Services Offered: ${comp.services.join(' · ')}. Researching ${comp.name} in ${comp.city}, MA? Review estimated rates (${comp.hourlyRate}), customer ratings (${comp.rating}/5), and compare with 24/7 CNA care from Akirapa Home Care.`;
    const pageKeywords = `${comp.name}, ${comp.name} ${comp.city} MA, ${comp.name} reviews, ${comp.name} pricing, ${comp.name} Massachusetts, home care in ${comp.city} MA, senior care ${comp.city}, in-home caregivers ${comp.region}, Akirapa Home Care`;

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["HomeHealthCareService", "LocalBusiness"],
      "name": comp.name,
      "image": "https://akirapahomecareus.com/akirapa-og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": comp.address,
        "addressLocality": comp.city,
        "addressRegion": "MA",
        "addressCountry": "US"
      },
      "telephone": comp.phone,
      "priceRange": comp.hourlyRate,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": comp.rating.toString(),
        "reviewCount": comp.reviewCount.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What services does ${comp.name} offer in ${comp.city}, Massachusetts?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${comp.name} provides ${comp.services.join(', ')} in ${comp.city} and throughout ${comp.region}. For families seeking contract-free hourly care, certified CNAs, or GPS-verified clock-ins, Akirapa Home Care provides immediate 24/7 local support.`
          }
        },
        {
          "@type": "Question",
          "name": `How much does home care cost with ${comp.name} in Massachusetts?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Estimated private rates for ${comp.name} range approximately ${comp.hourlyRate}, which aligns with the Massachusetts statewide average for non-medical and certified aide services. Akirapa Home Care provides transparent pricing with absolutely zero long-term contract lock-ins.`
          }
        },
        {
          "@type": "Question",
          "name": `How does ${comp.name} compare to Akirapa Home Care?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `While ${comp.name} is an established local provider with a ${comp.rating}/5 rating, Akirapa Home Care differentiates itself through proprietary AkiVault™ GPS real-time caregiver verification, a strict zero-contract policy, and 100% Certified Nursing Assistant (CNA) staffing coordinated 24/7 from Burlington, MA.`
          }
        },
        {
          "@type": "Question",
          "name": `Does ${comp.name} require minimum contract hours?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Most traditional agencies like ${comp.name} require weekly shift minimums (typically 4-hour blocks or 12-20 hours weekly). Akirapa Home Care eliminates restrictive contracts, allowing families to start, adjust, or pause care anytime with zero penalties.`
          }
        }
      ]
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://akirapahomecareus.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Massachusetts Home Care Directory",
          "item": "https://akirapahomecareus.com/ma-home-care-directory"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": comp.name,
          "item": pageUrl
        }
      ]
    };

    // Pre-rendered Semantic HTML for Search Engine Crawlers
    const bodyHtml = `
      <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6;">
        <header style="background: #561868; color: white; padding: 24px 16px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Akirapa Home Care Directory — Massachusetts In-Home Care Guide</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #40ddd3;">24/7 Care Helpline: <strong>+1 781-226-9910</strong> | Burlington, MA</p>
        </header>
        
        <main style="max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 20px; color: #6b7280;">
            <a href="/" style="color: #561868; text-decoration: none;">Home</a> &gt; 
            <a href="/ma-home-care-directory" style="color: #561868; text-decoration: none;">MA Care Directory</a> &gt; 
            <span>${esc(comp.name)}</span>
          </nav>

          <span style="display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: bold; font-size: 12px; padding: 4px 12px; rounded-radius: 9999px; margin-bottom: 12px;">
            Search Rank #${comp.searchRank} · ${esc(comp.region)}
          </span>

          <h1 style="font-size: 32px; font-weight: 900; color: #561868; margin: 8px 0 16px;">
            ${esc(comp.name)}
          </h1>

          <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">
            ${esc(comp.description)}
          </p>

          <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 32px;">
            <h2 style="font-size: 18px; font-weight: bold; color: #561868; margin-top: 0;">Quick Agency Facts</h2>
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              <li><strong>Customer Rating:</strong> ${comp.rating}/5.0 (★ ${comp.reviewCount} reviews)</li>
              <li><strong>Location:</strong> ${esc(comp.city)}, MA (${esc(comp.county)})</li>
              <li><strong>Estimated Pricing:</strong> ${esc(comp.hourlyRate)}</li>
              <li><strong>Phone:</strong> ${esc(comp.phone)}</li>
              <li><strong>Address:</strong> ${esc(comp.address)}</li>
            </ul>
          </section>

          <section style="margin-bottom: 32px;">
            <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Services Offered by ${esc(comp.name)}</h2>
            <ul style="display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0;">
              ${comp.services.map(s => `<li style="background: #ede9fe; color: #5b21b6; padding: 6px 14px; border-radius: 8px; font-size: 14px; font-weight: 600;">✓ ${esc(s)}</li>`).join('')}
            </ul>
          </section>

          <section style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 20px; font-weight: bold; color: #92400e; margin-top: 0;">Compare with Akirapa Home Care</h2>
            <p style="font-size: 15px; color: #78350f;">
              Need certified care in <strong>${esc(comp.city)}</strong> without binding long-term contracts? Akirapa Home Care provides 100% Certified Nursing Assistants (CNAs) with real-time AkiVault™ GPS clock-in verification.
            </p>
            <p style="margin: 16px 0 0;">
              <a href="/contact" style="display: inline-block; background: #76248a; color: white; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Request Free Care Consultation
              </a>
              <span style="margin: 0 12px; color: #92400e; font-weight: bold;">or Call +1 781-226-9910</span>
            </p>
          </section>

          <section style="margin-bottom: 32px;">
            <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Frequently Asked Questions</h2>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${faqSchema.mainEntity.map(f => `
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                  <h3 style="font-size: 16px; font-weight: bold; color: #1f2937; margin: 0 0 6px;">${esc(f.name)}</h3>
                  <p style="margin: 0; font-size: 14px; color: #4b5563;">${esc(f.acceptedAnswer.text)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        </main>
      </div>
    `;

    writePage(`ma-home-care-directory/${slug}`, {
      title: pageTitle,
      description: pageDesc,
      keywords: pageKeywords,
      canonical: pageUrl,
      jsonLdList: [localBusinessSchema, faqSchema, breadcrumbSchema],
      bodyHtml: bodyHtml
    });
  }

  // ==========================================
  // 2. Generate Directory Hub Page (/ma-home-care-directory)
  // ==========================================
  console.log('⚡ Generating main directory hub page...');
  const dirUrl = 'https://akirapahomecareus.com/ma-home-care-directory';
  const dirTitle = 'Massachusetts Home Care Directory (500+ Agencies) | Akirapa Home Care';
  const dirDesc = 'Comprehensive directory of 500+ licensed and private in-home senior care agencies across Massachusetts. Browse by city, rates, ratings, and compare with contract-free care from Akirapa Home Care.';
  const dirKeywords = 'Massachusetts home care directory, senior care Massachusetts, elder care agencies MA, in-home caregivers Boston, home care Middlesex County, home health agencies Worcester, Cape Cod home care';

  const dirItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Massachusetts Home Care Agencies Directory",
    "description": "500 verified home care and senior care providers across Massachusetts.",
    "numberOfItems": maCompetitors.length,
    "itemListElement": maCompetitors.slice(0, 100).map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "url": `https://akirapahomecareus.com/ma-home-care-directory/${c.slug}`
    }))
  };

  const dirBodyHtml = `
    <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 1000px; margin: 0 auto; padding: 32px 16px;">
      <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Massachusetts Home Care Agencies Directory</h1>
      <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">Explore, compare, and review 500+ licensed and private duty home care agencies across Massachusetts.</p>
      <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 12px; padding: 20px; margin-bottom: 32px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #831843; margin-top: 0;">Looking for Burlington & Statewide Massachusetts In-Home Care?</h2>
        <p style="font-size: 15px; color: #9d174d;">Akirapa Home Care provides 100% CNA certified caregivers, AkiVault™ GPS arrival verification, and strict zero-contract flexibility throughout Massachusetts. Call <strong>+1 781-226-9910</strong> for a free consultation.</p>
      </div>
      <h2 style="font-size: 24px; font-weight: bold; color: #561868;">Browse Top Massachusetts Agencies</h2>
      <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; list-style: none; padding: 0;">
        ${maCompetitors.slice(0, 60).map(c => `
          <li style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
            <a href="/ma-home-care-directory/${c.slug}" style="color: #561868; font-weight: bold; text-decoration: none; font-size: 15px; display: block;">${esc(c.name)}</a>
            <span style="font-size: 13px; color: #6b7280;">${esc(c.city)}, MA · ★ ${c.rating} (${c.reviewCount})</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  writePage('ma-home-care-directory', {
    title: dirTitle,
    description: dirDesc,
    keywords: dirKeywords,
    canonical: dirUrl,
    jsonLdList: [dirItemListSchema],
    bodyHtml: dirBodyHtml
  });

  // ==========================================
  // 3. Generate Blog Post Pages (/blog/:slug)
  // ==========================================
  console.log(`⚡ Generating ${blogPosts.length} blog post pages...`);
  for (const post of blogPosts) {
    const postUrl = `https://akirapahomecareus.com/blog/${post.slug}`;
    const postTitle = `${post.title} | Akirapa Home Care Blog`;
    const postDesc = post.excerpt || `Read ${post.title} on the Akirapa Home Care blog. Expert insights on Massachusetts senior care, dementia support, and caregiver guidance.`;

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": postDesc,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author || "Akirapa Home Care Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Akirapa Home Care",
        "logo": {
          "@type": "ImageObject",
          "url": "https://akirapahomecareus.com/akirapa-logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      }
    };

    writePage(`blog/${post.slug}`, {
      title: postTitle,
      description: postDesc,
      canonical: postUrl,
      jsonLdList: [blogPostingSchema]
    });
  }

  // ==========================================
  // 4. Generate Service Detail Pages (/services/:slug)
  // ==========================================
  console.log(`⚡ Generating ${Object.keys(detailedServices).length} service detail pages...`);
  for (const [slug, service] of Object.entries(detailedServices)) {
    const serviceUrl = `https://akirapahomecareus.com/services/${slug}`;
    const serviceTitle = `${service.title} in Massachusetts | Akirapa Home Care`;
    const serviceDesc = service.shortDescription || `${service.title} provided by Akirapa Home Care across Burlington, Middlesex County, and Massachusetts. Call +1 781-226-9910.`;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "provider": {
        "@type": "HomeHealthCareService",
        "name": "Akirapa Home Care",
        "telephone": "+1 781-226-9910",
        "url": "https://akirapahomecareus.com"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Massachusetts"
      },
      "description": serviceDesc
    };

    writePage(`services/${slug}`, {
      title: serviceTitle,
      description: serviceDesc,
      canonical: serviceUrl,
      jsonLdList: [serviceSchema]
    });
  }

  // ==========================================
  // 5. Generate Core Static Pages
  // ==========================================
  console.log('⚡ Generating core pages...');
  const corePages = [
    {
      path: 'services',
      title: 'Senior In-Home Care Services in Massachusetts | Akirapa Home Care',
      description: 'Comprehensive in-home care services across Massachusetts: Hourly care, 24/7 daily & live-in care, hospital-to-home recovery, and specialized Alzheimer\'s support.',
      canonical: 'https://akirapahomecareus.com/services'
    },
    {
      path: 'about',
      title: 'About Us | Premier Massachusetts Home Care — Akirapa Home Care',
      description: 'Learn about Akirapa Home Care Inc., headquartered at 281 Cambridge Street, Burlington, MA. Our mission, certified CNA care team, and GPS-verified standards.',
      canonical: 'https://akirapahomecareus.com/about'
    },
    {
      path: 'contact',
      title: 'Contact Us | Free Care Assessment — Akirapa Home Care',
      description: 'Contact Akirapa Home Care for a free in-home assessment. Serving Burlington, Middlesex County, Greater Boston, and Massachusetts. Call +1 781-226-9910.',
      canonical: 'https://akirapahomecareus.com/contact'
    },
    {
      path: 'careers',
      title: 'Caregiver Careers in Massachusetts | Join Akirapa Home Care',
      description: 'Apply for caregiver, CNA, and home health aide jobs at Akirapa Home Care in Massachusetts. Competitive pay, flexible shifts, and career advancement.',
      canonical: 'https://akirapahomecareus.com/careers'
    },
    {
      path: 'blog',
      title: 'Senior Care Blog & Resources | Akirapa Home Care Massachusetts',
      description: 'Articles, family guides, and medical advice on senior wellness, dementia care, caregiver support, and Massachusetts elder care resources.',
      canonical: 'https://akirapahomecareus.com/blog'
    },
    {
      path: 'akivault',
      title: 'AkiVault™ Real-Time GPS EVV Caregiver Verification | Akirapa Home Care',
      description: 'Discover AkiVault™, Akirapa Home Care\'s proprietary electronic visit verification technology providing real-time GPS clock-in transparency for families.',
      canonical: 'https://akirapahomecareus.com/akivault'
    }
  ];

  for (const page of corePages) {
    writePage(page.path, {
      title: page.title,
      description: page.description,
      canonical: page.canonical
    });
  }

  console.log(`✅ Pre-rendered ${pageCount} static HTML pages successfully into dist/!`);
}

run().catch(err => {
  console.error('❌ Static pre-render failed:', err);
  process.exit(1);
});
