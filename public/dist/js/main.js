!(function () {
    window;
    const e = document.documentElement;
    if ((e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations"))) {
        (window.sr = ScrollReveal()).reveal(".feature, .pricing-table-inner", { duration: 600, distance: "20px", easing: "cubic-bezier(0.5, -0.01, 0, 1.005)", origin: "bottom", interval: 100 }),
            e.classList.add("anime-ready"),
            anime
                .timeline({ targets: ".hero-figure-box-05" })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
                .add({ duration: 800, rotateY: "-15deg", rotateX: "8deg", rotateZ: "-1deg" }),
            anime
                .timeline({ targets: ".hero-figure-box-06, .hero-figure-box-07" })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: [0.05, 0.05], scaleY: [0, 1], perspective: "500px", delay: anime.random(0, 400) })
                .add({ duration: 400, easing: "easeInOutExpo", scaleX: 1 })
                .add({ duration: 800, rotateZ: "20deg" }),
            anime({
                targets: ".hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10",
                duration: anime.random(600, 800),
                delay: anime.random(600, 800),
                rotate: [
                    anime.random(-360, 360),
                    function (e) {
                        return e.getAttribute("data-rotation");
                    },
                ],
                scale: [0.7, 1],
                opacity: [0, 1],
                easing: "easeInOutExpo",
            });
    }

    /**
    * Easy selector helper function
    */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Event handler function
     */
    const on = (type, selector, callback, all = false) => {
        const target = all ? document.querySelectorAll(selector) : document.querySelector(selector);
        if (target) {
            if (all) {
                target.forEach(item => item.addEventListener(type, callback));
            } else {
                target.addEventListener(type, callback);
            }
        }
    };

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        let portfolioIsotope = null;

        if (portfolioContainer) {
            portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });
        }

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function (e) {
            e.preventDefault();
            portfolioFilters.forEach(function (el) {
                el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            if (portfolioIsotope) {
                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            }

        }, true);
    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    // ENVIO DE EMAIL
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.querySelector(".php-email-form");
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    if (data.ok) {
                        form.reset();
                        showMessage("sent-message", "Your message has been sent. We will respond as soon as possible.");
                    } else {
                        // showMessage("error-message", "Error sending your message. Please try again.");
                    }
                })
                .catch(function (error) {
                    // showMessage("error-message", "Error sending your message. Please try again.");
                });
        });

        function showMessage(className, message) {
            var messageContainer = document.querySelector("." + className);
            messageContainer.innerHTML = message;
            messageContainer.style.display = "block";
        }
    });

    //PORTFOLIO ITEM TRANSITION
    document.addEventListener("DOMContentLoaded", function () {
        var portfolioItems = document.querySelectorAll(".portfolio-item");

        function checkVisibility() {
            portfolioItems.forEach(function (item) {
                if (isElementInViewport(item)) {
                    item.classList.add("active");
                }
            });
        }

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Verifica la visibilidad al cargar la página
        checkVisibility();

        // Verifica la visibilidad al hacer scroll
        window.addEventListener("scroll", checkVisibility);
    });

    //EFECTO MAQUINA DE ESCRIBIR
    // const text = "Web page design and development";
    // let index = 0;

    // function typeWriter() {
    //     document.getElementById('typewriter-text').innerHTML += text.charAt(index);
    //     index++;
    //     if (index < text.length) {
    //         setTimeout(typeWriter, 30);
    //     }
    // }

    // typeWriter();

    //TIMELINE
    $(document).ready(function () {
        function showVisibleCards() {
            $('.card-timeline.timeline-inner').each(function () {
                var $card = $(this);
                if (isElementInViewport($card) && !$card.hasClass('visible')) {
                    $card.addClass('visible');
                }
            });
        }

        function isElementInViewport(element) {
            var rect = element[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        showVisibleCards();

        $(window).on('scroll resize', showVisibleCards);
    });
})();
