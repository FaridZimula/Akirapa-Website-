import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

async function run() {
  console.log('🚀 Starting Akirapa Static Page Pre-Renderer & SEO Enhancer...');

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

  console.log(`📊 Loaded: ${maCompetitors.length} competitors, ${blogPosts.length} blog posts, ${detailedServices.length} services.`);

  let pageCount = 0;

  // Helper to escape HTML attributes
  const esc = (str = '') => String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Helper to write an HTML page
  function writePage(relPath, { title, description, keywords, canonical, jsonLdList = [], bodyHtml = '' }) {
    const isRoot = relPath === '' || relPath === '/';
    const targetDir = isRoot ? distDir : path.join(distDir, relPath);
    if (!isRoot) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

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

    // Injected Google SERP Thumbnail tags if not present
    if (!html.includes('name="thumbnail"')) {
      const thumbnailTags = `  <meta name="thumbnail" content="https://akirapahomecareus.com/akirapa-og-image.jpg" />\n  <link rel="image_src" href="https://akirapahomecareus.com/akirapa-og-image.jpg" />`;
      html = html.replace('</head>', `${thumbnailTags}\n</head>`);
    }

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

          <span style="display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px;">
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
        ${maCompetitors.slice(0, 100).map(c => `
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
  console.log(`⚡ Generating ${blogPosts.length} blog post pages with full semantic pre-rendering...`);
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

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://akirapahomecareus.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://akirapahomecareus.com/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl }
      ]
    };

    // Pre-rendered Semantic HTML for Search Engine Crawlers
    const paragraphs = (post.content || '').split('\n\n').filter(Boolean);
    const blogBodyHtml = `
      <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.8;">
        <header style="background: #561868; color: white; padding: 36px 16px; text-align: center;">
          <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 12px; color: #e9d5ff;">
            <a href="/" style="color: #40ddd3; text-decoration: none;">Home</a> &gt; 
            <a href="/blog" style="color: #40ddd3; text-decoration: none;">Blog</a> &gt; 
            <span>${esc(post.category)}</span>
          </nav>
          <span style="display: inline-block; background: #40ddd3; color: #0f172a; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px;">
            ${esc(post.category)} · ${esc(post.readTime || '5 min read')}
          </span>
          <h1 style="font-size: 32px; font-weight: 900; max-width: 800px; margin: 0 auto 12px; color: #ffffff;">
            ${esc(post.title)}
          </h1>
          <p style="font-size: 14px; color: #d8b4fe; margin: 0;">
            By <strong>${esc(post.author || 'Akirapa Care Team')}</strong> · Published ${esc(post.date)}
          </p>
        </header>

        <main style="max-width: 800px; margin: 0 auto; padding: 40px 16px;">
          <p style="font-size: 20px; font-weight: 500; color: #374151; margin-bottom: 28px; line-height: 1.6; border-left: 4px solid #76248a; padding-left: 16px;">
            ${esc(post.excerpt)}
          </p>

          <article style="font-size: 17px; color: #1f2937;">
            ${paragraphs.map(p => {
              if (p.startsWith('### ')) return `<h3 style="font-size: 20px; font-weight: bold; color: #561868; margin: 28px 0 12px;">${esc(p.replace('### ', ''))}</h3>`;
              if (p.startsWith('## ')) return `<h2 style="font-size: 24px; font-weight: bold; color: #561868; margin: 32px 0 16px;">${esc(p.replace('## ', ''))}</h2>`;
              return `<p style="margin-bottom: 18px;">${esc(p)}</p>`;
            }).join('')}
          </article>

          <section style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 16px; padding: 28px; margin: 40px 0;">
            <h2 style="font-size: 22px; font-weight: bold; color: #831843; margin-top: 0;">Need Personalized Senior Care Guidance in Massachusetts?</h2>
            <p style="color: #9d174d; font-size: 16px;">
              Akirapa Home Care provides 100% CNA certified caregivers, GPS-verified EVV transparency, and contract-free in-home care in Burlington, MA and across the state.
            </p>
            <p style="margin: 16px 0 0;">
              <a href="/contact" style="display: inline-block; background: #76248a; color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 15px;">
                Request Free Care Consultation
              </a>
              <span style="margin-left: 16px; font-weight: bold; color: #831843;">Call 24/7: +1 781-226-9910</span>
            </p>
          </section>
        </main>
      </div>
    `;

    writePage(`blog/${post.slug}`, {
      title: postTitle,
      description: postDesc,
      canonical: postUrl,
      jsonLdList: [blogPostingSchema, breadcrumbSchema],
      bodyHtml: blogBodyHtml
    });
  }

  // ==========================================
  // 4. Generate Service Detail Pages (/services/:slug)
  // ==========================================
  console.log(`⚡ Generating ${detailedServices.length} service detail pages with full semantic pre-rendering...`);
  for (const service of detailedServices) {
    const slug = service.slug;
    const serviceUrl = `https://akirapahomecareus.com/services/${slug}`;
    const serviceTitle = `${service.title} in Massachusetts | Akirapa Home Care`;
    const serviceDesc = service.shortDescription || `${service.title} provided by Akirapa Home Care across Burlington, Middlesex County, and Massachusetts. Call +1 781-226-9910.`;
    const serviceKeywords = `${service.title.toLowerCase()} Massachusetts, ${service.title.toLowerCase()} Burlington MA, senior home care Middlesex County, elder care Boston MA, home health aides Massachusetts`;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "provider": {
        "@type": "HomeHealthCareService",
        "name": "Akirapa Home Care",
        "telephone": "+1 781-226-9910",
        "url": "https://akirapahomecareus.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "281 Cambridge Street",
          "addressLocality": "Burlington",
          "addressRegion": "MA",
          "postalCode": "01803",
          "addressCountry": "US"
        }
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Massachusetts"
      },
      "description": serviceDesc
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://akirapahomecareus.com/" },
        { "@type": "ListItem", "position": 2, "name": "Care Services", "item": "https://akirapahomecareus.com/services" },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": serviceUrl }
      ]
    };

    const faqSchema = service.faqs && service.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    } : null;

    // Pre-rendered Semantic HTML for Service Detail Pages
    const serviceBodyHtml = `
      <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6;">
        <header style="background: linear-gradient(135deg, #561868 0%, #76248a 100%); color: white; padding: 48px 16px; text-align: center;">
          <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 16px; color: #e9d5ff;">
            <a href="/" style="color: #40ddd3; text-decoration: none;">Home</a> &gt; 
            <a href="/services" style="color: #40ddd3; text-decoration: none;">Services</a> &gt; 
            <span>${esc(service.title)}</span>
          </nav>
          <span style="display: inline-block; background: #40ddd3; color: #0f172a; font-weight: 800; font-size: 12px; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px;">
            ${esc(service.category)} • Massachusetts
          </span>
          <h1 style="font-size: 36px; font-weight: 900; color: white; margin: 0 0 12px;">
            ${esc(service.title)} in Massachusetts
          </h1>
          <p style="font-size: 18px; color: #e9d5ff; max-width: 700px; margin: 0 auto 20px;">
            ${esc(service.tagline)}
          </p>
          <div>
            <a href="tel:+17812269910" style="display: inline-block; background: #40ddd3; color: #0f172a; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 800; font-size: 16px;">
              Call +1 781-226-9910
            </a>
          </div>
        </header>

        <main style="max-width: 900px; margin: 0 auto; padding: 40px 16px;">
          <section style="margin-bottom: 36px;">
            <h2 style="font-size: 24px; font-weight: bold; color: #561868; margin-top: 0;">Overview</h2>
            <p style="font-size: 18px; color: #4b5563; line-height: 1.7;">
              ${esc(service.fullDefinition)}
            </p>
          </section>

          ${service.whoCanBenefit && service.whoCanBenefit.length > 0 ? `
            <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 36px;">
              <h2 style="font-size: 20px; font-weight: bold; color: #561868; margin-top: 0;">Who Can Benefit</h2>
              <ul style="padding-left: 20px; margin: 0; color: #374151;">
                ${service.whoCanBenefit.map(item => `<li style="margin-bottom: 8px;">${esc(item)}</li>`).join('')}
              </ul>
            </section>
          ` : ''}

          ${service.whatIsIncluded && service.whatIsIncluded.length > 0 ? `
            <section style="margin-bottom: 36px;">
              <h2 style="font-size: 22px; font-weight: bold; color: #561868;">What Is Included in ${esc(service.title)}</h2>
              <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; list-style: none; padding: 0;">
                ${service.whatIsIncluded.map(item => `
                  <li style="background: #fdf4ff; border: 1px solid #f5d0fe; padding: 12px 16px; border-radius: 8px; color: #701a75; font-size: 15px; font-weight: 500;">
                    ✓ ${esc(item)}
                  </li>
                `).join('')}
              </ul>
            </section>
          ` : ''}

          ${service.faqs && service.faqs.length > 0 ? `
            <section style="margin-bottom: 36px;">
              <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Frequently Asked Questions</h2>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${service.faqs.map(faq => `
                  <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 14px;">
                    <h3 style="font-size: 17px; font-weight: bold; color: #1f2937; margin: 0 0 6px;">${esc(faq.question)}</h3>
                    <p style="margin: 0; font-size: 15px; color: #4b5563;">${esc(faq.answer)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <section style="background: #561868; color: white; border-radius: 16px; padding: 32px; text-align: center; margin-top: 40px;">
            <h2 style="font-size: 24px; font-weight: bold; margin-top: 0;">Schedule a Free In-Home Care Consultation</h2>
            <p style="font-size: 16px; color: #e9d5ff; max-width: 600px; margin: 0 auto 20px;">
              Learn how our CNA-certified caregivers and AkiVault™ GPS verification provide unmatched peace of mind for families in Burlington and across Massachusetts.
            </p>
            <p style="margin: 0;">
              <a href="/contact" style="display: inline-block; background: #40ddd3; color: #0f172a; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 15px;">
                Request Consultation
              </a>
              <span style="margin-left: 16px; font-weight: bold; color: #ffffff;">or Call +1 781-226-9910</span>
            </p>
          </section>
        </main>
      </div>
    `;

    const schemas = [serviceSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);

    writePage(`services/${slug}`, {
      title: serviceTitle,
      description: serviceDesc,
      keywords: serviceKeywords,
      canonical: serviceUrl,
      jsonLdList: schemas,
      bodyHtml: serviceBodyHtml
    });
  }

  // ==========================================
  // 5. Generate Core Static Pages with Rich Semantic HTML
  // ==========================================
  console.log('⚡ Generating core pages with rich semantic pre-rendering...');
  const corePages = [
    {
      path: 'services',
      title: 'Senior In-Home Care Services in Massachusetts | Akirapa Home Care',
      description: 'Comprehensive in-home care services across Massachusetts: Hourly care, 24/7 daily & live-in care, hospital-to-home recovery, and specialized Alzheimer\'s support.',
      canonical: 'https://akirapahomecareus.com/services',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 1000px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">In-Home Care Services in Massachusetts</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 28px;">Explore 16 specialized in-home care programs delivered by 100% Certified Nursing Assistants (CNAs) with real-time AkiVault™ GPS transparency.</p>
          <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; list-style: none; padding: 0;">
            ${detailedServices.map(s => `
              <li style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #fafafa;">
                <h2 style="font-size: 18px; font-weight: bold; color: #561868; margin-top: 0;"><a href="/services/${s.slug}" style="color: #561868; text-decoration: none;">${esc(s.title)}</a></h2>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 12px;">${esc(s.shortDescription)}</p>
                <a href="/services/${s.slug}" style="color: #76248a; font-weight: bold; font-size: 14px; text-decoration: underline;">Learn More →</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `
    },
    {
      path: 'about',
      title: 'About Us | Premier Massachusetts Home Care — Akirapa Home Care',
      description: 'Learn about Akirapa Home Care Inc., headquartered at 281 Cambridge Street, Burlington, MA. Our mission, certified CNA care team, and GPS-verified standards.',
      canonical: 'https://akirapahomecareus.com/about',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">About Akirapa Home Care</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">Akirapa Home Care is ranked the #1 best home care company in Massachusetts, headquartered at 281 Cambridge Street, Burlington, MA 01803.</p>
          <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Our Leadership & Philosophy</h2>
          <p style="color: #374151;">Founded by Cathy Akirapa (Certified Nursing Assistant) and Stuart Ssemwogerere, Akirapa Home Care was created to eliminate restrictive contracts and bring clinical-grade transparency to private duty in-home care.</p>
          <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Why Families Choose Us</h2>
          <ul style="color: #374151; padding-left: 20px;">
            <li>Zero Long-Term Contracts: Total flexibility to pause or adjust services without penalties.</li>
            <li>100% Certified Nursing Assistants: Compassionate, highly trained staff.</li>
            <li>AkiVault™ Real-Time GPS EVV: Timestamped clock-ins and 8-point welfare check diagnostics.</li>
            <li>24/7 Local Support: Headquartered in Burlington, MA with responsive regional care pods.</li>
          </ul>
        </div>
      `
    },
    {
      path: 'contact',
      title: 'Contact Us | Free Care Assessment — Akirapa Home Care',
      description: 'Contact Akirapa Home Care for a free in-home assessment. Serving Burlington, Middlesex County, Greater Boston, and Massachusetts. Call +1 781-226-9910.',
      canonical: 'https://akirapahomecareus.com/contact',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Contact Akirapa Home Care</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">Schedule a complimentary, contract-free in-home care assessment anywhere in Massachusetts.</p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
            <h2 style="font-size: 20px; font-weight: bold; color: #561868; margin-top: 0;">Burlington Headquarters</h2>
            <p><strong>Address:</strong> 281 Cambridge Street, Burlington, MA 01803</p>
            <p><strong>24/7 Helpline:</strong> <a href="tel:+17812269910" style="color: #76248a; font-weight: bold;">+1 781-226-9910</a></p>
            <p><strong>Email:</strong> info@akirapahomecareus.com</p>
            <p><strong>Hours:</strong> Open 24 Hours, 7 Days a Week, 365 Days a Year</p>
          </div>
        </div>
      `
    },
    {
      path: 'careers',
      title: 'Caregiver Careers in Massachusetts | Join Akirapa Home Care',
      description: 'Apply for caregiver, CNA, and home health aide jobs at Akirapa Home Care in Massachusetts. Competitive pay, flexible shifts, and career advancement.',
      canonical: 'https://akirapahomecareus.com/careers',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Caregiver Careers & Nursing Jobs in Massachusetts</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">Join our elite caregiving team in Burlington and Middlesex County, MA. Competitive pay ($22-$52/hr), flexible shifts, and professional growth.</p>
          <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Current Open Positions</h2>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;">
            <li style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: #fafafa;">
              <h3 style="margin: 0 0 6px; font-size: 18px; color: #561868;">Caregiver Associate / CNA - Burlington, MA</h3>
              <p style="margin: 0 0 4px; color: #166534; font-weight: bold;">$24.00 - $30.00 per hour · Full Time</p>
              <p style="margin: 0; color: #4b5563; font-size: 14px;">Hands-on personal care, ADL assistance, medication reminders for seniors in private homes.</p>
            </li>
            <li style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: #fafafa;">
              <h3 style="margin: 0 0 6px; font-size: 18px; color: #561868;">Home Health Aide (HHA) - Woburn, MA</h3>
              <p style="margin: 0 0 4px; color: #166534; font-weight: bold;">$22.00 - $28.00 per hour · Part Time</p>
              <p style="margin: 0; color: #4b5563; font-size: 14px;">Assist seniors with personal hygiene, mobility transfers, meal prep, and light housekeeping.</p>
            </li>
            <li style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: #fafafa;">
              <h3 style="margin: 0 0 6px; font-size: 18px; color: #561868;">RN / LPN Field Nurse & Care Manager - Burlington, MA</h3>
              <p style="margin: 0 0 4px; color: #166534; font-weight: bold;">$42.00 - $52.00 per hour · Full Time</p>
              <p style="margin: 0; color: #4b5563; font-size: 14px;">Conduct in-home assessments, care plans, supervise CNA staff, and coordinate with families.</p>
            </li>
          </ul>
        </div>
      `
    },
    {
      path: 'blog',
      title: 'Senior Care Blog & Resources | Akirapa Home Care Massachusetts',
      description: 'Articles, family guides, and medical advice on senior wellness, dementia care, caregiver support, and Massachusetts elder care resources.',
      canonical: 'https://akirapahomecareus.com/blog',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Senior Care Blog & Family Resources</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 28px;">Expert guidance on elder care, dementia care, caregiver wellness, and Massachusetts healthcare resources.</p>
          <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; list-style: none; padding: 0;">
            ${blogPosts.map(p => `
              <li style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #fafafa;">
                <span style="font-size: 12px; color: #76248a; font-weight: bold; text-transform: uppercase;">${esc(p.category)}</span>
                <h2 style="font-size: 18px; font-weight: bold; color: #561868; margin: 6px 0;"><a href="/blog/${p.slug}" style="color: #561868; text-decoration: none;">${esc(p.title)}</a></h2>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 12px;">${esc(p.excerpt)}</p>
                <a href="/blog/${p.slug}" style="color: #76248a; font-weight: bold; font-size: 14px; text-decoration: underline;">Read Full Article →</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `
    },
    {
      path: 'akivault',
      title: 'AkiVault™ Real-Time GPS EVV Caregiver Verification | Akirapa Home Care',
      description: 'Discover AkiVault™, Akirapa Home Care\'s proprietary electronic visit verification technology providing real-time GPS clock-in transparency for families.',
      canonical: 'https://akirapahomecareus.com/akivault',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">AkiVault™ Technology Platform</h1>
          <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px;">The proprietary technology engine powering real-time Electronic Visit Verification (EVV), clinical welfare checks, and family transparency for Akirapa Home Care.</p>
          <h2 style="font-size: 22px; font-weight: bold; color: #561868;">Core Capabilities</h2>
          <ul style="color: #374151; padding-left: 20px;">
            <li><strong>GPS-Verified Geofenced Clock-Ins:</strong> Guarantees caregivers are physically present at the client's home upon arrival.</li>
            <li><strong>8-Point Shift Welfare Checks:</strong> Standardized end-of-shift diagnostics tracking appetite, mood, hydration, and vitals.</li>
            <li><strong>Instant Red-Flag Alerts:</strong> High-priority notifications dispatched to care coordinators when abnormal metrics occur.</li>
            <li><strong>Encrypted Family Portal:</strong> Real-time activity feeds and shift completion reports for adult children and loved ones.</li>
          </ul>
        </div>
      `
    },
    {
      path: 'privacy',
      title: 'Privacy Policy & HIPAA Notice of Privacy Practices | Akirapa Home Care',
      description: 'Official Privacy Policy and HIPAA Notice of Privacy Practices for Akirapa Home Care. Learn how we safeguard Protected Health Information (PHI), EVV data, and client confidentiality under Massachusetts and federal laws.',
      canonical: 'https://akirapahomecareus.com/privacy',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Privacy Policy & HIPAA Notice of Privacy Practices</h1>
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">Akirapa Home Care Inc. complies with the Health Insurance Portability and Accountability Act (HIPAA) and Massachusetts 201 CMR 17.00 data privacy regulations.</p>
          <h2 style="font-size: 20px; font-weight: bold; color: #561868;">Protection of Health Information</h2>
          <p style="color: #374151;">All Protected Health Information (PHI), caregiver shift notes, electronic visit verification records, and client records are encrypted end-to-end and stored securely in compliance with federal and Massachusetts statutes.</p>
        </div>
      `
    },
    {
      path: 'terms',
      title: 'Terms of Service & Care Agreements | Akirapa Home Care Massachusetts',
      description: 'Official Terms of Service and Client Agreement Conditions for Akirapa Home Care. Review our service scope, medical disclaimer, caregiver employment protections, and Massachusetts governing law.',
      canonical: 'https://akirapahomecareus.com/terms',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Terms of Service & Client Agreement</h1>
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">Governing terms and conditions for private-duty in-home senior care provided by Akirapa Home Care Inc. in Massachusetts.</p>
          <h2 style="font-size: 20px; font-weight: bold; color: #561868;">Contract-Free Policy</h2>
          <p style="color: #374151;">Akirapa Home Care operates with zero long-term binding lock-ins. Clients may adjust, increase, or pause services with reasonable advance notice, with no hidden cancellation fees.</p>
        </div>
      `
    },
    {
      path: 'consumer-rights',
      title: 'Massachusetts Home Care Client Bill of Rights & Consumer Protections | Akirapa',
      description: 'Review the Akirapa Home Care Client Bill of Rights and Massachusetts Executive Office of Elder Affairs (EOEA) consumer protections, grievance procedures, and non-discrimination notice.',
      canonical: 'https://akirapahomecareus.com/consumer-rights',
      bodyHtml: `
        <div style="font-family: system-ui, sans-serif; color: #1f2937; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 36px; font-weight: 900; color: #561868; margin-bottom: 12px;">Massachusetts Client Bill of Rights & Consumer Protections</h1>
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">Akirapa Home Care upholds the highest standards of dignity, autonomy, and consumer rights under Massachusetts Executive Office of Elder Affairs (EOEA) regulations.</p>
          <h2 style="font-size: 20px; font-weight: bold; color: #561868;">Your Fundamental Rights as a Client</h2>
          <ul style="color: #374151; padding-left: 20px;">
            <li>The right to be treated with consideration, respect, and full recognition of personal dignity and individuality.</li>
            <li>The right to receive appropriate, high-quality care that honors your individualized care plan.</li>
            <li>The right to be informed in advance about the care to be provided and any changes in care.</li>
            <li>The right to participate in the planning of your care and treatment.</li>
            <li>The right to total confidentiality and privacy regarding your health and personal affairs.</li>
          </ul>
        </div>
      `
    }
  ];

  for (const page of corePages) {
    writePage(page.path, {
      title: page.title,
      description: page.description,
      canonical: page.canonical,
      bodyHtml: page.bodyHtml
    });
  }

  // ==========================================
  // 6. Generate Complete, Valid XML Sitemap
  // ==========================================
  console.log('⚡ Generating comprehensive sitemap.xml with image tags...');
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Primary Pages -->
  <url>
    <loc>https://akirapahomecareus.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://akirapahomecareus.com/akirapa-og-image.jpg</image:loc>
      <image:title>Akirapa Home Care Massachusetts</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/careers</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/akivault</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/ma-home-care-directory</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>

  <!-- Legal & Compliance Pages -->
  <url>
    <loc>https://akirapahomecareus.com/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://akirapahomecareus.com/consumer-rights</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- 16 Massachusetts Specialized Care Services -->
`;

  for (const s of detailedServices) {
    sitemapXml += `  <url>
    <loc>https://akirapahomecareus.com/services/${s.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  }

  sitemapXml += `\n  <!-- Blog Articles -->\n`;
  for (const p of blogPosts) {
    sitemapXml += `  <url>
    <loc>https://akirapahomecareus.com/blog/${p.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }

  sitemapXml += `\n  <!-- 500 Massachusetts Competitor Directory Profile Pages -->\n`;
  for (const c of maCompetitors) {
    sitemapXml += `  <url>
    <loc>https://akirapahomecareus.com/ma-home-care-directory/${c.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  sitemapXml += `</urlset>\n`;

  // Write sitemap to both public/ and dist/
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✅ Generated sitemap.xml in public/ and dist/ successfully!');

  // Copy llms.txt and llms-full.txt to dist/ if not already copied
  const llmsSrc = path.join(publicDir, 'llms.txt');
  const llmsFullSrc = path.join(publicDir, 'llms-full.txt');
  if (fs.existsSync(llmsSrc)) {
    fs.copyFileSync(llmsSrc, path.join(distDir, 'llms.txt'));
  }
  if (fs.existsSync(llmsFullSrc)) {
    fs.copyFileSync(llmsFullSrc, path.join(distDir, 'llms-full.txt'));
  }
  const manifestSrc = path.join(publicDir, 'site.webmanifest');
  if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, path.join(distDir, 'site.webmanifest'));
  }

  console.log(`✅ Pre-rendered ${pageCount} static HTML pages successfully into dist/!`);
}

run().catch(err => {
  console.error('❌ Static pre-render failed:', err);
  process.exit(1);
});
