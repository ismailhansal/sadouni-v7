/**
 * Premium GSAP Animations for Dr. Sadouni Ophthalmology Website
 * Medical-grade, calm, and professional motion design
 * Respects prefers-reduced-motion
 */

(function() {
    'use strict';

    // Check for reduced motion preference and mobile device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Only initialize if GSAP is available and user prefers motion
    if (typeof gsap === 'undefined' || prefersReducedMotion) {
        console.log('GSAP animations disabled - library not available or reduced motion preferred');
        return;
    }
    
    // Performance optimization for mobile
    if (isMobile) {
        // Disable some heavy animations on mobile
        document.documentElement.classList.add('mobile-device');
    }

    // Register ScrollTrigger plugin with mobile optimizations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Optimize ScrollTrigger for mobile
        ScrollTrigger.normalizeScroll({
            allowNestedScroll: true,
            ignoreMobileResize: true
        });
        
        // Optimize for mobile
        if (isMobile) {
            // Disable all scroll-based animations on mobile
            ScrollTrigger.saveStyles('.cs_animate_on_scroll');
            ScrollTrigger.matchMedia({
                // Mobile devices
                '(max-width: 767px)': function() {
                    // Disable all scroll triggers on mobile
                    ScrollTrigger.getAll().forEach(t => t.disable());
                    return function() {}; // cleanup
                },
                // Desktop devices
                '(min-width: 768px)': function() {
                    // Re-enable all scroll triggers on desktop
                    ScrollTrigger.getAll().forEach(t => t.enable());
                    return function() {}; // cleanup
                }
            });
        }
        
        // Reduce refresh events
        ScrollTrigger.config({ 
            autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
            // Optimize performance
            ignoreMobileResize: true,
            syncCallbacks: true,
            force3D: false
        });
    }

    // Initialize all animations when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initPremiumAnimations();
    });

    function initPremiumAnimations() {
        try {
            // Only run heavy animations on desktop
            if (!isMobile) {
                multiLayerParallax();
                scrollVelocityParallax();
                pinnedSectionMicroMovements();
                subtlePerspectiveDepth();
                magneticHoverEffect();
            }
            
            // Only run essential animations on mobile
            imageFocusTransition();
            
            // Optimize touch events for mobile
            if (isMobile) {
                optimizeTouchEvents();
            }
        } catch (error) {
            console.error('Error initializing GSAP animations:', error);
        }
    }
    
    // Optimize touch events for mobile
    function optimizeTouchEvents() {
        // Prevent double-tap zoom
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });
        
        // Prevent scroll jank on touch devices
        let touchStartY = 0;
        document.addEventListener('touchstart', function(event) {
            touchStartY = event.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(event) {
            // Prevent scrolling if the user is trying to scroll up at the top of the page
            // or down at the bottom of the page
            if (event.touches[0].clientY < touchStartY && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                event.preventDefault();
            }
            if (event.touches[0].clientY > touchStartY && window.scrollY <= 0) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    /**
     * 1. Multi-layer Parallax Depth
     * Creates depth perception with different scroll speeds
     * Used in hero section for subtle, medical-grade depth
     */
    function multiLayerParallax() {
        const heroSection = document.querySelector('.cs_hero');
        if (!heroSection) return;

        // Skip on mobile for better performance
        if (isMobile) {
            // Only apply a simple fade-in on mobile
            gsap.from(heroSection, {
                opacity: 0.8,
                y: 20,
                duration: 1,
                ease: "power2.out"
            });
            return;
        }

        // Reduced number of parallax elements on mobile
        const parallaxElements = [
            { element: '.cs_hero_content_wrapper', speed: 0.3, mobile: true },
            { element: '.cs_hero_info_box', speed: 0.2, mobile: false },
            { element: '.cs_hero_shape_2', speed: 0.15, mobile: false }
        ];

        parallaxElements.forEach(layer => {
            // Skip non-essential elements on mobile
            if (isMobile && !layer.mobile) return;
            
            const element = document.querySelector(layer.element);
            if (element) {
                gsap.to(element, {
                    yPercent: -30 * layer.speed,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: heroSection,
                        start: "top top",
                        end: "bottom top",
                        scrub: isMobile ? 3.5 : 2.5, // Smoother scrub on mobile
                        invalidateOnRefresh: true,
                        // Optimize performance
                        onUpdate: self => {
                            if (isMobile) {
                                // Skip some updates on mobile for better performance
                                if (Math.random() > 0.7) self.update();
                            }
                        }
                    }
                });
            }
        });

        // Very subtle about section image parallax
        const aboutImages = document.querySelectorAll('.cs_about_thumbnail img');
        aboutImages.forEach((img, index) => {
            gsap.to(img, {
                yPercent: -10 * (index + 1),
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: '.cs_about',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 3
                }
            });
        });
    }

    /**
     * 2. Image Focus Transition
     * Eye-inspired blur to sharp focus effect on scroll
     * Applied to medical imagery with clinical precision
     */
    function imageFocusTransition() {
        const focusImages = document.querySelectorAll('.cs_about_thumbnail_1 img, .cs_testimonial_thumbnail img');
        
        focusImages.forEach(img => {
            // Set initial state - very subtle blur
            gsap.set(img, {
                filter: "blur(1.5px) brightness(0.95)",
                scale: 1.02
            });

            // Animate to focus on scroll - gradual and smooth
            gsap.to(img, {
                filter: "blur(0px) brightness(1)",
                scale: 1,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    end: "center 50%",
                    scrub: 1.5
                }
            });
        });
    }

    /**
     * 3. Scroll Velocity-based Parallax
     * Elements react gently to scroll speed
     * Applied to specialty cards with medical precision
     */
    // Throttle function to limit how often a function can run
    function throttle(func, limit) {
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
    }

    function scrollVelocityParallax() {
        // Skip on mobile for better performance
        if (isMobile) return;
        
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        let ticking = false;
        let velocityHistory = [];
        
        // Throttled scroll handler
        const updateVelocity = () => {
            const currentScrollY = window.scrollY;
            const instantVelocity = Math.abs(currentScrollY - lastScrollY);
            
            velocityHistory.push(instantVelocity);
            if (velocityHistory.length > 5) velocityHistory.shift();
            scrollVelocity = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        // Use requestAnimationFrame for better performance
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateVelocity);
                ticking = true;
            }
        };
        
        // Throttle the scroll event
        window.addEventListener('scroll', throttle(handleScroll, 50), { passive: true });

        // Apply very subtle velocity-based motion to cards
        const velocityElements = document.querySelectorAll('.property-card');
        
        velocityElements.forEach((element, index) => {
            gsap.set(element, {
                transformOrigin: "center center"
            });

            // Create a timeline for smooth velocity reactions
            const velocityTimeline = gsap.timeline({ paused: true });
            
            gsap.to(element, {
                y: () => scrollVelocity * 0.03 * (index % 2 === 0 ? -1 : 1),
                rotation: () => scrollVelocity * 0.005 * (index % 2 === 0 ? -1 : 1),
                duration: 0.6,
                ease: "power2.inOut",
                onUpdate: function() {
                    // Gentle reset when scrolling stops
                    if (scrollVelocity < 0.5) {
                        gsap.to(element, {
                            y: 0,
                            rotation: 0,
                            duration: 0.8,
                            ease: "power2.inOut"
                        });
                    }
                }
            });
        });
    }

    /**
     * 4. Pinned Section with Micro-movements
     * Very subtle floating motion for process cards
     * Medical precision with calm, reassuring movement
     */
    function pinnedSectionMicroMovements() {
        const processCards = document.querySelectorAll('.cs_card.cs_style_5');
        
        processCards.forEach((card, index) => {
            // Extremely subtle floating animation - medical precision
            gsap.to(card, {
                y: "random(-2, 2)",
                rotation: "random(-0.2, 0.2)",
                duration: "random(4, 6)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });

            // Enhanced scroll animation - medical-grade reveal
            gsap.fromTo(card, 
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "bottom 70%",
                        scrub: 1.5
                    }
                }
            );
        });
    }

    /**
     * 5. Subtle Perspective Depth
     * Light 3D translate effects without rotation
     * Applied to sections with medical precision
     */
    function subtlePerspectiveDepth() {
        const depthSections = document.querySelectorAll('.specialites, .cs_testimonial');
        
        depthSections.forEach(section => {
            gsap.set(section, {
                transformPerspective: 1200
            });

            // Very gentle Z-axis movement for depth
            gsap.fromTo(section,
                {
                    z: -50,
                    opacity: 0.9
                },
                {
                    z: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "center 60%",
                        scrub: 2
                    }
                }
            );
        });

        // Apply to info boxes with medical precision
        const infoBoxes = document.querySelectorAll('.cs_info_item');
        infoBoxes.forEach((box, index) => {
            gsap.to(box, {
                z: 25 * (index + 1),
                duration: 2.5,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: box,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2.5
                }
            });
        });
    }

    /**
     * 6. Magnetic Hover Effect (Optional)
     * Applied to primary CTA buttons with medical precision
     * Very subtle magnetic pull for professional feel
     */
    function magneticHoverEffect() {
        const magneticButtons = document.querySelectorAll('.cs_btn.cs_style_1');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Very subtle magnetic effect
                gsap.to(button, {
                    x: x * 0.08,
                    y: y * 0.08,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            });

            button.addEventListener('mouseleave', function() {
                // Smooth return to center
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            });

            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Gentle follow with reduced intensity
                gsap.to(button, {
                    x: x * 0.08,
                    y: y * 0.08,
                    duration: 0.15,
                    ease: "power2.out"
                });
            });
        });
    }

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });

})();
