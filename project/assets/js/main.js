/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Relome - Personal Portfolio HTML Template
* Version  : 1.0
* Author   : Themeland
* Support  : hridoy1272@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Cursor
3. Responsive Menu
4. Navigation
5. Scroll To Top
6. GSAP Smooth Scroll

----------------------------------------------*/

(function ($) {
	"use strict";

	$(document).ready(function () {

		/*----------------------------------------------
		1. Preloader
		----------------------------------------------*/
		const svg = document.getElementById("loader");
		const tl = gsap.timeline();
		const startShape = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
		const endShape = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

		tl.to(".loader-container .loaded", {
			delay: 1.2,
			y: -50,
			opacity: 0,
			duration: 0.6,
		}).to(svg, {
			duration: 0.6,
			attr: { d: startShape },
			ease: "power1.easeIn",
		}).to(svg, {
			duration: 0.6,
			attr: { d: endShape },
			ease: "power1.easeOut",
		}).to(".relome-preloader", {
			y: -1000,
			duration: 0.8,
		}).to(".relome-preloader", {
			zIndex: -1,
			display: "none",
		});

		/*----------------------------------------------
		2. Cursor
		----------------------------------------------*/
		const cursor = document.getElementById('cursor');
		const hoverElements = document.querySelectorAll('a');
		const animateCursor = (props) => {
			if (cursor) {
				gsap.to(cursor, {
					...props,
					duration: 0.3,
					ease: props.ease || 'power2.out'
				});
			}
		};

		// Update cursor position on mouse move
		document.addEventListener('mousemove', (e) => {
			animateCursor({ x: e.clientX, y: e.clientY, opacity: 1 });
		});

		// Add hover effects for specified elements
		const addHoverEffects = (element) => {
			element.addEventListener('mouseenter', () => {
				cursor?.classList.add('hovered');
				animateCursor({ scale: 2, opacity: 0, ease: 0.1 });
			});
			element.addEventListener('mouseleave', () => {
				cursor?.classList.remove('hovered');
				animateCursor({ scale: 1, opacity: 1 });
			});
		};
		hoverElements.forEach(addHoverEffects);

		/*----------------------------------------------
		3. Responsive Menu
		----------------------------------------------*/
		function navResponsive() {
			let navbar = $('.navbar .items');
			let menu = $('#menu .items');
			menu.html('');
			navbar.clone().appendTo(menu);
			$('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
		}
		navResponsive();

		$(window).on('resize', navResponsive);

		// Add a class for dropdowns based on the number of child items
		$('.menu .dropdown-menu').each(function () {
			var children = $(this).children('.dropdown').length;
			$(this).addClass('children-' + children);
		});

		// Add 'prevent' class to nav items with dropdowns
		$('.menu .nav-item.dropdown').each(function () {
			var children = $(this).children('.nav-link');
			children.addClass('prevent');
		});

		// Toggle dropdown menu and rotate icon-arrow-down
		$(document).on('click', '#menu .nav-item .nav-link', function (event) {
			if ($(this).hasClass('prevent')) {
				event.preventDefault();
			}

			var nav_link = $(this);
			var parentNav = nav_link.closest('.nav-item');
			var currentDropdown = nav_link.next('.dropdown-menu');
			var arrowIcon = nav_link.find('.icon-arrow-down');

			parentNav.siblings().find('.dropdown-menu.show').slideUp(300).removeClass('show');
			parentNav.siblings().find('.icon-arrow-down').removeClass('rotate-arrow');
			currentDropdown.slideToggle(300).toggleClass('show');
			arrowIcon.toggleClass('rotate-arrow');

			if (nav_link.hasClass('smooth-anchor')) {
				$('#menu').modal('hide');
			}
		});

		/*----------------------------------------------
		4. Navigation
		----------------------------------------------*/
		var position = $(window).scrollTop();
		var toTop = $('#scroll-to-top');
		var navbar = $('header .navbar');

		var relome_vars = {
			homeUrl: window.location.origin + window.location.pathname.replace(/[^\/]*$/, '')
		};

		toTop.hide();

		$(window).on('scroll', function () {
			let scroll = $(window).scrollTop();
			if (!navbar.hasClass('relative')) {
				if (scroll > position) {
					if (window.screen.width >= 767) {
						navbar.fadeOut('fast');
					} else {
						navbar.addClass('navbar-sticky');
					}
					toTop.fadeOut('fast');
				} else {
					if (position < 76) {
						navbar.slideDown('fast').removeClass('navbar-sticky');
					} else {
						navbar.slideDown('fast').addClass('navbar-sticky');
					}
					if (position > 1023 && window.screen.width >= 767) {
						toTop.fadeIn('fast');
					} else {
						toTop.fadeOut('fast');
					}
				}
				position = scroll;
			}
		});

		$('.nav-link').each(function () {
			let href = $(this).attr('href');

			if (href && href.length > 1 && href.indexOf('#') != -1) {
				$(this).addClass('smooth-anchor');
			}
		});

		$(document).on('click', '.smooth-anchor', function (event) {
			let href = $(this).attr('href');
		
			if (typeof href === 'string' && href.startsWith('#')) {
				let target = $(href);
				event.preventDefault();
		
				if (target.length) {
					// Scroll to the section on the current page
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 500, function() {
						// Update URL hash after scrolling
						history.replaceState(null, null, href);
					});
				} else {
					// Redirect to homepage with the anchor if not on homepage
					if (!$('body').hasClass('home')) {
						window.location.href = relome_vars.homeUrl + href;
					}
				}
			}
		});

		$(document).on('click', 'a[href="#"]', function (event) {
			event.preventDefault();
		});

		$('.dropdown-menu').each(function () {
			let dropdown = $(this);

			dropdown.hover(function () {
				dropdown.parent().find('.nav-link').first().addClass('active');
			}, function () {
				dropdown.parent().find('.nav-link').first().removeClass('active');
			});
		});

		/*----------------------------------------------
		5. Scroll To Top
		----------------------------------------------*/
		var progressPath = document.querySelector('.scroll-to-top path');

		if (!progressPath) {
			return;
		}

		var pathLength = progressPath.getTotalLength();

		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		};

		updateProgress();

		$(window).on('scroll', function () {
			updateProgress();

			// Scroll-to-Top visibility toggle
			var offset = 50;

			if ($(this).scrollTop() > offset) {
				$('.scroll-to-top').addClass('active-progress');
			} else {
				$('.scroll-to-top').removeClass('active-progress');
			}
		});

		$('.scroll-to-top').on('click', function (event) {
			event.preventDefault();

			$('html, body').animate({
				scrollTop: 0
			}, 550);
		});

		/*----------------------------------------------
		8. Slides
		----------------------------------------------*/
		setTimeout(function() {

			$('.no-slider .left').addClass('init');

		}, 1200)

		var animation = function(slider) {

			let image = $(slider + ' .swiper-slide-active img');
			let title = $(slider + ' .title');
			let description = $(slider + ' .description');
			let btn = $(slider + ' .btn');
			let nav = $(slider + ' nav');

			image.toggleClass('aos-animate');
			title.toggleClass('aos-animate');
			description.toggleClass('aos-animate');
			btn.toggleClass('aos-animate');
			nav.toggleClass('aos-animate');

			setTimeout(function() {

				image.toggleClass('aos-animate');
				title.toggleClass('aos-animate');
				description.toggleClass('aos-animate');
				btn.toggleClass('aos-animate');
				nav.toggleClass('aos-animate');

				AOS.refresh();

			}, 100)

			if ($('.full-slider').hasClass('animation')) {

				$('.full-slider .left').addClass('off');
				$('.full-slider .left').removeClass('init');

				setTimeout(function() {

					$('.full-slider .left').removeClass('off');

				}, 200)

				setTimeout(function() {

					$('.full-slider .left').addClass('init');

				}, 1000)

			} else {

				$('.full-slider .left').addClass('init');
			}
		}

		var midSlider = new Swiper('.slider-mid', {

			autoplay: true,
			loop: true,
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: {
				767: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				1023: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			},
			pagination: {
				el: '.swiper-pagination',
				type: "fraction",
			}
		})

		/*----------------------------------------------
		13. Filter Items
		----------------------------------------------*/
		if ( $('.filter-items').length ) {

			$('.portfolio').each(function(index) {

				var count = index + 1;
		
				$(this).find('.filter-items').removeClass('filter-items').addClass('filter-items-'+count);
				$(this).find('.filter-item').removeClass('filter-item').addClass('filter-item-'+count);
				$(this).find('.filter-btn').removeClass('filter-btn').addClass('filter-btn-'+count);
				
				var Shuffle = window.Shuffle;
				var Filter  = new Shuffle(document.querySelector('.filter-items-'+count), {
					itemSelector: '.filter-item-'+count,
					buffer: 1,
				})
		
				$('.filter-btn-'+count).on('change', function (e) {
		
					var input = e.currentTarget;
					
					if (input.checked) {
						Filter.filter(input.value);
					}
				})
			});

		}

		/*----------------------------------------------
		6. counterUp
		----------------------------------------------*/
		const counterUp = window.counterUp.default;

		const callback = entries => {
			entries.forEach(entry => {
				const el = entry.target;
				if (entry.isIntersecting && !el.classList.contains('is-visible')) {
					counterUp(el, {
						duration: 1000,
						delay: 10,
					});
					el.classList.add('is-visible');
				}
			});
		};

		const IO = new IntersectionObserver(callback, { threshold: 1 });

		// Use querySelectorAll and loop through each '.counter' element
		const counters = document.querySelectorAll('.counter');
		counters.forEach(counter => IO.observe(counter));

		/*----------------------------------------------
		6. GSAP Smooth Scroll
		----------------------------------------------*/
		const lenis = new Lenis();
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	});

}(jQuery));