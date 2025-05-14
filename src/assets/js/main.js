(function ($) {
  'use strict';

  // Navbar Menu JS
  $('.navbar .navbar-nav li a, .down_arrow .scroll_down, .cta-area .btn').on(
    'click',
    function (e) {
      var anchor = $(this);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr('href')).offset().top - 50,
          },
          1500
        );
      e.preventDefault();
    }
  );
  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });
  $('.navbar .navbar-nav li a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Header Sticky
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.navbar-light').addClass('is-sticky');
    } else {
      $('.navbar-light').removeClass('is-sticky');
    }
  });

  // Home Slides
  // $(".home-slides").owlCarousel({
  // 	items: 1,
  // 	nav: true,
  // 	dots: false,
  // 	autoplay: true,
  // 	animateOut: 'slideOutDown',
  // 	animateIn: 'slideInDown',
  // 	smartSpeed: 700,
  // 	loop: true,
  // 	autoHeight: true,
  // 	navText: [
  // 		"<i class='icofont-double-left'></i>",
  // 		"<i class='icofont-double-right'></i>"
  // 	]
  // });
  // $(".home-slides").on("translate.owl.carousel", function(){
  // 	$(".main-banner-content h1").removeClass("animated fadeInUp").css("opacity", "0");
  // 	$(".main-banner-content h3").removeClass("animated zoomIn").css("opacity", "0");
  // 	$(".main-banner-content .btn").removeClass("animated fadeInDown").css("opacity", "0");
  // });
  // $(".home-slides").on("translated.owl.carousel", function(){
  // 	$(".main-banner-content h1").addClass("animated fadeInUp").css("opacity", "1");
  // 	$(".main-banner-content h3").addClass("animated zoomIn").css("opacity", "1");
  // 	$(".main-banner-content .btn").addClass("animated fadeInDown").css("opacity", "1");
  // });

  // Ripple Effect
  $('.ripple-effect, .ripple-playing').ripples({
    resolution: 512,
    dropRadius: 25,
    perturbance: 0.04,
  });

  // Instagram Slides
  //   $('.instagram-slides').owlCarousel({
  //     autoplay: true,
  //     nav: false,
  //     mouseDrag: true,
  //     autoplayHoverPause: true,
  //     responsiveClass: true,
  //     dots: false,
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 2,
  //       },
  //       768: {
  //         items: 4,
  //       },
  //       1200: {
  //         items: 6,
  //       },
  //     },
  //   });

  // Particles Js
  if (document.getElementById('particles-js'))
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#BD10E0', '#B8E986', '#50E3C2', '#FFD300', '#E86363'],
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 4,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'bubble',
          },
          onclick: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  if (document.getElementById('particles-js-2'))
    particlesJS('particles-js-2', {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#BD10E0', '#B8E986', '#50E3C2', '#FFD300', '#E86363'],
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 4,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'bubble',
          },
          onclick: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  if (document.getElementById('particles-js-circle-bubble-1'))
    particlesJS('particles-js-circle-bubble-1', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#BD10E0', '#B8E986', '#50E3C2', '#FFD300', '#E86363'],
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 4,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'bubble',
          },
          onclick: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });

  // Offer Slides
  //   $('.offer-slides').owlCarousel({
  //     autoplay: true,
  //     nav: false,
  //     mouseDrag: true,
  //     autoplayHoverPause: true,
  //     responsiveClass: true,
  //     dots: true,
  //     margin: 30,
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       768: {
  //         items: 2,
  //       },
  //       1200: {
  //         items: 2,
  //       },
  //     },
  //   });

  // Popup Video
  $('.popup-youtube').magnificPopup({
    disableOn: 320,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  // Tabs
  (function ($) {
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
      let tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
      tab.find('ul.tabs > li').removeClass('current');
      $(this).closest('li').addClass('current');
      tab
        .find('.tab_content')
        .find('div.tabs_item')
        .not('div.tabs_item:eq(' + index + ')')
        .slideUp();
      tab
        .find('.tab_content')
        .find('div.tabs_item:eq(' + index + ')')
        .slideDown();
      g.preventDefault();
    });
  })(jQuery);

  // Chefs Slides
  //   $('.chefs-slides').owlCarousel({
  //     autoplay: true,
  //     nav: false,
  //     mouseDrag: true,
  //     margin: 30,
  //     autoplayHoverPause: true,
  //     responsiveClass: true,
  //     dots: true,
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       576: {
  //         items: 2,
  //       },
  //       768: {
  //         items: 2,
  //       },
  //       1200: {
  //         items: 3,
  //       },
  //     },
  //   });

  // Popup Image
  $('.popup-btn').magnificPopup({
    type: 'image',
    removalDelay: 300,
    gallery: {
      enabled: true,
    },
  });

  // Feedback Slides
  //   $('.feedback-slides').owlCarousel({
  //     autoplay: true,
  //     nav: false,
  //     mouseDrag: true,
  //     autoplayHoverPause: true,
  //     margin: 30,
  //     responsiveClass: true,
  //     dots: true,
  //     items: 1,
  //     animateOut: 'fadeOut',
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //   });

  // Brand Slides
  //   $('.partner-slides').owlCarousel({
  //     nav: false,
  //     dots: false,
  //     loop: true,
  //     autoplayHoverPause: true,
  //     autoplay: true,
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 2,
  //       },
  //       576: {
  //         items: 3,
  //       },
  //       768: {
  //         items: 4,
  //       },
  //       1200: {
  //         items: 7,
  //       },
  //     },
  //   });

  // Blog Slides
  //   $('.blog-slides').owlCarousel({
  //     autoplay: true,
  //     nav: false,
  //     mouseDrag: true,
  //     autoplayHoverPause: true,
  //     responsiveClass: true,
  //     margin: 30,
  //     dots: true,
  //     navText: [
  //       "<i class='icofont-double-left'></i>",
  //       "<i class='icofont-double-right'></i>",
  //     ],
  //     responsive: {
  //       0: {
  //         items: 1,
  //       },
  //       768: {
  //         items: 2,
  //       },
  //       1200: {
  //         items: 3,
  //       },
  //     },
  //   });
})(jQuery);
