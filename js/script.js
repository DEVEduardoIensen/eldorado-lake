document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Fetch Dynamic Prices from Google Sheets (CSV)
    // Insira o link CSV publicado do seu Google Sheets aqui:
    const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsiDBa4mhgLZBQvxas6WmeD4f3Kh4QNd3IYciILeZP5wET9gGahlehf_VL4abL_lqL9W_LScUWa1F4/pub?output=csv"; 
    
    if (GOOGLE_SHEETS_CSV_URL !== "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsiDBa4mhgLZBQvxas6WmeD4f3Kh4QNd3IYciILeZP5wET9gGahlehf_VL4abL_lqL9W_LScUWa1F4/pub?output=csv") {
        fetch(GOOGLE_SHEETS_CSV_URL)
            .then(response => response.text())
            .then(csvText => {
                // Parse simple CSV (Format expected: Premium,900 \n Standard,730)
                const lines = csvText.split('\n');
                lines.forEach(line => {
                    const [packageType, price] = line.split(',');
                    if (!packageType || !price) return;
                    
                    const cleanType = packageType.trim().toLowerCase();
                    const cleanPrice = price.trim();
                    
                    if (cleanType.includes('premium')) {
                        const premiumEl = document.getElementById('price-premium');
                        if (premiumEl) premiumEl.innerText = cleanPrice;
                    } else if (cleanType.includes('standard')) {
                        const standardEl = document.getElementById('price-standard');
                        if (standardEl) standardEl.innerText = cleanPrice;
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar preços do Google Sheets:', error));
    }
    // 1. Dynamic Header Scroll Effect
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.remove('header-transparent');
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('header-transparent');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbarLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // 3. Lightbox / Modal for Images & Videos
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideoContainer = document.getElementById('lightbox-video-container');
    const lightboxIframe = document.getElementById('lightbox-iframe');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.getElementById('lightbox-close-btn');

    // Open lightbox for carousel and gallery slides (enlarge images)
    document.querySelectorAll('.carousel-slide, .gallery-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            const img = slide.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            lightboxImg.style.display = 'block';
            lightboxVideoContainer.style.display = 'none';
            lightbox.style.display = 'flex';
        });
    });

    // Package Details Modal Content Database
    const packageDetails = {
        premium: {
            tag: "Operação Premium (Trios)",
            title: "Pacote Eldorado Premium",
            body: `
                <div class="modal-info-grid">
                    <div class="modal-info-item">
                        <i class="fa-solid fa-tags"></i>
                        <div>
                            <h4>Valor da Diária</h4>
                            <p class="text-gold" style="font-size: 1.5rem; font-weight: 700; margin: 5px 0 0 0;">R$ 900,00 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ Trio</span></p>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">Valor total diário para o grupo de 3 pescadores (tanque cheio incluso).</p>
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-ship"></i>
                        <div>
                            <h4>Pescaria com Guia Profissional</h4>
                            <p>Operação liderada pelo guia especializado <strong>Thiago Witeck</strong>, com mais de 5 anos de experiência e conhecimento profundo dos melhores pontos de pesca do Lago Foz do Areia.</p>
                            
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-house-chimney"></i>
                        <div>
                            <h4>Hospedagem de Aconchegante</h4>
                            <p>Estadia no Rancho Eldorado, localizado estrategicamente de frente para o lago.</p>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">internet Starlink, chuveiro quente e ótima e cozinha local .</p>
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-circle-check"></i>
                        <div>
                            <h4>Regras da Operação</h4>
                            <p>Pesca 100% esportiva (pesque e solte do Dourado) para garantir a preservação das espécies e a sustentabilidade do lago.</p>
                        </div>
                    </div>
                </div>
            `
        },
        standard: {
            tag: "Operação Standard (Duplas ou Trios)",
            title: "Pacote Eldorado Standard",
            body: `
                <div class="modal-info-grid">
                    <div class="modal-info-item">
                        <i class="fa-solid fa-tags"></i>
                        <div>
                            <h4>Valor da Diária</h4>
                            <p class="text-gold" style="font-size: 1.5rem; font-weight: 700; margin: 5px 0 0 0;">R$ 730,00 <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">/ Dupla</span></p>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">Valor total diário para a dupla de pescadores (tanque cheio incluso).</p>
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-ship"></i>
                        <div>
                            <h4>Guias e Embarcações</h4>
                            <p>Pescaria esportiva no Lago Foz do Areia com equipe profissional de guia de pesca especializado, focando no Dourado e na Piapara.</p>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Inclui barco completo com motor elétrico e combustível da diária.</p>
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-house-chimney"></i>
                        <div>
                            <h4>Hospedagem & Rancho</h4>
                            <p>Hospedagem aconchegante no Rancho Eldorado, garantindo excelente custo-benefício.</p>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Acomodações limpas e equipadas com chuveiro quente e internet Starlink de alta velocidade para os pescadores.</p>
                        </div>
                    </div>
                    <div class="modal-info-item">
                        <i class="fa-solid fa-circle-check"></i>
                        <div>
                            <h4>Preservação Ambiental</h4>
                            <p>Prática ativa do pesque e solte. Todo peixe capturado é medido, fotografado e devolvido à água com segurança.</p>
                        </div>
                    </div>
                </div>
            `
        }
    };

    const detailsModal = document.getElementById('details-modal');
    const detailsModalTag = document.getElementById('details-modal-tag');
    const detailsModalTitle = document.getElementById('details-modal-title');
    const detailsModalBody = document.getElementById('details-modal-body');
    const detailsCloseBtn = document.getElementById('details-close-btn');

    // Open Details Modal function
    const openDetailsModal = (packageKey) => {
        const details = packageDetails[packageKey];
        if (details) {
            detailsModalTag.textContent = details.tag;
            detailsModalTitle.textContent = details.title;
            detailsModalBody.innerHTML = details.body;
            detailsModal.style.display = 'flex';
        }
    };

    // Add listeners to package buttons & flyer images
    document.querySelectorAll('.btn-open-flyer, .package-card-3d').forEach(element => {
        element.addEventListener('click', () => {
            const packageKey = element.getAttribute('data-package');
            if (packageKey) {
                openDetailsModal(packageKey);
            }
        });
    });

    // Close Details Modal function
    const closeDetailsModal = () => {
        if (detailsModal) {
            detailsModal.style.display = 'none';
        }
        if (detailsModalTag) detailsModalTag.textContent = '';
        if (detailsModalTitle) detailsModalTitle.textContent = '';
        if (detailsModalBody) detailsModalBody.innerHTML = '';
    };

    if (detailsCloseBtn) {
        detailsCloseBtn.addEventListener('click', closeDetailsModal);
    }

    // Close on outside click
    if (detailsModal) {
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) {
                closeDetailsModal();
            }
        });
    }

    // Close on Escape key (lightbox keydown listener will also handle it)

    // Open lightbox for videos
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video-src');
            
            // Check if it's a local video file (e.g. mp4)
            const isLocalVideo = videoSrc && (videoSrc.endsWith('.mp4') || !videoSrc.includes('//') || videoSrc.startsWith('assets/'));
            
            if (isLocalVideo) {
                // Configure HTML5 video player
                lightboxIframe.style.display = 'none';
                lightboxIframe.src = '';
                
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = videoSrc;
                
                // Automatically handle aspect ratio when video metadata loads
                const handleMetadata = () => {
                    if (lightboxVideo.videoHeight > lightboxVideo.videoWidth) {
                        lightboxVideoContainer.classList.add('portrait-video');
                    } else {
                        lightboxVideoContainer.classList.remove('portrait-video');
                    }
                    lightboxVideo.removeEventListener('loadedmetadata', handleMetadata);
                };
                lightboxVideo.addEventListener('loadedmetadata', handleMetadata);
                
                // Play local video
                lightboxVideo.play().catch(err => console.log("Video auto-play prevented:", err));
            } else {
                // Configure iframe for YouTube / Instagram
                lightboxVideo.style.display = 'none';
                lightboxVideo.pause();
                lightboxVideo.src = '';
                
                lightboxIframe.style.display = 'block';
                lightboxIframe.src = videoSrc;
                
                if (videoSrc && videoSrc.includes('instagram.com')) {
                    lightboxVideoContainer.classList.add('portrait-video');
                } else {
                    lightboxVideoContainer.classList.remove('portrait-video');
                }
            }
            
            lightboxImg.style.display = 'none';
            lightboxVideoContainer.style.display = 'block';
            lightbox.style.display = 'flex';
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxIframe.src = '';
        lightboxIframe.style.display = 'none';
        
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxVideo.style.display = 'none';
        
        lightboxVideoContainer.classList.remove('portrait-video');
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside content area
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.style.display === 'flex') {
                closeLightbox();
            }
            if (detailsModal && detailsModal.style.display === 'flex') {
                closeDetailsModal();
            }
        }
    });

    // 4. Rancho Carousel Auto-play & Controls
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));
    
    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 4000; // 4 seconds
    
    const updateCarousel = (index) => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        
        // Move the carousel track
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Update active slide class
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };
    
    const nextSlide = () => {
        updateCarousel(currentIndex + 1);
    };
    
    const prevSlide = () => {
        updateCarousel(currentIndex - 1);
    };
    
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    };
    
    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent opening lightbox when clicking button
            nextSlide();
            startAutoPlay(); // reset autoplay timer
        });
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent opening lightbox when clicking button
            prevSlide();
            startAutoPlay(); // reset autoplay timer
        });
    }
    
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent opening lightbox when clicking dot
            updateCarousel(i);
            startAutoPlay(); // reset autoplay timer
        });
    });
    
    const carouselContainer = document.getElementById('rancho-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start auto-play initially if carousel exists
    if (slides.length > 0) {
        startAutoPlay();
    }

    // 4. Contact Form Validation & Redirection
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            if (!name || !phone || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.style.display = 'block';
                formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                return;
            }

            // Simulação de sucesso
            formFeedback.className = 'form-feedback success';
            formFeedback.style.display = 'block';
            formFeedback.textContent = 'Mensagem validada! Redirecionando para o WhatsApp...';

            // WhatsApp redirect details
            // Thiago's actual contact number
            const targetNumber = "554299162340"; 
            const formattedMessage = `Olá, meu nome é *${name}* (${phone}).\n\n*Mensagem*:\n${message}`;
            const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(formattedMessage)}`;

            // Redirect after a brief delay so they see the success message
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                formFeedback.style.display = 'none';
                formFeedback.className = 'form-feedback';
            }, 1500);
        });
    }

    // 5. Gallery Carousel Behavior (Multi-item sliding marquee)
    const galleryTrack = document.querySelector('.gallery-track');
    const gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));
    const galleryPrevBtn = document.getElementById('gallery-prev');
    const galleryNextBtn = document.getElementById('gallery-next');
    
    if (galleryTrack && gallerySlides.length > 0) {
        let galleryIndex = 0;
        let galleryAutoPlayInterval;
        
        // Helper to check how many items are visible in viewport
        const getVisibleItemsCount = () => {
            const width = window.innerWidth;
            if (width > 992) return 3;
            if (width > 576) return 2;
            return 1;
        };
        
        const updateGallery = (index) => {
            const visibleItems = getVisibleItemsCount();
            const maxIndex = gallerySlides.length - visibleItems;
            
            if (index < 0) {
                index = maxIndex;
            } else if (index > maxIndex) {
                index = 0;
            }
            
            galleryIndex = index;
            
            // Calculate translate percentage
            const slideWidth = gallerySlides[0].getBoundingClientRect().width;
            const gap = 20; // Matches CSS gap
            const amountToMove = galleryIndex * (slideWidth + gap);
            
            galleryTrack.style.transform = `translateX(-${amountToMove}px)`;
        };
        
        const nextGallerySlide = () => {
            updateGallery(galleryIndex + 1);
        };
        
        const prevGallerySlide = () => {
            updateGallery(galleryIndex - 1);
        };
        
        const startGalleryAutoPlay = () => {
            stopGalleryAutoPlay();
            galleryAutoPlayInterval = setInterval(nextGallerySlide, 4000);
        };
        
        const stopGalleryAutoPlay = () => {
            if (galleryAutoPlayInterval) {
                clearInterval(galleryAutoPlayInterval);
            }
        };
        
        if (galleryNextBtn && galleryPrevBtn) {
            galleryNextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextGallerySlide();
                startGalleryAutoPlay();
            });
            
            galleryPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevGallerySlide();
                startGalleryAutoPlay();
            });
        }
        
        // Pause auto-play on hover
        const galleryCarouselContainer = document.getElementById('gallery-carousel');
        if (galleryCarouselContainer) {
            galleryCarouselContainer.addEventListener('mouseenter', stopGalleryAutoPlay);
            galleryCarouselContainer.addEventListener('mouseleave', startGalleryAutoPlay);
        }
        
        // Handle window resize to recalculate positions correctly
        window.addEventListener('resize', () => {
            updateGallery(galleryIndex);
        });
        
        // Initial setup
        startGalleryAutoPlay();
        updateGallery(0);
    }
});
