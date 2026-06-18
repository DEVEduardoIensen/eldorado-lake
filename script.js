document.addEventListener('DOMContentLoaded', () => {
    
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
    const closeBtn = document.getElementById('lightbox-close-btn');

    // Open lightbox for gallery images
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            if (videoSrc) {
                lightboxIframe.src = videoSrc;
                
                lightboxImg.style.display = 'none';
                lightboxVideoContainer.style.display = 'block';
                lightbox.style.display = 'flex';
            } else {
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                lightboxImg.style.display = 'block';
                lightboxVideoContainer.style.display = 'none';
                lightbox.style.display = 'flex';
            }
        });
    });

    // Open lightbox for pacotes flyer buttons
    document.querySelectorAll('.btn-open-flyer').forEach(btn => {
        btn.addEventListener('click', () => {
            const imgPath = btn.getAttribute('data-target');
            lightboxImg.src = imgPath;
            lightboxImg.alt = "Detalhes do Pacote";
            
            lightboxImg.style.display = 'block';
            lightboxVideoContainer.style.display = 'none';
            lightbox.style.display = 'flex';
        });
    });

    // Open lightbox for flyer images directly
    document.querySelectorAll('.flyer-img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            lightboxImg.style.display = 'block';
            lightboxVideoContainer.style.display = 'none';
            lightbox.style.display = 'flex';
        });
    });

    // Open lightbox for videos
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video-src');
            lightboxIframe.src = videoSrc;
            
            lightboxImg.style.display = 'none';
            lightboxVideoContainer.style.display = 'block';
            lightbox.style.display = 'flex';
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxIframe.src = ''; // Stop video playback when closing
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
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // 4. Contact Form Validation & Redirection
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const message = document.getElementById('form-message').value.trim();
        
        if (!name || !phone || !message) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            return;
        }

        // Simulação de sucesso
        formFeedback.className = 'form-feedback success';
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
        }, 1500);
    });
});
