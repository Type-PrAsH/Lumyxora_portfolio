document.addEventListener('DOMContentLoaded', () => {
    // Accordion logic
    document.querySelectorAll('.accordion-toggle').forEach(acc => {
        acc.addEventListener('click', () => {
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('.accordion-icon');
            const isOpen = content.classList.contains('grid-rows-[1fr]');
            document.querySelectorAll('.accordion-content').forEach(c => { c.classList.remove('grid-rows-[1fr]'); c.classList.add('grid-rows-[0fr]'); });
            document.querySelectorAll('.accordion-icon').forEach(i => { i.style.transform = 'rotate(0deg)'; });
            if (!isOpen) { content.classList.remove('grid-rows-[0fr]'); content.classList.add('grid-rows-[1fr]'); icon.style.transform = 'rotate(45deg)'; }
        });
    });

    // Sub-service detail overlay
    const overlay = document.getElementById('service-detail-overlay');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailProjects = document.getElementById('detail-projects');
    const projectData = {
        'Reels / Shorts': [
            { name: 'FitVibe Launch Campaign', desc: 'A high-energy reel series for a fitness brand launch, achieving 2M+ views across platforms.', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop' },
            { name: 'CaféMood Series', desc: 'Aesthetic café montages with trending audio sync for a boutique coffee chain.', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop' }
        ],
        'YouTube Videos': [
            { name: 'TechTalk Podcast Edit', desc: 'Full post-production for a 40-episode tech podcast series including intros, lower thirds, and animations.', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
            { name: 'Travel Vlog Compilation', desc: 'Cinematic travel vlog edits with color grading and sound design for a travel creator.', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop' }
        ],
        'Cinematic Edits': [
            { name: 'Aurora Brand Film', desc: 'A 3-minute cinematic brand film for a luxury skincare line with narrative storytelling.', img: 'https://images.unsplash.com/photo-1485848395967-65dff62dc35b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Heritage Documentary', desc: 'Short documentary on traditional artisan craftsmanship with interview-driven narrative.', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop' }
        ],
        'Brand Identity': [
            { name: 'Velvet & Co. Rebrand', desc: 'Complete brand identity system including logo, guidelines, stationery, and social templates.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop' },
            { name: 'NovaBrand Studios Logo', desc: 'Minimalist wordmark and icon system for a digital marketing agency.', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop' }
        ],
        'Poster Design': [
            { name: 'Echoes Music Festival', desc: 'Series of typographic event posters for a 3-day indie music festival.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop' },
            { name: 'Art Gallery Exhibition', desc: 'Minimalist exhibition posters with bold typography and muted color palettes.', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop' }
        ],
        'Web UI Design': [
            { name: 'Lumière Fashion Store', desc: 'E-commerce UI concept for a high-end fashion retailer with immersive product pages.', img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop' },
            { name: 'Finova Dashboard', desc: 'SaaS dashboard design with data visualization and clean navigation patterns.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' }
        ],
        'Editorial Layouts': [
            { name: 'Forma Quarterly', desc: 'Layout design for a quarterly design culture magazine with feature-length articles.', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop' },
            { name: 'Wellness Journal', desc: 'Clean editorial spreads for a wellness and lifestyle publication.', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop' }
        ],
        'Print Magazines': [
            { name: 'Arch Digest Feature', desc: 'High-res print layout for an architecture magazine with large-format imagery.', img: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?q=80&w=800&auto=format&fit=crop' },
            { name: 'Streetwear Lookbook', desc: 'Bold, urban print magazine for a streetwear brand with full-bleed photography.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop' }
        ],
        'Digital Publications': [
            { name: 'GreenTech Report', desc: 'Interactive digital annual report for a sustainability-focused tech company.', img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop' },
            { name: 'Culinary E-zine', desc: 'Scrollable digital magazine for a food media brand with embedded video.', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop' }
        ],
        'Pitch Decks': [
            { name: 'PixelForge Seed Deck', desc: 'A 15-slide pitch deck that helped close a seed round — clean visuals with compelling data layout.', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop' },
            { name: 'EduVerse Investor Deck', desc: 'Narrative-driven pitch deck for an EdTech startup with infographic-heavy slides.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' }
        ],
        'Business Decks': [
            { name: 'Q4 Strategy Presentation', desc: 'Corporate strategy deck for a mid-sized consulting firm with data dashboards.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
            { name: 'Annual Review Deck', desc: 'Year-in-review presentation for internal stakeholders with animated charts.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' }
        ],
        'Keynotes': [
            { name: 'Design Summit 2025', desc: 'Keynote presentation for a 500+ attendee design conference with cinematic visuals.', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop' },
            { name: 'TEDx Speaker Deck', desc: 'Minimalist, high-impact keynote supporting a TEDx talk on creative entrepreneurship.', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop' }
        ],
        'Portfolio Sites': [
            { name: 'Aria Design Portfolio', desc: 'A bespoke portfolio for an interior designer with full-bleed imagery and smooth page transitions.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
            { name: 'Photographer Showcase', desc: 'Grid-based photography portfolio with lightbox galleries and lazy-loaded high-res images.', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop' }
        ],
        'Landing Pages': [
            { name: 'SaaS Product Launch', desc: 'Conversion-optimized landing page for a productivity app with A/B tested hero sections.', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop' },
            { name: 'Event Registration Page', desc: 'Single-page event registration with countdown timer and speaker highlights.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop' }
        ],
        'Business Websites': [
            { name: 'Zenith Consulting', desc: 'Multi-page corporate website with service pages, team bios, and integrated blog.', img: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=800&auto=format&fit=crop' },
            { name: 'Artisan Bakery Site', desc: 'Warm, inviting business website for a local bakery with online ordering integration.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop' }
        ]
    };

    function openDetail(title, desc) {
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        const projects = projectData[title] || [];
        detailProjects.innerHTML = projects.map(p => `
            <div class="group/proj">
                <div class="aspect-video rounded-xl overflow-hidden mb-6 shadow-long-soft">
                    <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover/proj:scale-105 transition-transform duration-700">
                </div>
                <h4 class="font-headline text-xl font-bold text-on-surface mb-2">${p.name}</h4>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed">${p.desc}</p>
            </div>
        `).join('');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden';
    }

    // Attach click handlers to all sub-service cards
    document.querySelectorAll('.sub-service-card, #services-accordion .space-y-4.cursor-pointer').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4')?.textContent?.trim();
            const desc = card.dataset.desc || card.querySelector('p')?.textContent?.trim() || '';
            if (title) openDetail(title, desc);
        });
    });

    document.getElementById('detail-close').addEventListener('click', () => {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.classList.add('opacity-0', 'pointer-events-none'); document.body.style.overflow = ''; } });
});
