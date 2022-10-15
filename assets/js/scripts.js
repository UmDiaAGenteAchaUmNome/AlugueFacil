(function ($) {
    "use strict";

    /*------------ Navbar --------------*/

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });
    }

    if (navClose) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    }

    /***-------------- Remove Menu Mobile ---------------***/
    const navLink = document.querySelectorAll(".nav_link");

    function linkAction() {
        const navMenu = document.getElementById("nav-menu");
        navMenu.classList.remove("show-menu");
    }

    navLink.forEach((n) => n.addEventListener("click", linkAction));

    /***------------ Change Background Header -----------***/

    function scrollHeader() {
        const header = document.getElementById("header");
        if (this.scrollY >= 50) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
    }
    window.addEventListener("scroll", scrollHeader);

    /**----- Background Image -----**/

    $(".set-bg").each(function () {
        var bg = $(this).data("setbg");
        $(this).css("background-image", "url(" + bg + ")");
    });

    /**----- Property Controls -----**/

    $(window).on("load", function () {
        $(".property-controls li").on("click", function () {
            $(".property-controls li").removeClass("active");
            $(this).addClass("active");
        });
        if ($(".property-filter").length > 0) {
            var containerEl = document.querySelector(".property-filter");
            var mixer = mixitup(containerEl);
        }
    });

    /**----- Home Slider -----**/

    $(".slider-item").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        autoplay: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
        ],
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            767: {
                items: 1,
                nav: false,
            },
            992: {
                items: 1,
            },
        },
    });

    /**----- Testimonial Slider -----**/

    $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: false,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
        ],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
        },
    });

    /**----- Video Popup -----**/

    $(".video-popup").magnificPopup({
        type: "iframe",
        gallery: {
            enabled: true,
        },
    });

    /**----- Slider Pager -----**/

    var sync1 = $("#pager-slider");
    var sync2 = $("#pager-slider-thumb");
    var slidesPerPage = 4;
    var syncedSecondary = true;

    sync1
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: false,
            autoplay: true,
            dots: true,
            loop: true,
            responsiveRefreshRate: 200,
        })
        .on("changed.owl.carousel", syncPosition);

    sync2
        .on("initialized.owl.carousel", function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: true,
            margin: 10,
            smartSpeed: 200,
            slideSpeed: 500,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>',
            ],
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100,
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find(".owl-item.active").length - 1;
        var start = sync2.find(".owl-item.active").first().index();
        var end = sync2.find(".owl-item.active").last().index();

        if (current > end) {
            sync2.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            sync2.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data("owl.carousel").to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data("owl.carousel").to(number, 300, true);
    });
})(jQuery);
