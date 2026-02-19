/* ============================================
   Mazumder Family Invitation — Script
   Subtle scroll animations & interactions
   ============================================ */

(function () {
    'use strict';

    // --- Scroll-triggered animations ---
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll(
            '.message-card, .detail-card, .letter-document'
        );

        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything immediately
            animatedElements.forEach(function (el) {
                el.classList.add('animate-in');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // Add stagger delay for detail cards
                        var el = entry.target;
                        if (el.classList.contains('detail-card')) {
                            var cards = document.querySelectorAll('.detail-card');
                            var index = Array.prototype.indexOf.call(cards, el);
                            el.style.transitionDelay = index * 0.15 + 's';
                        }
                        el.classList.add('animate-in');
                        observer.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // --- Smooth scroll for anchor links ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        });
    }

    // --- Initialize ---
    document.addEventListener('DOMContentLoaded', function () {
        initScrollAnimations();
        initSmoothScroll();
    });
})();
