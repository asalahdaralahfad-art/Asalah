// Travel Website - Interactive Cards with Video-like Effects
const cardData = [
    { 
        location: 'جدة - السعودية', 
        title: 'جدة التاريخية',
        description: 'قلب جدة النابض بالتاريخ، تضم أقدم المباني والأسواق الشعبية، وكانت بوابة الحجاج إلى مكة منذ القرن السابع الميلادي.'
    },
    { 
        location: 'الدرعية - السعودية', 
        title: 'حي الطريف\nالتاريخي',
        description: 'أول عاصمة للدولة السعودية، يحتوي على قصور الطين التقليدية والمساجد التاريخية.'
    },
    { 
        location: 'مدائن صالح - السعودية', 
        title: 'مدائن صالح\nالتراثية',
        description: 'عاصمة المملكة النبطية الجنوبية، تحتوي على 131 مقبرة منحوتة في الصخر مع نقوش وكتابات نبطية.'
    },
    { 
        location: 'عسير - السعودية', 
        title: "قرية رجال\nالمع",
        description: 'قرية أثرية في منطقة عسير تشتهر بالمنازل الحجرية التقليدية المعمارية الفريدة، وتراثها الثقافي الغني.'  

    },
    { 
        location: 'الرياض - السعودية', 
        title: 'قصر المصمك\nالتاريخي',
        description: 'قلعة تاريخية في الرياض شهدت استعادة الرياض عام 1902، تحولت إلى متحف للتراث السعودي.'
    }
];


class TravelWebsite {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver()
        this.updateProgressBar();
        this.updatePageIndicator();
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroLocation = document.querySelector('.hero-location');
        const btn = document.querySelector(".btn-circle")
        const btnOutlineEl = document.querySelector('.btn-outline');

        // Hide action buttons initially until a card is clicked
        if (btn) btn.style.display = 'none';
        if (btnOutlineEl) btnOutlineEl.style.display = 'none';
        
        btn.addEventListener('click', () => {
            if(heroTitle.innerHTML == 'جدة التاريخية'){
                location.href = "https://www.google.com/maps/place/%D8%A7%D9%84%D8%A8%D9%84%D8%AF%D8%8C+%D8%AC%D8%AF%D8%A9%E2%80%AD/@21.4863815,39.2019297,14z/data=!3m1!4b1!4m6!3m5!1s0x15c3cf1a4b78394b:0xb2f902e7dad72c0!8m2!3d21.4860341!4d39.1854221!16s%2Fm%2F0gg7p54?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D"
            }
            else if(heroTitle.innerHTML == "حي الطريف<br>التاريخي"){
                location.href = "https://www.google.com/maps/place/%D8%AD%D9%8A+%D8%A7%D9%84%D8%B7%D9%91%D8%B1%D9%8A%D9%81+%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%D9%8A%E2%80%AD/@24.7335513,46.5768408,17z/data=!4m10!1m2!2m1!1z2K3ZiiDYp9mE2LfYsdmK2YEg2KjYp9mE2K_Ysdi52YrYqQ!3m6!1s0x3e2ee134f6f3dda3:0x99bf283c86dadb99!8m2!3d24.7336146!4d46.5746471!15sCiLYrdmKINin2YTYt9ix2YrZgSDYqNin2YTYr9ix2LnZitipWiQiItit2Yog2KfZhNi32LHZitmBINio2KfZhNiv2LHYudmK2KmSARNoaXN0b3JpY2FsX2xhbmRtYXJr4AEA!16s%2Fg%2F11clgbwlqz?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
            }
            else if(heroTitle.innerHTML == "مدائن صالح<br>العريقة"){
                location.href = "https://www.google.com/maps/place/%D8%A7%D9%84%D8%AD%D9%90%D8%AC%D9%92%D8%B1%E2%80%AD/@26.8172819,38.0611076,12z/data=!3m1!4b1!4m6!3m5!1s0x15a5b4c133b304cb:0x9078bca28d0e0422!8m2!3d26.8040118!4d37.9572703!16s%2Fm%2F02r25xs?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
            }
            else if(heroTitle.innerHTML == "قرية رجال <br>المع"){
                location.href = "https://www.google.com/maps/place/%D9%85%D8%AA%D8%AD%D9%81+%D9%82%D8%B1%D9%8A%D8%A9+(+%D8%B1%D8%AC%D8%A7%D9%84+)+%D8%A8%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%B1%D8%AC%D8%A7%D9%84+%D8%A3%D9%84%D9%85%D8%B9%E2%80%AD/@18.2124261,42.2785617,17z/data=!3m1!4b1!4m6!3m5!1s0x15e35d20c210acc5:0x879a44c9fe1c509b!8m2!3d18.2124262!4d42.2736908!16s%2Fg%2F1q5bkrny9?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D"
            }
            else if(heroTitle.innerHTML == "قصر المصمك<br>التاريخي"){
                location.href = "https://www.google.com/maps/place/%D9%82%D8%B5%D8%B1+%D8%A7%D9%84%D9%85%D8%B5%D9%85%D9%83%D8%8C+%D8%A7%D9%84%D8%AF%D9%8A%D8%B1%D8%A9%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+12634%E2%80%AD/@24.6312146,46.7182513,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f05a68ffb8a23:0x33b1920233acd312!8m2!3d24.6312147!4d46.7133804!16s%2Fg%2F11x91p0wpn?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
            }
        });

        // Card clicks
        this.cards.forEach((card, index) => {
            
            card.addEventListener('mouseenter', () => this.addHoverEffect(card));
            card.addEventListener('mouseleave', () => this.removeHoverEffect(card));
            
            const background = document.querySelector('.background-image img');
            const cardsContainer = document.querySelector('.cards-container');
            const img = card.querySelector('.card-image img').src;
            card.addEventListener('click', () => {
                // Play sound effect
                playCardChangeSound();
                
                setTimeout(() => {
                    background.style.opacity = 1
                    background.style.animation = 'gradientShift 1s ease forwards';
                    background.src = img;
                    cardsContainer.appendChild(card)
                }, 100);
                background.style.opacity = 0
                background.style.animation = 'none';
                heroTitle.innerHTML = card.querySelector(".card-title").innerHTML;
                heroDescription.innerHTML = cardData[index].description;
                heroLocation.innerHTML = cardData[index].location;

                // Show action buttons after first interaction
                if (btn) btn.style.display = '';
                if (btnOutlineEl) btnOutlineEl.style.display = '';
            });
        });
        
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Auto-play
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        this.cards.forEach(card => {
            observer.observe(card);
        });
    }



    showLoadingScreen() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loading);
    }

    hideLoadingScreen() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }
    }

    animateCards() {
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 300);
        });
    }

    animateHeroContent() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
            }, index * 200);
        });
    }


    updateHeroContent(cardIndex) {
        const heroLocation = document.querySelector('.hero-location');
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        
        
        if (cardData[cardIndex]) {
            heroLocation.textContent = cardData[cardIndex].location;
            heroTitle.innerHTML = cardData[cardIndex].title.replace('\n', '<br>');
            heroDescription.textContent = cardData[cardIndex].description;
        }
    }



    addHoverEffect(card) {
        if (card.classList.contains('active')) return;
        
        card.style.transform = 'translateY(-20px) scale(1.08)';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: linear-gradient(45deg, 
                rgba(255, 215, 0, 0.2), 
                rgba(255, 255, 255, 0.1),
                rgba(255, 215, 0, 0.2));
            border-radius: 30px;
            z-index: -1;
            opacity: 0.8;
            filter: blur(15px);
            animation: glowPulse 2s ease-in-out infinite;
        `;
        
        card.appendChild(glow);
    }

    removeHoverEffect(card) {
        if (card.classList.contains('active')) return;
        
        card.style.transform = '';
        card.style.boxShadow = '';
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.remove();
        }
    }

    addClickEffect(card) {
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 215, 0, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleAnimation 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        card.appendChild(ripple);
        
        // Glow effect for opened cards
        if (card.classList.contains('opened')) {
            const glow = document.createElement('div');
            glow.className = 'card-glow-effect';
            glow.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: linear-gradient(45deg, 
                    rgba(255, 215, 0, 0.3), 
                    rgba(255, 255, 255, 0.2),
                    rgba(255, 215, 0, 0.3));
                border-radius: 35px;
                z-index: -1;
                opacity: 0;
                animation: glowPulse 2s ease-in-out infinite;
            `;
            
            card.appendChild(glow);
            
            setTimeout(() => {
                glow.remove();
            }, 2000);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    updatePageIndicator() {
        const indicator = document.querySelector('.page-indicator');
        const pageNumber = String(this.currentIndex + 1).padStart(2, '0');
        indicator.textContent = pageNumber;
    }

    updateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        const progress = ((this.currentIndex + 1) / this.cards.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                this.nextCard();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousCard();
                break;

        }
    }

    setupTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.previousCard();
                } else {
                    this.nextCard();
                }
            }
        }
    }


    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }


}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glowPulse {
        0%, 100% { 
            opacity: 0.8; 
            transform: scale(1); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1.05); 
        }
    }
    
    @keyframes rippleAnimation {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
    
    .card-glow {
        animation: glowPulse 2s ease-in-out infinite;
    }
    
    .ripple-effect {
        animation: rippleAnimation 0.8s ease-out;
    }
    
    /* Smooth card transitions */
    .card {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Hero content animation */
    .hero-content > * {
        animation: fadeInUp 1s ease-out forwards;
        opacity: 0;
    }
    
    .hero-line {
        animation-delay: 0.2s;
    }
    
    .hero-location {
        animation-delay: 0.4s;
    }
    
    .hero-title {
        animation-delay: 0.6s;
    }
    
    .hero-description {
        animation-delay: 0.8s;
    }
    
    .hero-buttons {
        animation-delay: 1s;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Card entrance animations */
    .card:nth-child(1) { animation-delay: 0.1s; }
    .card:nth-child(2) { animation-delay: 0.2s; }
    .card:nth-child(3) { animation-delay: 0.3s; }
    .card:nth-child(4) { animation-delay: 0.4s; }
    .card:nth-child(5) { animation-delay: 0.5s; }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TravelWebsite();
});

// Add performance optimizations
window.addEventListener('load', () => {
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.willChange = 'transform';
    });
});

// Add resize handler
window.addEventListener('resize', () => {
    // Recalculate card positions if needed
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.willChange = 'auto';
        setTimeout(() => {
            card.style.willChange = 'transform';
        }, 100);
    });
});


const read_more_div = document.querySelector(".read-more");
const read_more_frame = document.querySelector(".read-more video");
const read_more_p = document.querySelector(".read-more p");
const heroTitle = document.querySelector(".hero-title");
const btnOutline = document.querySelector(".btn-outline");


btnOutline.addEventListener('click', () => {
    read_more_div.classList.add("show");
    // Prevent scrolling on main page when read-more is open (especially on mobile)
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if(heroTitle.innerHTML.trim() === 'جدة التاريخية'){
        read_more_frame.style.display = 'none';
        let iframeContainer = read_more_div.querySelector('.iframe-container');
        if (!iframeContainer) {
            iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';
            read_more_div.insertBefore(iframeContainer, read_more_frame);
        }
        iframeContainer.innerHTML = '<iframe src="https://drive.google.com/file/d/1hHJU71oW5eiRAU26oaua4925jUmS3XO-/preview" width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>';
        read_more_p.innerHTML = `جدة التاريخية تقع على ساحل البحر الأحمر، وهي أقدم مناطق مدينة جدة وأحد أقدم الموانئ التاريخية في المملكة العربية السعودية. استُخدم هذا الميناء منذ القرن السابع الميلادي لاستقبال الحجاج القادمين من مختلف أنحاء العالم، وكذلك التجار الذين كانوا يأتون لتبادل البضائع والسلع عبر البحر الأحمر.
        تتميز جدة التاريخية بشوارعها الضيقة والمتعرجة، وبيوتها المبنية من الحجر البحري والخشب، مع نوافذ مزخرفة تقليدية تُعرف بـ "المشربيات"، التي تجمع بين الجمال والوظيفة في آن واحد. كما تحتضن المنطقة أسواقًا قديمة ومعالم تاريخية تعكس الحياة اليومية لسكان جدة على مر العصور، بما في ذلك الأسواق التي كانت مركزًا للتجارة والحرف التقليدية.
        تُعد جدة التاريخية رمزًا للتاريخ والعراقة، حيث تجمع بين الأصالة المعمارية والثقافة الغنية للمدينة، وتجذب الزوار والسياح الذين يودون استكشاف جذور الحضارة الحجازية، والتمتع بالأجواء التقليدية، والتعرف على التراث الحي الذي لا يزال نابضًا بالحياة حتى اليوم.`;
    }

    else if(heroTitle.innerHTML.trim() === "الدرعية<br>التاريخية"){
        read_more_frame.style.display = 'none';
        let iframeContainer = read_more_div.querySelector('.iframe-container');
        if (!iframeContainer) {
            iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';
            read_more_div.insertBefore(iframeContainer, read_more_frame);
        }
        iframeContainer.innerHTML = '<iframe src="https://drive.google.com/file/d/1L12GnPLkQxRUrJ67Q-M09BU4kzfSuk58/preview" width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>';
        read_more_p.innerHTML = `الدرعية تقع شمال غرب مدينة الرياض، وكانت أول عاصمة للدولة السعودية الأولى، وتعد مهد تأسيس المملكة العربية السعودية. تحتضن حي الطريف التاريخي المدرج على قائمة التراث العالمي لليونسكو، والذي يضم قصوراً مبنية من الطين ومساجد تقليدية تعكس فن العمارة النجدية الأصيلة.
        كانت الدرعية مركز الحكم والعلم في الدولة السعودية الأولى، ومكاناً انطلقت منه مسيرة توحيد البلاد. اليوم تُعد وجهة سياحية وثقافية بارزة، تمزج بين الأصالة التاريخية والتطور الحديث، حيث تضم مشاريع تراثية ومعالم سياحية تروي قصة تأسيس المملكة وتطورها عبر العصور.`;
    }

    else if(heroTitle.innerHTML.trim() === "مدائن صالح<br>العريقة"){
        read_more_frame.style.display = 'none';
        let iframeContainer = read_more_div.querySelector('.iframe-container');
        if (!iframeContainer) {
            iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';
            read_more_div.insertBefore(iframeContainer, read_more_frame);
        }
        iframeContainer.innerHTML = '<iframe src="https://drive.google.com/file/d/1ASYNPnD7tG-IXkRQbrM-S6AIzck4KquS/preview" width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>';
        read_more_p.innerHTML = `مدائن صالح موقع أثري في العُلا شمال غرب السعودية، وتضم مقابر ضخمة منحوتة في الصخور تعود لحضارة الأنباط في القرن الأول قبل الميلاد. تُعد أول موقع سعودي يُدرج في قائمة التراث العالمي لليونسكو عام 2008.
        تشتهر المدائن بتصميماتها المعمارية الدقيقة المنحوتة مباشرة في الجبال الرملية، وتضم أكثر من مئة مدفن مزيّنة بزخارف هندسية ونقوش عربية قديمة، مما يعكس مدى التقدم الفني والمعماري في تلك الحقبة.
        اليوم تُعتبر مدائن صالح من أهم الوجهات السياحية والتاريخية في المملكة، وتُظهر مدى عمق التاريخ الإنساني في شبه الجزيرة العربية وجمال تناغم الطبيعة مع التراث القديم.`;
    }

    else if(heroTitle.innerHTML.trim() === "قرية رجال <br>المع"){
        read_more_frame.style.display = 'none';
        let iframeContainer = read_more_div.querySelector('.iframe-container');
        if (!iframeContainer) {
            iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';
            read_more_div.insertBefore(iframeContainer, read_more_frame);
        }
        iframeContainer.innerHTML = '<iframe src="https://drive.google.com/file/d/1-9F-ffk_K157egC3T5RADCCdl4rKeV8U/preview" width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>';
        read_more_p.innerHTML = `قرية رجال ألمع تقع في منطقة عسير جنوب غرب المملكة العربية السعودية، وتُعد من أبرز القرى التراثية التي حافظت على طرازها المعماري القديم. تتميز مبانيها بالحجارة السوداء والبيضاء، وتُزيَّن نوافذها بالألوان الزاهية التي تعكس جمال الفنون الشعبية المحلية.
        كانت القرية مركزاً تجارياً مهماً قديماً، حيث كانت تربط بين اليمن ومكة والمدينة عبر طريق القوافل. اليوم أصبحت رجال ألمع وجهة سياحية بارزة، تضم متحفاً تاريخياً يعرض تراث المنطقة وثقافتها العريقة، كما تُعد مثالاً رائعاً على التعايش بين الإنسان والطبيعة في جبال السروات.`;
    }

    else if(heroTitle.innerHTML.trim() === "قصر المصمك<br>التاريخي"){
        read_more_frame.style.display = 'none';
        let iframeContainer = read_more_div.querySelector('.iframe-container');
        if (!iframeContainer) {
            iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';
            read_more_div.insertBefore(iframeContainer, read_more_frame);
        }
        iframeContainer.innerHTML = '<iframe src="https://drive.google.com/file/d/1GDjuPCc3HO7GCfH-O0ZOAXKkjnfgXYxX/preview" width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>';
        read_more_p.innerHTML = `قصر المصمك معلم تاريخي يقع في قلب الرياض، شُيّد في أواخر القرن التاسع عشر من الطين والطوب اللبن، وكان له دور محوري في توحيد المملكة. 
        شهد القصر معركة استعادة الرياض عام 1902م بقيادة الملك عبدالعزيز آل سعود، التي كانت نقطة الانطلاق لتأسيس الدولة السعودية الثالثة.
        يتميز القصر بتصميمه المعماري النجدي التقليدي، حيث يضم أبراجاً مربعة وساحة داخلية واسعة وأبواباً ضخمة مصنوعة من خشب النخيل. اليوم يُعد المصمك رمزاً لتاريخ المملكة ومعلماً ثقافياً بارزاً يروي قصة التوحيد والبطولة.`;
    }
});




function closeF(){
    const read_more_div = document.querySelector(".read-more");
    const read_more_frame = document.querySelector(".read-more video");
    
    // Pause video element if it exists
    if (read_more_frame) {
        read_more_frame.pause();
        read_more_frame.currentTime = 0;
    }
    
    // Stop any iframes that might be playing
    const iframeContainer = read_more_div.querySelector('.iframe-container');
    if (iframeContainer) {
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe) {
            // Stop the iframe by removing its src
            iframe.src = '';
        }
    }
    
    read_more_div.classList.remove("show");
    // Restore scrolling on main page
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}


// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// ========== POETRY LIBRARY SECTION ==========

// Saudi Poets Data
// يمكنك إضافة روابط الكتب في حقل 'link' لكل كتاب
// عند الضغط على بطاقة الكتاب، سيتم فتح الرابط في نافذة جديدة
const saudiPoets = [
    {
        id: 1,
        name: 'محمد بن عبدالله العوني',
        bio: 'شاعر سعودي معاصر من مواليد الرياض، اشتهر بجمال شعره في وصف الطبيعة والحب، يعتبر من أبرز شعراء الربع الأخير من القرن العشرين.',
        icon: '📜',
        stats: { poems: 120, followers: '500K' },
        books: [
            { title: 'أغاني الشوق', year: '1985', desc: 'ديوان يعبر عن مشاعر الحب والشوق في أجمل الصور الشعرية', link: 'https://www.google.com' },
            { title: 'ليالي القمر', year: '1988', desc: 'قصائد تهتم بوصف الطبيعة وجمال الليل', link: 'https://www.google.com' },
            { title: 'خواطر الصباح', year: '1992', desc: 'مجموعة من القصائد الصوفية والعاطفية', link: 'https://www.google.com' }
        ]
    },
    {
        id: 2,
        name: 'عبدالله بن خميس',
        bio: 'من أعلام الأدب والشعر السعودي، جمع بين الشعر التقليدي والفصيح، له إسهامات كبيرة في الأدب الشعبي.',
        icon: '🎭',
        stats: { poems: 200, followers: '800K' },
        books: [
            { title: 'من الأدب الشعبي', year: '1974', desc: 'مجموعة من القصائد والأمثال الشعبية', link: 'https://www.google.com' },
            { title: 'شعراء نجد', year: '1981', desc: 'دراسة شاملة عن شعراء منطقة نجد', link: 'https://www.google.com' },
            { title: 'من ذاكرة الوطن', year: '1990', desc: 'قصائد عن الوطن والهوية السعودية', link: 'https://www.google.com' }
        ]
    },
    {
        id: 3,
        name: 'غازي بن عبدالرحمن القصيبي',
        bio: 'كاتب وشاعر ودبلوماسي سعودي، من أشهر الشعراء السعوديين المعاصرين، له بصمة واضحة في الشعر العربي الحديث.',
        icon: '✍️',
        stats: { poems: 150, followers: '1.2M' },
        books: [
            { title: 'معركة بلا راية', year: '1970', desc: 'من أشهر دواوينه الشعرية', link: 'https://www.google.com' },
            { title: 'أشعار من جزائر اللؤلؤ', year: '1978', desc: 'قصائد عن البحر والخليج العربي', link: 'https://www.google.com' },
            { title: 'حديقة الغروب', year: '1986', desc: 'مجموعة من القصائد الرومانسية', link: 'https://www.google.com' }
        ]
    },
    {
        id: 4,
        name: 'عبدالرحمن العشماوي',
        bio: 'شاعر سعودي بارز، صاحب ديوان "دمعة وابتسامة"، له إسهامات كبيرة في الشعر العربي المعاصر.',
        icon: '🌙',
        stats: { poems: 180, followers: '600K' },
        books: [
            { title: 'دمعة وابتسامة', year: '1985', desc: 'من أروع المجموعات الشعرية العاطفية', link: 'https://www.google.com' },
            { title: 'ريحان الروح', year: '1991', desc: 'قصائد صوفية وعرفانية', link: 'https://www.google.com' },
            { title: 'ظلال وضوء', year: '1998', desc: 'مجموعة متنوعة من القصائد الحرة', link: 'https://www.google.com' }
        ]
    }
];

// Poetry Library Functions
function openPoetryLibrary() {
    const loadingScreen = document.getElementById('poetryLibraryLoading');
    const poetryPage = document.getElementById('poetryLibraryPage');
    const grid = document.getElementById('poetsGrid');
    
    if (!loadingScreen || !poetryPage) return;
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Clear and populate poets
    grid.innerHTML = '';
    saudiPoets.forEach(poet => {
        const card = document.createElement('div');
        card.className = 'poet-card';
        card.innerHTML = `
            <div class="poet-icon">
                <div class="pen-icon">
                    <div class="pen-body"></div>
                    <div class="pen-tip"></div>
                    <div class="pen-writing-line"></div>
                </div>
            </div>
            <div class="poet-name">${poet.name}</div>
            <div class="poet-bio">${poet.bio}</div>
            <div class="poet-stats">
                <div class="poet-stat">
                    <span class="poet-stat-number">${poet.stats.poems}</span>
                    <span class="poet-stat-label">قصيدة</span>
                </div>
                <div class="poet-stat">
                    <span class="poet-stat-number">${poet.stats.followers}</span>
                    <span class="poet-stat-label">متابع</span>
                </div>
            </div>
        `;
        card.onclick = () => showPoetryBooks(poet);
        grid.appendChild(card);
    });
    
    // Simulate loading (2-3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show poetry page with animation
        setTimeout(() => {
            poetryPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate cards entrance
            const cards = document.querySelectorAll('.poet-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, (index + 1) * 100);
            });
        }, 300);
    }, 2500);
}

function closePoetryLibrary() {
    const poetryPage = document.getElementById('poetryLibraryPage');
    if (!poetryPage) return;
    
    const cards = document.querySelectorAll('.poet-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-50px)';
        }, index * 50);
    });
    
    setTimeout(() => {
        poetryPage.classList.remove('active');
        document.body.style.overflow = '';
        
        cards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
        });
    }, 500);
}

// Show Poetry Books
function showPoetryBooks(poet) {
    const modal = document.getElementById('poetryBooksModal');
    const header = document.getElementById('booksHeader');
    const grid = document.getElementById('booksGrid');
    
    // Update header
    header.innerHTML = `
        <h3>دواوين ${poet.name}</h3>
        <p>استكشف أعمال ${poet.name} الشعرية</p>
    `;
    
    // Clear and populate books
    grid.innerHTML = '';
    poet.books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-icon">📚</div>
            <div class="book-title">${book.title}</div>
            <div class="book-year">${book.year}</div>
            <div class="book-description">${book.desc}</div>
        `;
        grid.appendChild(card);
    });
    
    // Close poetry library and open books modal
    closePoetryLibrary();
    
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function closePoetryBooks() {
    const modal = document.getElementById('poetryBooksModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const modals = ['poetryBooksModal', 'heritageOptionsModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = ['poetryBooksModal', 'heritageOptionsModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close poetry library page
        const poetryLibraryPage = document.getElementById('poetryLibraryPage');
        if (poetryLibraryPage && poetryLibraryPage.classList.contains('active')) {
            closePoetryLibrary();
        }
        
        // Also close heritage pages
        const heritageInternal = document.getElementById('heritageInternalPage');
        if (heritageInternal && heritageInternal.classList.contains('active')) {
            closeHeritageInternalPage();
        }
        
        const heritagePage = document.getElementById('heritagePage');
        if (heritagePage && heritagePage.classList.contains('active')) {
            closeHeritagePage();
        }
        
        const heroesPage = document.getElementById('heroesPage');
        if (heroesPage && heroesPage.classList.contains('active')) {
            closeHeroesPage();
        }
        
        const anthemsPage = document.getElementById('anthemsPage');
        if (anthemsPage && anthemsPage.classList.contains('active')) {
            closeAnthemsPage();
        }
        
        const ancestorsStoriesPage = document.getElementById('ancestorsStoriesPage');
        if (ancestorsStoriesPage && ancestorsStoriesPage.classList.contains('active')) {
            closeAncestorsStoriesPage();
        }
        
        const storySectionModal = document.getElementById('storySectionModal');
        if (storySectionModal && storySectionModal.classList.contains('active')) {
            closeStorySection();
        }
        
        const contactPage = document.getElementById('contactPage');
        if (contactPage && contactPage.classList.contains('active')) {
            closeContactPage();
        }
    }
});

// Book Preview Function
function openBookPreview(book) {
    // Create a preview modal
    const previewModal = document.createElement('div');
    previewModal.className = 'modal-overlay active';
    previewModal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="book-preview-content">
                <div class="book-preview-icon">📖</div>
                <h2 class="book-preview-title">${book.title}</h2>
                <div class="book-preview-year">صدر عام ${book.year}</div>
                <div class="book-preview-description">${book.desc}</div>
                <div class="book-preview-sample">
                    <h3>نموذج من القصائد:</h3>
                    <div class="poem-sample">
                        <p>في سكون الليل وتحت الأقمار</p>
                        <p>نكتب التاريخ بأحرف من نار</p>
                        <p>وطننا الحبيب بأرواح نفدي</p>
                        <p>ونصون تراثنا بكل الإصرار</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(previewModal);
    document.body.style.overflow = 'hidden';
    
    // Close on click outside
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.remove();
            document.body.style.overflow = '';
        }
    });
}

// ========== HERITAGE PAGE SECTION ==========

function openHeritagePage() {
    const loadingScreen = document.getElementById('heritageLoading');
    const heritagePage = document.getElementById('heritagePage');
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading (2-3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show heritage page with animation
        setTimeout(() => {
            heritagePage.classList.add('active');
            document.body.style.overflow = '';
            
            // Initialize parallax after page loads
            initParallax();
        }, 300);
    }, 2500);
}

function closeHeritagePage() {
    const heritagePage = document.getElementById('heritagePage');
    
    // Close heritage page
    heritagePage.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
    const heritagePage = document.getElementById('heritagePage');
    if (!heritagePage) return;
    
    // Parallax for background images
    const parallaxImages = heritagePage.querySelectorAll('[data-parallax-speed]');
    
    heritagePage.addEventListener('scroll', () => {
        const scrollY = heritagePage.scrollTop;
        
        parallaxImages.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-parallax-speed'));
            const yPos = -(scrollY * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Parallax for text elements
    const parallaxElements = heritagePage.querySelectorAll('[data-parallax]');
    
    heritagePage.addEventListener('scroll', () => {
        const scrollY = heritagePage.scrollTop;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax'));
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const windowHeight = heritagePage.clientHeight;
            const scrollProgress = (scrollY + windowHeight - elementTop) / (windowHeight * 2);
            
            if (scrollProgress >= 0 && scrollProgress <= 1) {
                const translateY = (1 - scrollProgress) * 100 * speed;
                const opacity = scrollProgress;
                element.style.transform = `translateY(${translateY}px)`;
                element.style.opacity = opacity;
            }
        });
    });
}

// ========== HEROES PAGE SECTION ==========

function openHeroesPage() {
    const loadingScreen = document.getElementById('heroesLoading');
    const heroesPage = document.getElementById('heroesPage');
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading (2-3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show heroes page with animation
        setTimeout(() => {
            heroesPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate sections entrance
            const sections = document.querySelectorAll('.heroes-tribute, .heroes-gallery');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, (index + 1) * 300);
            });
        }, 300);
    }, 2500);
}

function closeHeroesPage() {
    const heroesPage = document.getElementById('heroesPage');
    
    // Animate sections exit
    const sections = document.querySelectorAll('.heroes-tribute, .heroes-gallery');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.transition = 'all 0.4s ease';
            section.style.opacity = '0';
            section.style.transform = 'translateY(-50px)';
        }, index * 100);
    });
    
    // Close heroes page
    setTimeout(() => {
        heroesPage.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animations
        sections.forEach(section => {
            section.style.opacity = '';
            section.style.transform = '';
            section.style.transition = '';
        });
    }, 500);
}

// ========== ANTHEMS PAGE SECTION ==========

function openAnthemsPage() {
    const loadingScreen = document.getElementById('anthemsLoading');
    const anthemsPage = document.getElementById('anthemsPage');
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading (2-3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show anthems page with animation
        setTimeout(() => {
            anthemsPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Initialize heritage carousel
            initHeritageCarousel();
            
            // Add interactive sound effects to heritage cards
            const heritageCards = document.querySelectorAll('.heritage-card');
            heritageCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    playHeritageItemSound();
                });
                
                // Add click event to show detail modal
                card.addEventListener('click', () => {
                    openHeritageDetail(card);
                });
            });
            
            // Animate sections entrance
            const sections = document.querySelectorAll('.anthems-info');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, (index + 1) * 300);
            });
        }, 300);
    }, 2500);
}

function closeAnthemsPage() {
    const anthemsPage = document.getElementById('anthemsPage');
    
    // Animate sections exit
    const sections = document.querySelectorAll('.anthems-info');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.transition = 'all 0.4s ease';
            section.style.opacity = '0';
            section.style.transform = 'translateY(-50px)';
        }, index * 100);
    });
    
    // Close anthems page
    setTimeout(() => {
        anthemsPage.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animations
        sections.forEach(section => {
            section.style.opacity = '';
            section.style.transform = '';
            section.style.transition = '';
        });
    }, 500);
}

// ========== SOUND EFFECTS ==========
function playCardChangeSound() {
    const menuScrollSound = new Audio("Untitled video - Made with Clipchamp (1).mp3");
    setTimeout(() => {
        menuScrollSound.play();
    }, 500); // 500 ملي ثانية = نص ثانية
}


function playHeritageItemSound() {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Generate a pleasant bell-like chime for heritage items
    function generateChime() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filterNode = audioContext.createBiquadFilter();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 440; // A4 note
        
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 1200;
        filterNode.Q.value = 5;
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Play chime
    generateChime();
}

// ========== HERITAGE CAROUSEL FUNCTIONALITY ==========
function initHeritageCarousel() {
    const anthemsPage = document.getElementById('anthemsPage');
    if (!anthemsPage) return;
    
    const carousel = anthemsPage.querySelector('.heritage-carousel');
    if (!carousel) return;
    
    const prevBtn = anthemsPage.querySelector('.heritage-prev-btn');
    const nextBtn = anthemsPage.querySelector('.heritage-next-btn');
    
    if (!prevBtn || !nextBtn) return;
    
    const cards = carousel.querySelectorAll('.heritage-card');
    const cardWidth = cards[0] ? cards[0].offsetWidth + 30 : 350; // 30px gap
    let currentIndex = 0;
    const maxIndex = cards.length - 3; // Show 3 cards at a time
    
    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            playCardChangeSound();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
            playCardChangeSound();
        }
    });
    
    updateCarousel();
}

// ========== HERITAGE DETAIL MODAL FUNCTIONS ==========
let currentHeritageIndex = 0;
const heritageData = [];

function openHeritageDetail(card) {
    const modal = document.getElementById('heritageDetailModal');
    if (!modal) return;
    
    // Get all heritage cards to populate data
    const cards = document.querySelectorAll('.heritage-card');
    cards.forEach((c, index) => {
        heritageData[index] = {
            image: c.querySelector('.heritage-card-image img')?.src || '',
            title: c.querySelector('.heritage-card-title')?.textContent || '',
            description: c.querySelector('.heritage-card-description')?.textContent || ''
        };
        
        if (c === card) {
            currentHeritageIndex = index;
        }
    });
    
    // Update modal content
    updateHeritageDetailContent();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Play sound
    playHeritageItemSound();
}

function closeHeritageDetail() {
    const modal = document.getElementById('heritageDetailModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateHeritageDetail(direction) {
    const total = heritageData.length;
    currentHeritageIndex = (currentHeritageIndex + direction + total) % total;
    updateHeritageDetailContent();
    playCardChangeSound();
}

function updateHeritageDetailContent() {
    const modal = document.getElementById('heritageDetailModal');
    if (!modal) return;
    
    const currentData = heritageData[currentHeritageIndex];
    if (!currentData) return;
    
    const image = modal.querySelector('.heritage-detail-image');
    const title = modal.querySelector('.heritage-detail-title');
    const description = modal.querySelector('.heritage-detail-description');
    
    if (image) image.src = currentData.image;
    if (image) image.alt = currentData.title;
    if (title) title.textContent = currentData.title;
    if (description) description.textContent = currentData.description;
}

// ========== ENTERTAINMENT HERITAGE FUNCTIONS ==========
function openEntertainmentPage() {
    const loadingScreen = document.getElementById('entertainmentLoading');
    const entertainmentPage = document.getElementById('entertainmentPage');
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading (3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show entertainment page with animation
        setTimeout(() => {
            entertainmentPage.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 300);
    }, 3000);
}

function closeEntertainmentPage() {
    const entertainmentPage = document.getElementById('entertainmentPage');
    
    // Close entertainment page
    setTimeout(() => {
        entertainmentPage.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset challenge state
        resetChallenge();
    }, 300);
}

let currentQuestionIndex = 0;
let userScore = 0;
const heritageQuestions = [
    {
        question: "ما هي منطقة العلا الشهيرة بـ آثارها النبطية؟",
        options: ["مسجد النبوي", "مدائن صالح", "قصر المصمك", "حي الطريف"],
        correct: 1,
        image: "heritage-imgs/download (10).jpeg"
    },
    {
        question: "ما هو اسم الرداء الذهبي التقليدي الذي يرتديه السعوديون؟",
        options: ["الثوب", "البشت", "الشماغ", "الغترة"],
        correct: 1,
        image: "heritage-imgs/download (11).jpeg"
    },
    {
        question: "من أين يُستخرج المسواك؟",
        options: ["شجرة الأراك", "شجرة النخيل", "شجرة الزيتون", "شجرة العرعر"],
        correct: 0,
        image: "heritage-imgs/شجرة الاراك.jpeg"
    },
    {
        question: "ما هو اسم القهوة العربية في السعودية؟",
        options: ["القهوة التركية", "القهوة العربيه", "القهوة السعودية", "القهوة الفاخرة"],
        correct: 2,
        image: "heritage-imgs/🤍.jpeg"
    },
    {
        question: "ما هو اسم الخنجر التقليدي السعودي؟",
        options: ["السيف", "الخنجر", "السكين", "القرن"],
        correct: 1,
        image: "heritage-imgs/images.jpeg"
    },
    {
        question: "كم يبلغ عدد مناطق المملكة العربية السعودية؟",
        options: ["11 منطقة", "13 منطقة", "15 منطقة", "17 منطقة"],
        correct: 1,
        image: "heritage-imgs/download (12).jpeg"
    },
    {
        question: "ما هي المدينتان المقدستان في المملكة؟",
        options: ["الرياض وجدة", "الدمام والخبر", "مكة والمدينة", "الطائف والباحة"],
        correct: 2,
        image: "heritage-imgs/#madina.jpeg"
    },
    {
        question: "متى تم توحيد المملكة العربية السعودية؟",
        options: ["1932", "1950", "1920", "1945"],
        correct: 0,
        image: "heritage-imgs/download (6).jpeg"
    },
    {
        question: "ما هو اسم الجبل الشهير في نجد؟",
        options: ["جبل طويق", "جبل أحد", "جبل نور", "جبل ثور"],
        correct: 0,
        image: "heritage-imgs/جبل طويق.jpeg"
    },
    {
        question: "ما هي عاصمة المملكة العربية السعودية الأولى؟",
        options: ["الدرعية", "الرياض", "جدة", "مكة"],
        correct: 0,
        image: "heritage-imgs/download (15).jpeg"
    },
    {
        question: "ما هو الاسم القديم لمدينة الرياض؟",
        options: ["اليمامة", "نجد", "الحجاز", "عسير"],
        correct: 0,
        image: "heritage-imgs/500320_5091202212.jpeg"
    },
    {
        question: "كم عدد الدول التي تشترك في حدود مع السعودية؟",
        options: ["5 دول", "6 دول", "7 دول", "8 دول"],
        correct: 2,
        image: "heritage-imgs/download (16).jpeg"
    },
    {
        question: "ما هو اسم الفن الشعبي السعودي المعروف؟",
        options: ["العرضة", "الدبكة", "الزير", "السمسمية"],
        correct: 0,
        image: "heritage-imgs/9,842 Saudi Royal Family Stock Photos, High-Res Pictures, and Images - Getty Images.jpeg"
    },
    {
        question: "أين يقع قصر المصمك التاريخي؟",
        options: ["جدة", "الرياض", "الدمام", "مكة"],
        correct: 1,
        image: "heritage-imgs/السعودية 🫡🫡.jpeg"
    },
    {
        question: "ما هو الشهر الوطني للمملكة؟",
        options: ["شهر رمضان", "شهر ذي الحجة", "شهر شوال", "جميع الشهور"],
        correct: 3,
        image: "heritage-imgs/download (17).jpeg"
    }
];

function startHeritageChallenge() {
    const hero = document.getElementById('entertainmentHero');
    const challengeSection = document.getElementById('challengeSection');
    const windEffect = document.getElementById('windEffect');
    
    // Hide hero
    hero.style.display = 'none';
    
    // Show wind effect
    windEffect.classList.add('active');
    
    // Play wind sound
    playWindSound();
    
    // Show challenge after wind effect
    setTimeout(() => {
        windEffect.classList.remove('active');
        challengeSection.style.display = 'block';
        currentQuestionIndex = 0;
        userScore = 0;
        showQuestion();
    }, 3000);
}

function playWindSound() {
    const audio = new Audio('Untitled video - Made with Clipchamp.m4a');
    audio.volume = 0.3;
    audio.play().catch(err => {
        console.log('Could not play wind sound:', err);
    });
}

function showQuestion() {
    if (currentQuestionIndex >= heritageQuestions.length) {
        showResults();
        return;
    }
    
    const question = heritageQuestions[currentQuestionIndex];
    const questionImage = document.getElementById('questionImage');
    const questionText = document.getElementById('questionText');
    const questionNumber = document.getElementById('questionNumber');
    const questionScore = document.getElementById('questionScore');
    const questionOptions = document.getElementById('questionOptions');
    const nextBtn = document.getElementById('nextQuestionBtn');
    
    questionNumber.textContent = `السؤال ${currentQuestionIndex + 1} من ${heritageQuestions.length}`;
    questionScore.textContent = `النقاط: ${userScore}`;
    questionImage.src = question.image;
    questionText.textContent = question.question;
    
    questionOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'question-option';
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectAnswer(index, question.correct);
        questionOptions.appendChild(optionBtn);
    });
    
    nextBtn.style.display = 'none';
}

function selectAnswer(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.question-option');
    const nextBtn = document.getElementById('nextQuestionBtn');
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            option.classList.add('wrong');
        }
    });
    
    if (selectedIndex === correctIndex) {
        userScore++;
        playHeritageItemSound();
    } else {
        playCardChangeSound();
    }
    
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    const questionContainer = document.getElementById('questionContainer');
    const resultsContainer = document.getElementById('challengeResults');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsScore = document.getElementById('resultsScore');
    const resultsMessage = document.getElementById('resultsMessage');
    
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    resultsScore.textContent = `حصلت على ${userScore} من ${heritageQuestions.length}`;
    
    if (userScore >= 12) {
        resultsTitle.textContent = 'ممتاز!';
        resultsMessage.textContent = 'أنت خبير في التراث السعودي! معرفتك عميقة ورائعة بالتراث والثقافة السعودية الأصيلة.';
    } else if (userScore >= 8) {
        resultsTitle.textContent = 'جيد جداً!';
        resultsMessage.textContent = 'أداء رائع! لديك معرفة جيدة بالتراث السعودي، استمر في التعلم واكتشاف المزيد.';
    } else if (userScore >= 5) {
        resultsTitle.textContent = 'مقبول';
        resultsMessage.textContent = 'ليس سيئاً، لكن يمكنك تحسين معرفتك عن التراث السعودي. استمر في التعلم!';
    } else {
        resultsTitle.textContent = 'جرب مرة أخرى';
        resultsMessage.textContent = 'اعتبار التحدي فرصة لتعلم المزيد عن تراثنا العريق وإرثنا السعودي الأصيل.';
    }
}

function restartChallenge() {
    const hero = document.getElementById('entertainmentHero');
    const challengeSection = document.getElementById('challengeSection');
    const questionContainer = document.getElementById('questionContainer');
    const resultsContainer = document.getElementById('challengeResults');
    
    hero.style.display = 'flex';
    challengeSection.style.display = 'none';
    questionContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    
    currentQuestionIndex = 0;
    userScore = 0;
}

function resetChallenge() {
    const hero = document.getElementById('entertainmentHero');
    const challengeSection = document.getElementById('challengeSection');
    const questionContainer = document.getElementById('questionContainer');
    const resultsContainer = document.getElementById('challengeResults');
    
    hero.style.display = 'flex';
    challengeSection.style.display = 'none';
    questionContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    
    currentQuestionIndex = 0;
    userScore = 0;
}

// ========== HERITAGE OPTIONS MODAL FUNCTIONS ==========
function openHeritageOptions() {
    const modal = document.getElementById('heritageOptionsModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playHeritageItemSound();
}

function closeHeritageOptions() {
    const modal = document.getElementById('heritageOptionsModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Heritage Internal Pages Data
const heritageInternalPages = [
    {
        title: 'الأزياء التقليدية',
        subtitle: 'اكتشف جمال الأزياء السعودية الأصيلة',
        image: 'imgs/Traditional Saudi Fashion Foundation Day يوم التأسيس traditional costumes.jpeg',
        description: 'الأزياء التقليدية السعودية تمثل جزءاً أساسياً من الهوية الثقافية للمملكة. تتميز بألوانها الزاهية ونسيجها الفاخر وتصميماتها العريقة التي تناقلتها الأجيال عبر القرون.',
        items: [
            { title: 'الثوب السعودي', desc: 'الثوب التقليدي الأبيض المصنوع من القطن الناعم، يتميز ببساطته وأناقته.' },
            { title: 'البشت', desc: 'الرداء الشهير المصنوع من الصوف أو الكشمير ويزينه الخيوط الذهبية للرجال.' },
            { title: 'العقال والغترة', desc: 'الغطاء الرأسي التقليدي الذي يكمل الزي السعودي الأصيل.' },
            { title: 'الشيلة', desc: 'الوشاح التقليدي النسائي بألوانه وأنماطه المميزة.' }
        ]
    },
    {
        title: 'المجوهرات والإكسسوارات',
        subtitle: 'زينة وتراث في كل قطعة',
        image: 'imgs/برقع ذهبي.jpeg',
        description: 'المجوهرات السعودية التقليدية تُعتبر من أروع الفنون اليدوية، حيث تجمع بين الذهب والفضة والأحجار الكريمة لخلق قطع فريدة تعبر عن الأناقة والتراث الأصيل.',
        items: [
            { title: 'الذهب السعودي', desc: 'المجوهرات الذهبية التقليدية المزخرفة بالنقوش الإسلامية.' },
            { title: 'الفضة المطروقة', desc: 'الأواني والمجوهرات الفضية المنقوشة يدوياً بزخارف عربية.' },
            { title: 'اللؤلؤ الطبيعي', desc: 'اللآلئ الطبيعية التي تشتهر بها منطقة الخليج العربي.' },
            { title: 'المسابح', desc: 'المسابح المصنوعة من الأحجار الكريمة والعنبر الطبيعي.' }
        ]
    },
    {
        title: 'الأدوات التقليدية',
        subtitle: 'أدوات من الماضي تحكي قصة الأصالة',
        image: 'imgs/الجاروشة.jpeg',
        description: 'الأدوات التقليدية السعودية تعكس حكمة الأجداد وبراعتهم في صناعة الأدوات اليومية من مواد طبيعية محلية، كل قطعة تحمل قصة وذاكرة.',
        items: [
            { title: 'المسواك', desc: 'أداة العناية بالأسنان المصنوعة من جذور شجرة الأراك.' },
            { title: 'المنسج', desc: 'آلة النسيج التقليدية لصناعة الأقمشة والسجاد.' },
            { title: 'الهاون والمهراس', desc: 'أدوات طحن البهارات والقهوة المصنوعة من الحجر.' },
            { title: 'السلال والحقائب', desc: 'المصنوعة من خوص النخيل لحفظ وتخزين الأغراض.' }
        ]
    },
    {
        title: 'المشروبات التراثية',
        subtitle: 'نكهات عربية أصيلة',
        image: 'imgs/Arabic Coffee _ How to Make Traditional Arabic Gahwa.jpeg',
        description: 'المشروبات التراثية السعودية جزء لا يتجزأ من ثقافة الضيافة والكرم، حيث تُقدم القهوة العربية والشاي بكرم ضيافة مميز يُمثل الهوية السعودية.',
        items: [
            { title: 'القهوة العربية', desc: 'المشروب الأصيل المقدم للضيوف في المناسبات والاجتماعات.' },
            { title: 'الشاي السعودي', desc: 'الشاي المميز بطعمه العشبي الممزوج بالتوابل.' },
            { title: 'اللبن الرائب', desc: 'المشروب التقليدي المنعش في الأيام الحارة.' },
            { title: 'المشروبات العشبية', desc: 'مثل الكمون واليانسون والحلبة التي تُستخدم في الطب التقليدي.' }
        ]
    },
    {
        title: 'الأطعمة التقليدية',
        subtitle: 'أطباق تعكس ثراء المطبخ السعودي',
        image: 'imgs/download (4).jpeg',
        description: 'المطبخ السعودي يتميز بتنوعه وغناه بالنكهات المميزة التي تُمثل كل منطقة. من الأرز واللحم إلى التمر والقهوة، كل طبق يحكي قصة من التراث.',
        items: [
            { title: 'التمر', desc: 'ثمرة النخيل التي تُعتبر من أشهر المنتجات السعودية وأكثرها قيمة غذائية.' },
            { title: 'الكبسة', desc: 'الأكلة الوطنية السعودية الشهيرة بالأرز واللحم والبهارات.' },
            { title: 'المطازيز', desc: 'طبق تقليدي من اللحم والخضروات والبهارات المميزة.' },
            { title: 'الحلويات التقليدية', desc: 'مثل اللقيمات والكبسة الحلو والعصيدة التراثية.' }
        ]
    },
    {
        title: 'الأسلحة التقليدية',
        subtitle: 'فنون الحرب والدفاع في التراث السعودي',
        image: 'imgs/download (5).jpeg',
        description: 'الأسلحة التقليدية السعودية جزء من التراث العسكري والفني للمملكة، حيث تُصنع يدوياً بدقة فائقة وتُزين بنقوش ذهبية تعكس براعة الحرفيين.',
        items: [
            { title: 'الخنجر السعودي', desc: 'الخنجر التقليدي المزخرف الذي يُلبس في المناسبات الاحتفالية.' },
            { title: 'السيف النجدى', desc: 'السيف التقليدي المزين بالفضة والذهب.' },
            { title: 'البندقية التقليدية', desc: 'البندقية القديمة المزخرفة التي كانت تُستخدم للصيد والدفاع.' },
            { title: 'المجموعات الاحتفالية', desc: 'مجموعات كاملة من الأسلحة التقليدية للعروض والاحتفالات.' }
        ]
    }
];

// ========== HERITAGE INTERNAL PAGE FUNCTIONS ==========
function openHeritageInternalPage(index) {
    const page = document.getElementById('heritageInternalPage');
    const content = document.getElementById('heritageInternalContent');
    
    if (!page || !content || !heritageInternalPages[index]) return;
    
    const pageData = heritageInternalPages[index];
    
    // Show loading
    content.innerHTML = '<div style="text-align: center; padding: 100px; color: #ffd700;">جاري التحميل...</div>';
    page.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading, then show content
    setTimeout(() => {
        content.innerHTML = `
            <div class="heritage-internal-header">
                <h1 class="heritage-internal-title">${pageData.title}</h1>
                <p class="heritage-internal-subtitle">${pageData.subtitle}</p>
            </div>
            
            <div class="heritage-internal-image">
                <img src="${pageData.image}" alt="${pageData.title}">
            </div>
            
            <div class="heritage-internal-description">
                ${pageData.description}
            </div>
            
            <div class="heritage-internal-items">
                ${pageData.items.map(item => `
                    <div class="heritage-internal-item">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Close options modal
        closeHeritageOptions();
        
        // Play sound
        playHeritageItemSound();
    }, 1500);
}

function closeHeritageInternalPage() {
    const page = document.getElementById('heritageInternalPage');
    if (!page) return;
    
    page.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== ANCESTORS STORIES PAGE SECTION ==========

// Ancestors Stories Data
const ancestorsStoriesData = [
    {
        // 0: قصص من الماضي
        title: 'قصص من الماضي',
        subtitle: 'قصص حقيقية من حياة الأجداد',
        stories: [
            {
                title: 'قصة أول قافلة حج من نجد إلى مكة',
                story: 'في عام بعيد من أعوام الماضي، عندما كانت الرحلات إلى الحج شاقة وخطرة، قامت أول قافلة حج من منطقة نجد متجهة إلى مكة المكرمة. كان المسافرون يقطعون مئات الكيلومترات على ظهور الإبل، محملين بالمؤن والماء، متحملين حرارة الصحراء وعواصفها. كانت القافلة بقيادة شيخ تجربة من أهل المنطقة، يعرف كل بئر وكل جبل في الطريق. وبعد أسابيع من السفر، وصلوا سالمين إلى مكة، محققين أمنية كل مسلم.',
                moral: 'القيمة المستفادة: الصبر والإصرار على تحقيق الأهداف مهما كانت الصعوبات.'
            },
            {
                title: 'قصة المرأة التي أنقذت قريتها من السيول',
                story: 'في إحدى القرى النجدية، لاحظت امرأة عجوز من أذكى نساء القرية علامات تدل على اقتراب سيل عظيم. استمعت إلى صوت الرياح ودرست حركة الغيوم، ثم أخذت تحذر جيرانها من الخطر القادم. في البداية لم يصدقها أحد، لكن إصرارها جعلهم يأخذون احتياطاتهم. نقلوا ممتلكاتهم إلى أماكن مرتفعة وأعدوا أنفسهم. وعندما جاء السيل فعلاً، كانت القرية جاهزة، وأنقذت حكمة هذه المرأة كل سكان القرية من كارثة محققة.',
                moral: 'القيمة المستفادة: الحكمة والملاحظة يمكن أن تنقذ حياة الكثيرين.'
            },
            {
                title: 'قصة الرجل الذي صنع أول بئر في الصحراء',
                story: 'كان هناك رجل من أهل الصحراء، رأى أن قومه يعانون من شح الماء. قرر أن يحفر بئراً في مكان يعتقد أنه يحتوي على ماء. بدأ الحفر بمفرده، يوماً بعد يوم، شهراً بعد شهر. تعرض للاستهزاء من بعض الناس، لكنه لم ييأس. وبعد عام كامل من العمل الشاق، وصل إلى الماء، وأصبح البئر مصدراً للحياة لكل من حوله. سمي البئر باسمه، وأصبحت المنطقة مزدهرة بفضل مثابرته.',
                moral: 'القيمة المستفادة: التعاون والعمل الجماعي يحقق النجاح والازدهار.'
            }
        ]
    },
    {
        // 1: أبطال من أرض الوطن
        title: 'أبطال من أرض الوطن',
        subtitle: 'فرسان وقادة ساهموا في بناء الوطن',
        heroes: [
            {
                name: 'الفارس عبدالله بن صالح',
                region: 'الرياض - نجد',
                role: 'قائد قبيلة وفارس شجاع',
                description: 'كان من أبرز فرسان المنطقة الشمالية، قاد العديد من المعارك الدفاعية عن القبائل والمناطق. اشتهر بكرمه وحكمته في حل النزاعات.',
                achievements: ['قيادة دفاع عن منطقة الرياض', 'تأسيس أول مجلس للقبائل', 'المساهمة في توحيد القبائل']
            },
            {
                name: 'الشيخ محمد العلي',
                region: 'الدرعية',
                role: 'حاكم محلي ومصلح اجتماعي',
                description: 'كان من وجهاء الدرعية، عمل على تطوير التعليم والزراعة في منطقته. أسس مدرسة لتعليم الأطفال القرآن والعلوم.',
                achievements: ['تأسيس نظام تعليمي محلي', 'تطوير الزراعة في المنطقة', 'بناء مسجد ومدرسة']
            },
            {
                name: 'الأميرة عائشة بنت أحمد',
                region: 'جدة - الحجاز',
                role: 'رائدة في التعليم النسائي',
                description: 'كانت من النساء اللواتي ساهمن في تعليم النساء في منطقة الحجاز. أسست داراً لتعليم الفتيات القراءة والكتابة والحرف اليدوية.',
                achievements: ['تأسيس أول مدرسة نسائية', 'تعليم الحرف اليدوية', 'المساهمة في نشر التعليم']
            }
        ]
    },
    {
        // 2: شاركنا قصة جدّك
        title: 'شاركنا قصة جدّك',
        subtitle: 'كن راوٍ للتراث واحكِ قصة جدك',
        form: {
            title: 'احكِ لنا قصة من تراث عائلتك',
            fields: [
                { type: 'text', name: 'name', label: 'اسمك', placeholder: 'أدخل اسمك' },
                { type: 'email', name: 'email', label: 'البريد الإلكتروني', placeholder: 'your@email.com' },
                { type: 'text', name: 'storyTitle', label: 'عنوان القصة', placeholder: 'عنوان قصتك' },
                { type: 'textarea', name: 'story', label: 'القصة', placeholder: 'اكتب القصة هنا...', rows: 8 },
                { type: 'file', name: 'image', label: 'صورة (اختياري)', accept: 'image/*' },
                { type: 'file', name: 'audio', label: 'تسجيل صوتي (اختياري)', accept: 'audio/*' }
            ],
            submitText: 'إرسال القصة'
        },
        submittedStories: [
            {
                author: 'أحمد محمد',
                title: 'قصة جدّي والجمل الذكي',
                story: 'كان لجدّي جمل ذكي جداً...',
                date: '2024-01-15'
            }
        ]
    },
    {
        // 4: أمثال من جدّاتنا
        title: 'أمثال من جدّاتنا',
        subtitle: 'أمثال شعبية ومعانيها',
        proverbs: [
            {
                proverb: 'اللي ما يعرفك ما يثمنك',
                meaning: 'من لا يعرفك جيداً لن يقدر قيمتك الحقيقية',
                story: 'مثل يقال عندما لا يقدر شخص قيمتك بسبب عدم معرفته بك جيداً. القصة: كان هناك رجل كريم مشهور في قريته، لكن عندما ذهب إلى قرية أخرى، لم يعرفه أحد فعاملوه بشكل عادي. عندما عادوا إلى قريته، قالوا له: "اللي ما يعرفك ما يثمنك".',
                region: 'نجد'
            },
            {
                proverb: 'الصبر مفتاح الفرج',
                meaning: 'الصبر يؤدي إلى حل المشاكل',
                story: 'مثل شائع يعبر عن أهمية الصبر في مواجهة المصاعب. كان هناك فلاح صبور يعمل في أرضه لسنوات دون يأس، وفي النهاية حصد أفضل المحاصيل.',
                region: 'الحجاز'
            },
            {
                proverb: 'اليد الواحدة ما تصفق',
                meaning: 'التعاون ضروري لتحقيق النجاح',
                story: 'مثل يعبر عن أهمية التعاون. قصة: حاول رجل بناء بيت بمفرده، لكنه فشل. عندما طلب مساعدة جيرانه، تم بناء البيت بسرعة ونجاح.',
                region: 'عسير'
            },
            {
                proverb: 'الطيور على أشكالها تقع',
                meaning: 'الناس يتجمعون مع من يشبهونهم',
                story: 'مثل يقال عند ملاحظة تجمع الأشخاص المتشابهين. كان هناك مجموعة من الأصدقاء كلهم متعلمون ومثقفون، فقال الناس: "الطيور على أشكالها تقع".',
                region: 'الرياض'
            }
        ]
    }
];

function openAncestorsStoriesPage() {
    const loadingScreen = document.getElementById('ancestorsStoriesLoading');
    const storiesPage = document.getElementById('ancestorsStoriesPage');
    
    if (!loadingScreen || !storiesPage) return;
    
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        
        setTimeout(() => {
            storiesPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate cards entrance
            const cards = document.querySelectorAll('.ancestor-story-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, (index + 1) * 100);
            });
        }, 300);
    }, 2500);
}

function closeAncestorsStoriesPage() {
    const storiesPage = document.getElementById('ancestorsStoriesPage');
    if (!storiesPage) return;
    
    const cards = document.querySelectorAll('.ancestor-story-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-50px)';
        }, index * 50);
    });
    
    setTimeout(() => {
        storiesPage.classList.remove('active');
        document.body.style.overflow = '';
        
        cards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
        });
    }, 500);
}

function openStorySection(index) {
    const modal = document.getElementById('storySectionModal');
    const content = document.getElementById('storySectionContent');
    
    if (!modal || !content || !ancestorsStoriesData[index]) return;
    
    const sectionData = ancestorsStoriesData[index];
    let htmlContent = '';
    
    // Build content based on section type
    switch(index) {
        case 0: // قصص من الماضي
            htmlContent = `
                <div class="story-section-header">
                    <h2>${sectionData.title}</h2>
                    <p>${sectionData.subtitle}</p>
                </div>
                <div class="stories-list">
                    ${sectionData.stories.map((story, i) => `
                        <div class="story-item">
                            <div class="story-number">${i + 1}</div>
                            <h3>${story.title}</h3>
                            <p class="story-text">${story.story}</p>
                            <div class="story-moral">
                                <span class="moral-icon">💡</span>
                                <span class="moral-text">${story.moral}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 1: // أبطال من أرض الوطن
            htmlContent = `
                <div class="story-section-header">
                    <h2>${sectionData.title}</h2>
                    <p>${sectionData.subtitle}</p>
                </div>
                <div class="heroes-list">
                    ${sectionData.heroes.map((hero, i) => `
                        <div class="hero-card">
                            <div class="hero-icon">⭐</div>
                            <h3>${hero.name}</h3>
                            <div class="hero-region">📍 ${hero.region}</div>
                            <div class="hero-role">${hero.role}</div>
                            <p class="hero-description">${hero.description}</p>
                            <div class="hero-achievements">
                                <h4>إنجازات:</h4>
                                <ul>
                                    ${hero.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 2: // شاركنا قصة جدّك
            htmlContent = `
                <div class="story-section-header">
                    <h2>${sectionData.title}</h2>
                    <p>${sectionData.subtitle}</p>
                </div>
                <div class="story-submit-form">
                    <h3>${sectionData.form.title}</h3>
                    <form id="storySubmitForm" onsubmit="submitStory(event)">
                        ${sectionData.form.fields.map(field => `
                            <div class="form-group">
                                <label>${field.label}</label>
                                ${field.type === 'textarea'
                                    ? `<textarea name="${field.name}" placeholder="${field.placeholder}" rows="${field.rows || 4}" required></textarea>`
                                    : field.type === 'file'
                                    ? `<input type="${field.type}" name="${field.name}" accept="${field.accept}" ${field.required ? 'required' : ''}>`
                                    : `<input type="${field.type}" name="${field.name}" placeholder="${field.placeholder}" required>`
                                }
                            </div>
                        `).join('')}
                        <button type="submit" class="submit-story-btn">${sectionData.form.submitText}</button>
                    </form>
                </div>
            `;
            break;
            
        case 3: // أمثال من جدّاتنا
            htmlContent = `
                <div class="story-section-header">
                    <h2>${sectionData.title}</h2>
                    <p>${sectionData.subtitle}</p>
                </div>
                <div class="proverbs-list">
                    ${sectionData.proverbs.map((proverb, i) => `
                        <div class="proverb-item">
                            <div class="proverb-icon">💬</div>
                            <h3 class="proverb-text">"${proverb.proverb}"</h3>
                            <div class="proverb-meaning">
                                <strong>المعنى:</strong> ${proverb.meaning}
                            </div>
                            <div class="proverb-story">
                                <strong>القصة:</strong> ${proverb.story}
                            </div>
                            <div class="proverb-region">📍 ${proverb.region}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }
    
    content.innerHTML = htmlContent;
    modal.classList.add('active');
    
    // Play sound
    playHeritageItemSound();
}

function closeStorySection() {
    const modal = document.getElementById('storySectionModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ========== CONTACT FORM EMAIL ==========
function sendEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // Create mailto link with encoded subject and body
    const subject = encodeURIComponent('رسالة جديدة من موقع أصالـة - Asalah');
    const body = encodeURIComponent(
        `الاسم: ${name}\n` +
        `البريد الإلكتروني: ${email}\n\n` +
        `الرسالة:\n${message}`
    );
    
    const mailtoLink = `mailto:asalahdaralahfad@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('تم فتح برنامج البريد الإلكتروني. يرجى إرسال الرسالة من هناك.');
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Pending Stories Storage
function getPendingStories() {
    const stored = localStorage.getItem('pendingStories');
    return stored ? JSON.parse(stored) : [];
}

function savePendingStory(story) {
    const pendingStories = getPendingStories();
    const newStory = {
        ...story,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    pendingStories.push(newStory);
    localStorage.setItem('pendingStories', JSON.stringify(pendingStories));
    return newStory.id;
}

function submitStory(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const storyData = {
        name: formData.get('name'),
        email: formData.get('email'),
        storyTitle: formData.get('storyTitle'),
        story: formData.get('story'),
        imageFile: formData.get('image') ? formData.get('image').name : null,
        audioFile: formData.get('audio') ? formData.get('audio').name : null
    };
    
    // حفظ القصة في localStorage
    const storyId = savePendingStory(storyData);
    
    // إنشاء رابط الموافقة والرفض
    let basePath = window.location.pathname;
    // إذا كان الملف في مجلد فرعي
    if (basePath.includes('/') && basePath.split('/').length > 2) {
        basePath = basePath.substring(0, basePath.lastIndexOf('/'));
    } else {
        basePath = '';
    }
    const approvalUrl = `${window.location.origin}${basePath}/approve-story.html?id=${storyId}&action=approve`;
    const rejectUrl = `${window.location.origin}${basePath}/approve-story.html?id=${storyId}&action=reject`;
    
    // تشفير بيانات القصة في الروابط (base64)
    const storyDataEncoded = btoa(JSON.stringify(storyData));
    const approvalUrlWithData = `${approvalUrl}&data=${encodeURIComponent(storyDataEncoded)}`;
    const rejectUrlWithData = `${rejectUrl}&data=${encodeURIComponent(storyDataEncoded)}`;
    
    // إعداد محتوى البريد الإلكتروني مع HTML للأزرار
    const emailSubject = encodeURIComponent('قصة جديدة تحتاج موافقتك ✨');
    const emailBody = encodeURIComponent(
        `السلام عليكم ورحمة الله وبركاته\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📖 قصة جديدة تحتاج لموافقتك\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 الاسم: ${storyData.name}\n` +
        `📧 البريد: ${storyData.email}\n` +
        `📝 العنوان: ${storyData.storyTitle}\n\n` +
        `📖 القصة:\n${storyData.story}\n\n` +
        `${storyData.imageFile ? `🖼️ الصورة: ${storyData.imageFile}\n` : ''}` +
        `${storyData.audioFile ? `🎙️ التسجيل: ${storyData.audioFile}\n` : ''}` +
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `✅ للموافقة وإضافة القصة للموقع:\n` +
        `${approvalUrlWithData}\n\n` +
        `❌ لرفض القصة:\n` +
        `${rejectUrlWithData}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `ملاحظة: اضغط على الرابط المناسب للموافقة أو الرفض`
    );
    
    // فتح بريد إلكتروني للإرسال
    const mailtoLink = `mailto:asalahdaralahfad@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // محاولة فتح البريد
    try {
        window.location.href = mailtoLink;
    } catch (e) {
        console.error('خطأ في فتح البريد:', e);
    }
    
    // رسالة للمستخدم
    setTimeout(() => {
        alert(
            '✅ تم حفظ قصتك!\n\n' +
            'سيتم فتح بريدك الإلكتروني الآن.\n' +
            'أرسل البريد إلى: asalahdaralahfad@gmail.com\n\n' +
            '📧 البريد يحتوي على:\n' +
            '• تفاصيل القصة\n' +
            '• رابط ✅ للموافقة\n' +
            '• رابط ❌ للرفض'
        );
        
        event.target.reset();
    }, 500);
}

// دالة لإضافة القصة المعتمدة
function approveStory(storyId) {
    const pendingStories = getPendingStories();
    const storyIndex = pendingStories.findIndex(s => s.id === storyId);
    
    if (storyIndex === -1) {
        alert('القصة غير موجودة!');
        return;
    }
    
    const story = pendingStories[storyIndex];
    
    // إضافة القصة إلى القصص المعتمدة
    const approvedStories = getApprovedStories();
    approvedStories.push({
        author: story.name,
        title: story.storyTitle,
        story: story.story,
        date: story.date
    });
    localStorage.setItem('approvedStories', JSON.stringify(approvedStories));
    
    // حذف القصة من المعلقة
    pendingStories.splice(storyIndex, 1);
    localStorage.setItem('pendingStories', JSON.stringify(pendingStories));
    
    alert('تمت الموافقة على القصة وإضافتها إلى الموقع!');
    
    // تحديث العرض إذا كانت الصفحة مفتوحة
    updateSubmittedStoriesDisplay();
}

// دالة لرفض القصة
function rejectStory(storyId) {
    const pendingStories = getPendingStories();
    const storyIndex = pendingStories.findIndex(s => s.id === storyId);
    
    if (storyIndex === -1) {
        alert('القصة غير موجودة!');
        return;
    }
    
    // حذف القصة من المعلقة
    pendingStories.splice(storyIndex, 1);
    localStorage.setItem('pendingStories', JSON.stringify(pendingStories));
    
    alert('تم رفض القصة.');
}

// دالة للحصول على القصص المعتمدة
function getApprovedStories() {
    const stored = localStorage.getItem('approvedStories');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // إرجاع القصص الافتراضية
    return [
        {
            author: 'أحمد محمد',
            title: 'قصة جدّي والجمل الذكي',
            story: 'كان لجدّي جمل ذكي جداً...',
            date: '2024-01-15'
        }
    ];
}

// تحديث عرض القصص المقدمة
function updateSubmittedStoriesDisplay() {
    const submittedStoriesDiv = document.getElementById('submittedStoriesContainer');
    if (!submittedStoriesDiv) return;
    
    const approvedStories = getApprovedStories();
    const storiesHTML = approvedStories.map(story => `
        <div class="submitted-story">
            <h4>${story.title}</h4>
            <p class="story-author">بواسطة: ${story.author}</p>
            <p class="story-content">${story.story}</p>
            <div class="story-date">📅 ${story.date}</div>
        </div>
    `).join('');
    
    submittedStoriesDiv.innerHTML = `
        <h3>القصص المعتمدة</h3>
        ${storiesHTML || '<p style="text-align: center; color: #999; padding: 20px;">لا توجد قصص معتمدة بعد</p>'}
    `;
}

// ========== MOBILE MENU FUNCTION ==========
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;
    
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== GO TO HOME FUNCTION ==========
function goToHome() {
    // Close all open pages/modal
    const heritagePage = document.getElementById('heritagePage');
    const heroesPage = document.getElementById('heroesPage');
    const anthemsPage = document.getElementById('anthemsPage');
    const entertainmentPage = document.getElementById('entertainmentPage');
    const poetryLibrary = document.getElementById('poetryLibraryPage');
    const poetryBooks = document.getElementById('poetryBooksModal');
    const heritageOptions = document.getElementById('heritageOptionsModal');
    const heritageInternal = document.getElementById('heritageInternalPage');
    const contactPage = document.getElementById('contactPage');
    
    if (heritagePage && heritagePage.classList.contains('active')) {
        closeHeritagePage();
    }
    if (heroesPage && heroesPage.classList.contains('active')) {
        closeHeroesPage();
    }
    if (anthemsPage && anthemsPage.classList.contains('active')) {
        closeAnthemsPage();
    }
    if (entertainmentPage && entertainmentPage.classList.contains('active')) {
        closeEntertainmentPage();
    }
    if (poetryLibrary && poetryLibrary.classList.contains('active')) {
        closePoetryLibrary();
        return;
    }
    if (poetryBooks && poetryBooks.classList.contains('active')) {
        closePoetryBooks();
    }
    if (heritageOptions && heritageOptions.classList.contains('active')) {
        closeHeritageOptions();
    }
    if (heritageInternal && heritageInternal.classList.contains('active')) {
        closeHeritageInternalPage();
    }
    if (contactPage && contactPage.classList.contains('active')) {
        closeContactPage();
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== CONTACT PAGE SECTION ==========
function openContactPage() {
    const loadingScreen = document.getElementById('contactLoading');
    const contactPage = document.getElementById('contactPage');
    
    if (!loadingScreen || !contactPage) return;
    
    // Show loading screen
    loadingScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Simulate loading (2-3 seconds)
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.remove('active');
        
        // Show contact page with animation
        setTimeout(() => {
            contactPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate cards entrance
            const cards = document.querySelectorAll('.contact-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, (index + 1) * 100);
            });
        }, 300);
    }, 2500);
}

function closeContactPage() {
    const contactPage = document.getElementById('contactPage');
    if (!contactPage) return;
    
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-50px)';
        }, index * 50);
    });
    
    setTimeout(() => {
        contactPage.classList.remove('active');
        document.body.style.overflow = '';
        
        cards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
        });
    }, 500);
}

// ========== AUTHENTICATION SYSTEM ==========

// Initialize authentication database
function initAuthDatabase() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// Get all users
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save user
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if username exists
function usernameExists(username) {
    const users = getUsers();
    return users.some(user => user.username.toLowerCase().trim() === username.toLowerCase().trim());
}

// Verify credentials
function verifyCredentials(username, password) {
    const users = getUsers();
    return users.find(user => user.username.toLowerCase().trim() === username.toLowerCase().trim() && user.password === password);
}

// Open auth modal
function openAuthModal() {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userProfile = document.getElementById('userProfile');
    
    if (!modal) return;
    
    initAuthDatabase();
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showUserProfile(currentUser);
    } else {
        showLoginForm();
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    
    // Load remembered user
    loadRememberedUser();
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
    clearAuthForms();
}

// Switch to login form
function switchToLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userProfile = document.getElementById('userProfile');
    
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (userProfile) userProfile.style.display = 'none';
    
    clearAuthForms();
}

// Switch to register form
function switchToRegister() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userProfile = document.getElementById('userProfile');
    
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';
    
    clearAuthForms();
}

// Show login form
function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userProfile = document.getElementById('userProfile');
    
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
    if (userProfile) userProfile.style.display = 'none';
}

// Show user profile
function showUserProfile(username) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userProfile = document.getElementById('userProfile');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileUsername = document.getElementById('profileUsername');
    const profileUsernameValue = document.getElementById('profileUsernameValue');
    const profileCreatedDate = document.getElementById('profileCreatedDate');
    
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (userProfile) userProfile.style.display = 'block';
    
    const users = getUsers();
    const user = users.find(u => u.username === username);
    
    // Set avatar with first letter of username
    if (profileAvatar && username) {
        const firstLetter = username.charAt(0).toUpperCase();
        profileAvatar.textContent = firstLetter;
    }
    if (profileUsername) profileUsername.textContent = username;
    if (profileUsernameValue) profileUsernameValue.textContent = username;
    if (profileCreatedDate && user) {
        const date = new Date(user.createdAt);
        profileCreatedDate.textContent = date.toLocaleDateString('ar-SA');
    }
}

// Clear auth forms
function clearAuthForms() {
    // Clear login form
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) loginForm.reset();
    
    // Clear register form
    const registerForm = document.getElementById('registerFormElement');
    if (registerForm) registerForm.reset();
    
    // Clear error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
    
    // Clear success messages
    const successMessages = document.querySelectorAll('.success-message');
    successMessages.forEach(msg => msg.textContent = '');
    
    // Hide icons
    const successIcons = document.querySelectorAll('.input-success-icon');
    successIcons.forEach(icon => icon.style.display = 'none');
    
    const errorIcons = document.querySelectorAll('.input-error-icon');
    errorIcons.forEach(icon => icon.style.display = 'none');
    
    // Hide password strength
    const passwordStrength = document.getElementById('passwordStrength');
    if (passwordStrength) passwordStrength.style.display = 'none';
    
    // Hide user profile
    const userProfile = document.getElementById('userProfile');
    if (userProfile) userProfile.style.display = 'none';
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear error message
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Add input error
function addInputError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    const errorIcon = document.getElementById(inputId + 'ErrorIcon');
    
    if (input) {
        input.style.borderColor = '#ff4444';
    }
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (errorIcon) {
        errorIcon.style.display = 'block';
    }
}

// Remove input error
function removeInputError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    const errorIcon = document.getElementById(inputId + 'ErrorIcon');
    
    if (input) {
        input.style.borderColor = '';
    }
    if (errorElement) {
        errorElement.textContent = '';
    }
    if (errorIcon) {
        errorIcon.style.display = 'none';
    }
}

// Add input success
function addInputSuccess(inputId) {
    const input = document.getElementById(inputId);
    const successIcon = document.getElementById(inputId + 'SuccessIcon');
    
    if (input) {
        input.style.borderColor = '#00ff88';
    }
    if (successIcon) {
        successIcon.style.display = 'block';
    }
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(inputId + 'Eye');
    
    if (input && eye) {
        if (input.type === 'password') {
            input.type = 'text';
            eye.classList.remove('fa-eye');
            eye.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            eye.classList.remove('fa-eye-slash');
            eye.classList.add('fa-eye');
        }
    }
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('registerPassword')?.value || '';
    const strengthBar = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (!strengthContainer || !strengthBar || !strengthText) return;
    
    if (password.length === 0) {
        strengthContainer.style.display = 'none';
        return;
    }
    
    strengthContainer.style.display = 'block';
    
    let strength = 0;
    let strengthLabel = '';
    let strengthColor = '';
    
    if (password.length >= 4) strength += 1;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) || /[أ-ي]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength <= 2) {
        strengthLabel = 'ضعيف';
        strengthColor = '#ff4444';
    } else if (strength <= 4) {
        strengthLabel = 'متوسط';
        strengthColor = '#ffaa00';
    } else {
        strengthLabel = 'قوي';
        strengthColor = '#00ff88';
    }
    
    strengthBar.style.width = `${(strength / 6) * 100}%`;
    strengthBar.style.backgroundColor = strengthColor;
    strengthText.textContent = strengthLabel;
    strengthText.style.color = strengthColor;
}

// Check password match
function checkPasswordMatch() {
    const password = document.getElementById('registerPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';
    const errorElement = document.getElementById('confirmPasswordError');
    const successIcon = document.getElementById('confirmPasswordSuccessIcon');
    const input = document.getElementById('confirmPassword');
    
    if (confirmPassword.length === 0) {
        if (errorElement) errorElement.textContent = '';
        if (successIcon) successIcon.style.display = 'none';
        if (input) input.style.borderColor = '';
        return;
    }
    
    if (password === confirmPassword) {
        if (errorElement) errorElement.textContent = '';
        if (successIcon) successIcon.style.display = 'block';
        if (input) input.style.borderColor = '#00ff88';
    } else {
        if (errorElement) errorElement.textContent = 'كلمات المرور غير متطابقة';
        if (successIcon) successIcon.style.display = 'none';
        if (input) input.style.borderColor = '#ff4444';
    }
}

// Validate username in real-time
function validateUsernameRealTime() {
    const usernameInput = document.getElementById('registerUsername');
    const username = usernameInput?.value.trim() || '';
    const errorElement = document.getElementById('registerUsernameError');
    const errorIcon = document.getElementById('registerUsernameErrorIcon');
    const successIcon = document.getElementById('registerUsernameSuccessIcon');
    
    if (!usernameInput || !errorElement) return true;
    
    // Clear previous states
    removeInputError('registerUsername');
    
    if (username.length === 0) {
        return false;
    }
    
    if (username.length < 3) {
        addInputError('registerUsername', 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
        return false;
    }
    
    if (usernameExists(username)) {
        errorElement.textContent = 'اسم المستخدم موجود بالفعل';
        if (errorIcon) errorIcon.style.display = 'block';
        usernameInput.style.borderColor = '#ff4444';
        return false;
    }
    
    // Username is valid
    addInputSuccess('registerUsername');
    return true;
}

// Show success message
function showSuccessMessage(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }
}

// Set button loading state
function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (isLoading) {
        button.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
    } else {
        button.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

// Save remember me
function saveRememberMe(username) {
    const rememberMe = document.getElementById('rememberMe');
    if (rememberMe && rememberMe.checked) {
        localStorage.setItem('rememberedUser', username);
    } else {
        localStorage.removeItem('rememberedUser');
    }
}

// Load remembered user
function loadRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    const usernameInput = document.getElementById('loginUsername');
    
    if (rememberedUser && usernameInput) {
        usernameInput.value = rememberedUser;
        const rememberMe = document.getElementById('rememberMe');
        if (rememberMe) rememberMe.checked = true;
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername')?.value.trim() || '';
    const password = document.getElementById('loginPassword')?.value || '';
    
    // Clear previous errors
    clearError('loginUsernameError');
    clearError('loginPasswordError');
    
    // Validate inputs
    if (!username) {
        showError('loginUsernameError', 'يرجى إدخال اسم المستخدم');
        return;
    }
    
    if (!password) {
        showError('loginPasswordError', 'يرجى إدخال كلمة المرور');
        return;
    }
    
    // Set loading state
    setButtonLoading('loginBtn', true);
    
    // Simulate API delay
    setTimeout(() => {
        const user = verifyCredentials(username, password);
        
        if (user) {
            // Save current user
            localStorage.setItem('currentUser', user.username);
            
            // Save remember me
            saveRememberMe(username);
            
            // Show success message
            showSuccessMessage('loginSuccessMessage', 'تم تسجيل الدخول بنجاح!');
            
            // Update user display
            updateUserDisplay();
            
            // Show profile after delay
            setTimeout(() => {
                showUserProfile(user.username);
                setButtonLoading('loginBtn', false);
            }, 1000);
        } else {
            setButtonLoading('loginBtn', false);
            showError('loginPasswordError', 'اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    }, 800);
}

// Handle register
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername')?.value.trim() || '';
    const password = document.getElementById('registerPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';
    
    // Clear previous errors
    clearError('registerUsernameError');
    clearError('registerPasswordError');
    clearError('confirmPasswordError');
    
    // Validate username
    if (!validateUsernameRealTime()) {
        return;
    }
    
    if (usernameExists(username)) {
        showError('registerUsernameError', 'اسم المستخدم موجود بالفعل');
        addInputError('registerUsername', '');
        return;
    }
    
    // Validate password
    if (password.length < 4) {
        showError('registerPasswordError', 'كلمة المرور يجب أن تكون 4 أحرف على الأقل');
        return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'كلمات المرور غير متطابقة');
        return;
    }
    
    // Set loading state
    setButtonLoading('registerBtn', true);
    
    // Simulate API delay
    setTimeout(() => {
        // Create user
        const newUser = {
            username: username,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        // Save user
        saveUser(newUser);
        
        // Auto login
        localStorage.setItem('currentUser', username);
        
        // Show success message
        showSuccessMessage('registerSuccessMessage', 'تم إنشاء الحساب بنجاح!');
        
        // Update user display
        updateUserDisplay();
        
        // Show profile after delay
        setTimeout(() => {
            showUserProfile(username);
            setButtonLoading('registerBtn', false);
        }, 1000);
    }, 800);
}

// Update user display
function updateUserDisplay() {
    const currentUser = localStorage.getItem('currentUser');
    const userIcon = document.querySelector('.fa-user');
    
    if (currentUser && userIcon) {
        userIcon.title = `مرحباً ${currentUser}`;
    }
}

// Check logged in user
function checkLoggedInUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateUserDisplay();
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    updateUserDisplay();
    closeAuthModal();
    setTimeout(() => {
        openAuthModal();
    }, 300);
}

// Initialize on page load
initAuthDatabase();
checkLoggedInUser();

// Close auth modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const authModal = document.getElementById('authModal');
        if (authModal && authModal.classList.contains('active')) {
            closeAuthModal();
        }
    }
});

// Close auth modal when clicking outside
document.addEventListener('click', (e) => {
    const authModal = document.getElementById('authModal');
    if (authModal && e.target === authModal) {
        closeAuthModal();
    }
});
