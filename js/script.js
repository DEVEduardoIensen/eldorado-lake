document.addEventListener('DOMContentLoaded', () => {

    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const throttle = (func, limit = 50) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    let packageData = null;
    let ranchoMoved = false;
    let galleryMoved = false;

    const init = () => {
        initSheets();
        initNavigation();
        initScrollEffects();
        initModals();
        initCarousels();
        initGSAPAnimations();
    };

    const initSheets = () => {
        const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsiDBa4mhgLZBQvxas6WmeD4f3Kh4QNd3IYciILeZP5wET9gGahlehf_VL4abL_lqL9W_LScUWa1F4/pub?output=csv";

        if (GOOGLE_SHEETS_CSV_URL && GOOGLE_SHEETS_CSV_URL.startsWith("http")) {
            if (typeof Papa !== 'undefined') {
                Papa.parse(GOOGLE_SHEETS_CSV_URL, {
                    download: true,
                    header: false,
                    skipEmptyLines: true,
                    complete: function(results) {
                        try {
                            const premiumEl = document.getElementById('price-premium');
                            const standardEl = document.getElementById('price-standard');

                            results.data.forEach(row => {
                                if (row.length < 2) return;
                                const packageType = row[0].trim().toLowerCase();
                                const price = row[1].trim();

                                if (packageType.includes('premium') && premiumEl) {
                                    premiumEl.innerText = price;
                                } else if (packageType.includes('standard') && standardEl) {
                                    standardEl.innerText = price;
                                }
                            });
                        } catch (err) {
                            console.error('Erro ao popular preços:', err);
                        }
                    },
                    error: function(error) {
                        console.error('Erro ao buscar preços via Papa Parse:', error);
                    }
                });
            } else {
                console.error('Papa Parse não carregado.');
            }
        }
    };

    const initNavigation = () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navbarLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-link');

        if (mobileMenuBtn && navbarLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navbarLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('open');
            });

            navItems.forEach(link => {
                link.addEventListener('click', () => {
                    navbarLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('open');
                });
            });
        }
    };

    const initScrollEffects = () => {
        const header = document.getElementById('main-header');
        const sections = Array.from(document.querySelectorAll('section'));
        const navItems = Array.from(document.querySelectorAll('.nav-link'));

        const handleScroll = throttle(() => {
            const scrollY = window.scrollY;

            if (header) {
                if (scrollY > 50) {
                    header.classList.remove('header-transparent');
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                    header.classList.add('header-transparent');
                }
            }

            let currentSection = '';
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (scrollY >= (section.offsetTop - 150)) {
                    currentSection = section.getAttribute('id');
                    break;
                }
            }

            if (currentSection) {
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${currentSection}`) {
                        if (!item.classList.contains('active')) item.classList.add('active');
                    } else {
                        if (item.classList.contains('active')) item.classList.remove('active');
                    }
                });
            }
        }, 50);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    };

    const initModals = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideoContainer = document.getElementById('lightbox-video-container');
        const lightboxIframe = document.getElementById('lightbox-iframe');
        const lightboxVideo = document.getElementById('lightbox-video');
        const closeBtn = document.getElementById('lightbox-close-btn');
        const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
        const lightboxNextBtn = document.getElementById('lightbox-next-btn');
        const lightboxBottomBar = document.getElementById('lightbox-bottom-bar');
        const lightboxBarPrev = document.getElementById('lightbox-bar-prev');
        const lightboxBarNext = document.getElementById('lightbox-bar-next');
        const lightboxCounter = document.getElementById('lightbox-counter');

        let currentLightboxItems = [];
        let currentLightboxIndex = 0;
        let isLightboxCarouselActive = false;

        const detailsModal = document.getElementById('details-modal');
        const detailsModalTag = document.getElementById('details-modal-tag');
        const detailsModalTitle = document.getElementById('details-modal-title');
        const detailsModalBody = document.getElementById('details-modal-body');
        const detailsCloseBtn = document.getElementById('details-close-btn');

        fetch('data/packages.json')
            .then(res => {
                if (!res.ok) throw new Error("HTTP error " + res.status);
                return res.json();
            })
            .then(data => {
                packageData = data;
            })
            .catch(err => console.error("Erro ao carregar dados dos pacotes:", err));

        const openDetailsModal = (packageKey) => {
            if (!detailsModal || !packageData) return;
            const details = packageData[packageKey];
            if (details) {
                if (detailsModalTag) detailsModalTag.textContent = details.tag;
                if (detailsModalTitle) detailsModalTitle.textContent = details.title;
                if (detailsModalBody) detailsModalBody.innerHTML = details.body;
                detailsModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        };

        const closeDetailsModal = () => {
            if (detailsModal) detailsModal.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };

        document.querySelectorAll('.btn-open-flyer, .package-card-3d').forEach(element => {
            element.addEventListener('click', (e) => {
                const packageKey = element.getAttribute('data-package');
                if (packageKey) {
                    openDetailsModal(packageKey);
                }
            });
        });

        if (detailsCloseBtn) {
            detailsCloseBtn.addEventListener('click', closeDetailsModal);
            detailsCloseBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') closeDetailsModal();
            });
        }
        if (detailsModal) detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) closeDetailsModal();
        });

        const updateLightboxDisplay = (index) => {
            if (!currentLightboxItems.length) return;
            if (index < 0) index = currentLightboxItems.length - 1;
            if (index >= currentLightboxItems.length) index = 0;

            currentLightboxIndex = index;
            const currentItem = currentLightboxItems[currentLightboxIndex];

            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length}`;
            }

            // Preload next and prev for instant sliding
            const nextIdx = (currentLightboxIndex + 1) % currentLightboxItems.length;
            const prevIdx = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
            if (currentLightboxItems[nextIdx] && currentLightboxItems[nextIdx].src) {
                const pNext = new Image();
                pNext.src = currentLightboxItems[nextIdx].src;
            }
            if (currentLightboxItems[prevIdx] && currentLightboxItems[prevIdx].src) {
                const pPrev = new Image();
                pPrev.src = currentLightboxItems[prevIdx].src;
            }

            lightboxImg.src = currentItem.src;
            lightboxImg.alt = currentItem.alt || 'Foto Ampliada Eldorado Lake';
            lightboxImg.style.opacity = '1';
        };

        const openLightboxGallery = (items, startIndex) => {
            if (!lightbox || !lightboxImg || !lightboxVideoContainer) return;
            currentLightboxItems = items;
            currentLightboxIndex = startIndex;
            isLightboxCarouselActive = items.length > 1;

            lightboxImg.style.display = 'block';
            lightboxVideoContainer.style.display = 'none';

            if (isLightboxCarouselActive) {
                if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'flex';
                if (lightboxNextBtn) lightboxNextBtn.style.display = 'flex';
                if (lightboxBottomBar) lightboxBottomBar.style.display = 'flex';
            } else {
                if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
                if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
                if (lightboxBottomBar) lightboxBottomBar.style.display = 'none';
            }

            updateLightboxDisplay(currentLightboxIndex);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };

        // Rancho slide click handlers
        const ranchoSlides = Array.from(document.querySelectorAll('.carousel-slide'));
        ranchoSlides.forEach((slide, idx) => {
            slide.addEventListener('click', (e) => {
                if (ranchoMoved) {
                    ranchoMoved = false;
                    return;
                }
                const items = ranchoSlides.map((s, i) => {
                    const img = s.querySelector('img');
                    return {
                        src: s.getAttribute('data-full') || (img ? (img.getAttribute('data-src') || img.src) : ''),
                        alt: img ? img.alt : `Estrutura do Rancho ${i + 1}`
                    };
                });
                openLightboxGallery(items, idx);
            });
            slide.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') slide.click();
            });
            slide.setAttribute('tabindex', '0');
        });

        // Galeria slide click handlers
        const galeriaSlides = Array.from(document.querySelectorAll('.gallery-slide'));
        galeriaSlides.forEach((slide, idx) => {
            slide.addEventListener('click', (e) => {
                if (galleryMoved) {
                    galleryMoved = false;
                    return;
                }
                const items = galeriaSlides.map((s, i) => {
                    const img = s.querySelector('img');
                    return {
                        src: s.getAttribute('data-full') || (img ? (img.getAttribute('data-src') || img.src) : ''),
                        alt: img ? img.alt : `Galeria Eldorado Lake ${i + 1}`
                    };
                });
                openLightboxGallery(items, idx);
            });
            slide.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') slide.click();
            });
            slide.setAttribute('tabindex', '0');
        });

        const handlePrevImage = (e) => {
            if (e) {
                e.stopPropagation();
                if (e.cancelable) e.preventDefault();
            }
            updateLightboxDisplay(currentLightboxIndex - 1);
        };

        const handleNextImage = (e) => {
            if (e) {
                e.stopPropagation();
                if (e.cancelable) e.preventDefault();
            }
            updateLightboxDisplay(currentLightboxIndex + 1);
        };

        if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', handlePrevImage);
        if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', handleNextImage);
        if (lightboxBarPrev) {
            lightboxBarPrev.addEventListener('click', handlePrevImage);
            lightboxBarPrev.addEventListener('touchend', (e) => e.stopPropagation(), { passive: true });
        }
        if (lightboxBarNext) {
            lightboxBarNext.addEventListener('click', handleNextImage);
            lightboxBarNext.addEventListener('touchend', (e) => e.stopPropagation(), { passive: true });
        }

        if (lightboxBottomBar) {
            lightboxBottomBar.addEventListener('click', (e) => e.stopPropagation());
            lightboxBottomBar.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
            lightboxBottomBar.addEventListener('touchend', (e) => e.stopPropagation(), { passive: true });
        }

        if (lightboxImg) {
            lightboxImg.addEventListener('click', (e) => e.stopPropagation());
        }
        if (lightboxVideoContainer) {
            lightboxVideoContainer.addEventListener('click', (e) => e.stopPropagation());
        }

        // Touch swipe gestures for mobile Lightbox
        let lbTouchStartX = 0;
        let lbTouchStartY = 0;
        let lbTouchStartTime = 0;
        if (lightbox) {
            lightbox.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    lbTouchStartX = e.touches[0].clientX;
                    lbTouchStartY = e.touches[0].clientY;
                    lbTouchStartTime = Date.now();
                }
            }, { passive: true });

            lightbox.addEventListener('touchend', (e) => {
                if (!isLightboxCarouselActive) return;
                if (e.target.closest('#lightbox-bottom-bar') || e.target.closest('.lightbox-close') || e.target.closest('.lightbox-nav-btn')) return;

                if (e.changedTouches.length === 1) {
                    const deltaX = lbTouchStartX - e.changedTouches[0].clientX;
                    const deltaY = lbTouchStartY - e.changedTouches[0].clientY;
                    const elapsed = Date.now() - lbTouchStartTime;

                    // Horizontal swipe: change photo
                    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) && elapsed < 600) {
                        if (deltaX > 0) {
                            updateLightboxDisplay(currentLightboxIndex + 1);
                        } else {
                            updateLightboxDisplay(currentLightboxIndex - 1);
                        }
                    }
                    // Vertical swipe down: dismiss
                    else if (deltaY < -70 && Math.abs(deltaY) > Math.abs(deltaX) && elapsed < 500) {
                        closeLightbox();
                    }
                }
            }, { passive: true });
        }

        // Global keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (isLightboxCarouselActive && (e.key === 'ArrowLeft' || e.key === 'Left')) {
                    updateLightboxDisplay(currentLightboxIndex - 1);
                } else if (isLightboxCarouselActive && (e.key === 'ArrowRight' || e.key === 'Right')) {
                    updateLightboxDisplay(currentLightboxIndex + 1);
                }
            }
        });

        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                if (!lightbox || !lightboxIframe || !lightboxVideo || !lightboxVideoContainer) return;
                const videoSrc = card.getAttribute('data-video-src');
                const isLocalVideo = videoSrc && (videoSrc.endsWith('.mp4') || !videoSrc.includes('//') || videoSrc.startsWith('assets/'));

                isLightboxCarouselActive = false;
                currentLightboxItems = [];
                if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
                if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
                if (lightboxBottomBar) lightboxBottomBar.style.display = 'none';

                if (isLocalVideo) {
                    lightboxIframe.style.display = 'none';
                    lightboxIframe.src = '';
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.src = videoSrc;

                    const handleMetadata = () => {
                        if (lightboxVideo.videoHeight > lightboxVideo.videoWidth) {
                            lightboxVideoContainer.classList.add('portrait-video');
                        } else {
                            lightboxVideoContainer.classList.remove('portrait-video');
                        }
                        lightboxVideo.removeEventListener('loadedmetadata', handleMetadata);
                    };
                    lightboxVideo.addEventListener('loadedmetadata', handleMetadata);
                    lightboxVideo.play().catch(err => console.log("Video auto-play prevented:", err));
                } else {
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

                if (lightboxImg) lightboxImg.style.display = 'none';
                lightboxVideoContainer.style.display = 'block';
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') card.click();
            });
            card.setAttribute('tabindex', '0');
        });

        const closeLightbox = () => {
            if (lightbox) lightbox.style.display = 'none';
            if (lightboxImg) lightboxImg.src = '';
            if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
            if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
            if (lightboxBottomBar) lightboxBottomBar.style.display = 'none';
            isLightboxCarouselActive = false;
            currentLightboxItems = [];

            if (lightboxIframe) {
                lightboxIframe.src = '';
                lightboxIframe.style.display = 'none';
            }
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
                lightboxVideo.style.display = 'none';
            }
            if (lightboxVideoContainer) lightboxVideoContainer.classList.remove('portrait-video');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') closeLightbox();
            });
        }
        if (lightbox) lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper') || e.target.id === 'lightbox-content-wrapper') {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox && lightbox.style.display === 'flex') closeLightbox();
                if (detailsModal && detailsModal.style.display === 'flex') closeDetailsModal();
            }
        });
    };

    const initCarousels = () => {

        const carouselTrack = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));

        if (carouselTrack && slides.length > 0) {
            let currentIndex = 0;
            let autoPlayInterval;
            const intervalTime = 4000;

            const updateCarousel = (index) => {
                if (index < 0) index = slides.length - 1;
                else if (index >= slides.length) index = 0;
                currentIndex = index;

                carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === currentIndex);
                });
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === currentIndex);
                });
            };

            const nextSlide = () => updateCarousel(currentIndex + 1);
            const prevSlide = () => updateCarousel(currentIndex - 1);

            const startAutoPlay = () => {
                stopAutoPlay();
                autoPlayInterval = setInterval(nextSlide, intervalTime);
            };
            const stopAutoPlay = () => clearInterval(autoPlayInterval);

            if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); startAutoPlay(); });
            if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); startAutoPlay(); });

            indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateCarousel(i);
                    startAutoPlay();
                });

                indicator.setAttribute('tabindex', '0');
                indicator.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        updateCarousel(i);
                        startAutoPlay();
                    }
                });
            });

            const carouselContainer = document.getElementById('rancho-carousel');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', stopAutoPlay);
                carouselContainer.addEventListener('mouseleave', startAutoPlay);

                carouselContainer.addEventListener('focusin', stopAutoPlay);
                carouselContainer.addEventListener('focusout', startAutoPlay);

                let ranchoStartX = 0;
                let ranchoStartY = 0;

                carouselContainer.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 1) {
                        stopAutoPlay();
                        ranchoStartX = e.touches[0].clientX;
                        ranchoStartY = e.touches[0].clientY;
                        ranchoMoved = false;
                    }
                }, { passive: true });

                carouselContainer.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 1) {
                        const diffX = ranchoStartX - e.touches[0].clientX;
                        const diffY = ranchoStartY - e.touches[0].clientY;
                        if (Math.abs(diffX) > 8) {
                            ranchoMoved = true;
                        }
                    }
                }, { passive: true });

                carouselContainer.addEventListener('touchend', (e) => {
                    if (e.changedTouches.length === 1) {
                        const diffX = ranchoStartX - e.changedTouches[0].clientX;
                        const diffY = ranchoStartY - e.changedTouches[0].clientY;

                        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
                            if (diffX > 0) {
                                nextSlide();
                            } else {
                                prevSlide();
                            }
                        }
                    }
                    startAutoPlay();
                    setTimeout(() => { ranchoMoved = false; }, 150);
                }, { passive: true });
            }

            startAutoPlay();
        }

        const galleryTrack = document.querySelector('.gallery-track');
        const gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));
        const galleryPrevBtn = document.getElementById('gallery-prev');
        const galleryNextBtn = document.getElementById('gallery-next');

        if (galleryTrack && gallerySlides.length > 0) {
            let galleryIndex = 0;
            let galleryAutoPlayInterval;

            const getVisibleItemsCount = () => {
                const width = window.innerWidth;
                if (width > 992) return 3;
                if (width > 576) return 2;
                return 1;
            };

            const loadSlideImage = (slide) => {
                if (!slide) return;
                const img = slide.querySelector('.gallery-img');
                if (!img) return;

                if (img.hasAttribute('data-src')) {
                    const dataSrc = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.src = dataSrc;
                    if (img.complete) {
                        img.classList.add('is-loaded');
                        slide.classList.add('is-loaded');
                    } else {
                        img.onload = () => {
                            img.classList.add('is-loaded');
                            slide.classList.add('is-loaded');
                        };
                    }
                } else if (img.src && !img.classList.contains('is-loaded')) {
                    if (img.complete) {
                        img.classList.add('is-loaded');
                        slide.classList.add('is-loaded');
                    } else {
                        img.onload = () => {
                            img.classList.add('is-loaded');
                            slide.classList.add('is-loaded');
                        };
                    }
                }
            };

            // Preload visible slides + buffer ahead
            const preloadBuffer = (index) => {
                const visible = getVisibleItemsCount();
                const bufferCount = visible + 4;
                for (let i = 0; i < bufferCount; i++) {
                    const targetIndex = (index + i) % gallerySlides.length;
                    loadSlideImage(gallerySlides[targetIndex]);
                }
            };

            // Preload remaining slides progressively during idle time
            const preloadRemainingIdle = () => {
                let currentIdx = 4;
                const idleTimer = setInterval(() => {
                    if (currentIdx >= gallerySlides.length) {
                        clearInterval(idleTimer);
                        return;
                    }
                    loadSlideImage(gallerySlides[currentIdx]);
                    currentIdx++;
                }, 150);
            };

            // Trigger idle preload when gallery comes near viewport
            const gallerySection = document.getElementById('galeria');
            if (gallerySection && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            preloadRemainingIdle();
                            observer.disconnect();
                        }
                    });
                }, { rootMargin: '300px' });
                observer.observe(gallerySection);
            } else {
                setTimeout(preloadRemainingIdle, 2500);
            }

            const updateGallery = (index) => {
                const maxIndex = gallerySlides.length - getVisibleItemsCount();
                if (index < 0) index = maxIndex;
                else if (index > maxIndex) index = 0;

                galleryIndex = index;
                preloadBuffer(galleryIndex);

                const slideWidth = gallerySlides[0].getBoundingClientRect().width;
                const gap = 20;
                const amountToMove = galleryIndex * (slideWidth + gap);
                galleryTrack.style.transform = `translateX(-${amountToMove}px)`;
            };

            const nextGallerySlide = () => updateGallery(galleryIndex + 1);
            const prevGallerySlide = () => updateGallery(galleryIndex - 1);

            const startGalleryAutoPlay = () => {
                stopGalleryAutoPlay();
                galleryAutoPlayInterval = setInterval(nextGallerySlide, 4000);
            };
            const stopGalleryAutoPlay = () => clearInterval(galleryAutoPlayInterval);

            if (galleryNextBtn) galleryNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextGallerySlide(); startGalleryAutoPlay(); });
            if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevGallerySlide(); startGalleryAutoPlay(); });

            const galleryCarouselContainer = document.getElementById('gallery-carousel');
            if (galleryCarouselContainer) {
                galleryCarouselContainer.addEventListener('mouseenter', stopGalleryAutoPlay);
                galleryCarouselContainer.addEventListener('mouseleave', startGalleryAutoPlay);
                galleryCarouselContainer.addEventListener('focusin', stopGalleryAutoPlay);
                galleryCarouselContainer.addEventListener('focusout', startGalleryAutoPlay);

                let galleryStartX = 0;
                let galleryStartY = 0;

                galleryCarouselContainer.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 1) {
                        stopGalleryAutoPlay();
                        galleryStartX = e.touches[0].clientX;
                        galleryStartY = e.touches[0].clientY;
                        galleryMoved = false;
                    }
                }, { passive: true });

                galleryCarouselContainer.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 1) {
                        const diffX = galleryStartX - e.touches[0].clientX;
                        const diffY = galleryStartY - e.touches[0].clientY;
                        if (Math.abs(diffX) > 8) {
                            galleryMoved = true;
                        }
                    }
                }, { passive: true });

                galleryCarouselContainer.addEventListener('touchend', (e) => {
                    if (e.changedTouches.length === 1) {
                        const diffX = galleryStartX - e.changedTouches[0].clientX;
                        const diffY = galleryStartY - e.changedTouches[0].clientY;

                        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
                            if (diffX > 0) {
                                nextGallerySlide();
                            } else {
                                prevGallerySlide();
                            }
                        }
                    }
                    startGalleryAutoPlay();
                    setTimeout(() => { galleryMoved = false; }, 150);
                }, { passive: true });
            }

            window.addEventListener('resize', debounce(() => {
                updateGallery(galleryIndex);
            }, 100));

            // Initial load of first visible buffer
            preloadBuffer(0);
            startGalleryAutoPlay();
            updateGallery(0);
        }
    };


    const initGSAPAnimations = () => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const sobreTitleLines = document.querySelectorAll('.sobre-anim-line');
        if (sobreTitleLines.length) {
            gsap.to(sobreTitleLines, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.sobre-header',
                    start: "top 80%"
                }
            });
        }

        const sobreFades = document.querySelectorAll('.sobre-anim-fade');
        sobreFades.forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            });
        });

        const sobreCards = document.querySelectorAll('.sobre-anim-card');
        if (sobreCards.length) {
            gsap.to(sobreCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.sobre-cards-grid',
                    start: "top 80%"
                }
            });
        }

        const statNumbers = document.querySelectorAll('.sobre-stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const duration = 2000;
                    const start = performance.now();

                    const animate = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);

                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(target * eased);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target;
                        }
                    };
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => counterObserver.observe(num));

        const magneticElements = document.querySelectorAll('[data-magnetic]');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    const initGlobalParticles = () => {
        const container = document.getElementById('global-particles');
        if (!container) return;

        const particleCount = 90;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'global-particle';
            const size = Math.random() * 3.5 + 1.5;
            const left = Math.random() * 100;
            const delay = Math.random() * 12;
            const duration = Math.random() * 8 + 10;
            const opacity = Math.random() * 0.35 + 0.18;
            const drift = (Math.random() - 0.5) * 60;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: rgba(229, 193, 88, ${opacity + 0.15});
                left: ${left}%;
                bottom: -10px;
                --p-opacity: ${opacity};
                --p-drift: ${drift}px;
                animation: globalParticleRise ${duration}s linear ${delay}s infinite;
            `;
            container.appendChild(particle);
        }

        const checkScroll = () => {
            if (window.scrollY < window.innerHeight * 0.4) {
                container.style.opacity = '0';
            } else {
                container.style.opacity = '1';
            }
        };

        container.style.transition = 'opacity 0.6s ease';
        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    };

    init();
    initGlobalParticles();
});
