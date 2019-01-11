$(function () {

	const gallery = () => {
		// Defining variables and constats
		const imgSlider = document.querySelector('.gallery__imgSlider');
		const imgSlides = Array.from(imgSlider.children);
		const mainSlider = document.querySelector('.gallery__content');
		const slides = Array.from(mainSlider.children);
		const ctrlPicFirst = slides[0].querySelector('.gallery__nextImg');
		const ctrlPicSecond = slides[1].querySelector('.gallery__nextImg');
		const prevBtn = document.querySelector('.gallery__slidePrev');
		const nextBtn = document.querySelector('.gallery__slideNext');
		const dotsNav = document.querySelector('.gallery__dots');
		const dots = Array.from(dotsNav.children);

		const changeSlide = (currentSlide, targetSlide) => {
			currentSlide.classList.remove('current');
			targetSlide.classList.add('current');
		};

		const updateDots = (currentDot, targetDot) => {
			currentDot.classList.remove('current');
			targetDot.classList.add('current');
		};

		const checkNav = (targetSlide) => {
			targetSlide.nextElementSibling ? nextBtn.classList.remove('hidden') : nextBtn.classList.add('hidden');
			targetSlide.previousElementSibling ? prevBtn.classList.remove('hidden') : prevBtn.classList.add('hidden');
		}

		// When click the prev button show prev slide
		prevBtn.addEventListener('click', evt => {
			let currentSlide = imgSlider.querySelector('.current');
			let targetSlide = currentSlide.previousElementSibling;
			let currentMainSlide = mainSlider.querySelector('.current');
			let targetMainSlide = currentMainSlide.previousElementSibling;
			let currentDot = dotsNav.querySelector('.current');
			let targetDot = currentDot.previousElementSibling;

			checkNav(targetSlide);
			changeSlide(currentSlide, targetSlide);
			changeSlide(currentMainSlide, targetMainSlide);
			updateDots(currentDot, targetDot);
		});

		// // When click the next button show next slide
		nextBtn.addEventListener('click', evt => {
			let currentSlide = imgSlider.querySelector('.current');
			let targetSlide = currentSlide.nextElementSibling;
			let currentMainSlide = mainSlider.querySelector('.current');
			let targetMainSlide = currentMainSlide.nextElementSibling;
			let currentDot = dotsNav.querySelector('.current');
			let targetDot = currentDot.nextElementSibling;

			checkNav(targetSlide);
			changeSlide(currentSlide, targetSlide);
			changeSlide(currentMainSlide, targetMainSlide);
			updateDots(currentDot, targetDot);
		});

		ctrlPicFirst.addEventListener('click', evt => {
			let currentSlide = imgSlider.querySelector('.current');
			let targetSlide = currentSlide.nextElementSibling;
			let currentMainSlide = mainSlider.querySelector('.current');
			let targetMainSlide = currentMainSlide.nextElementSibling;
			let currentDot = dotsNav.querySelector('.current');
			let targetDot = currentDot.nextElementSibling;

			checkNav(targetSlide);
			changeSlide(currentSlide, targetSlide);
			changeSlide(currentMainSlide, targetMainSlide);
			updateDots(currentDot, targetDot);
		});

		ctrlPicSecond.addEventListener('click', evt => {
			let currentSlide = imgSlider.querySelector('.current');
			let targetSlide = currentSlide.nextElementSibling;
			let currentMainSlide = mainSlider.querySelector('.current');
			let targetMainSlide = currentMainSlide.nextElementSibling;
			let currentDot = dotsNav.querySelector('.current');
			let targetDot = currentDot.nextElementSibling;

			checkNav(targetSlide);
			changeSlide(currentSlide, targetSlide);
			changeSlide(currentMainSlide, targetMainSlide);
			updateDots(currentDot, targetDot);
		});

		dotsNav.addEventListener('click', evt => {
			let targetDot = evt.target.closest('button');

			if (!targetDot) return;

			let currentSlide = imgSlider.querySelector('.current');
			let currentMainSlide = mainSlider.querySelector('.current');
			let currentDot = dotsNav.querySelector('.current');
			let targetIndex = dots.findIndex(dot => dot === targetDot);
			let targetSlide = imgSlides[targetIndex];
			let targetMainIndex = dots.findIndex(dot => dot === targetDot);
			let targetMainSlide = slides[targetIndex];

			checkNav(targetSlide);
			changeSlide(currentSlide, targetSlide);
			changeSlide(currentMainSlide, targetMainSlide);
			updateDots(currentDot, targetDot);
		});

		dotsNav.addEventListener('wheel', evt => {
			evt.preventDefault();
			let delta = evt.deltaY;

			let currentSlide = imgSlider.querySelector('.current');
			let currentMainSlide = mainSlider.querySelector('.current');
			let currentDot = dotsNav.querySelector('.current');

			let targetSlide = currentSlide.nextElementSibling;

			if (delta > 0 && currentSlide.nextElementSibling) {
				let targetMainSlide = currentMainSlide.nextElementSibling;
				let targetDot = currentDot.nextElementSibling;

				checkNav(targetSlide);
				changeSlide(currentSlide, targetSlide);
				changeSlide(currentMainSlide, targetMainSlide);
				updateDots(currentDot, targetDot);
			}

			targetSlide = currentSlide.previousElementSibling;

			if (delta < 0 && currentSlide.previousElementSibling) {
				let targetMainSlide = currentMainSlide.previousElementSibling;
				let targetDot = currentDot.previousElementSibling;

				checkNav(targetSlide);
				changeSlide(currentSlide, targetSlide);
				changeSlide(currentMainSlide, targetMainSlide);
				updateDots(currentDot, targetDot);
			}
		});
	};

	const worksGallery = () => {
		const worksStage = document.querySelector('.works__stage');
		const works = Array.from(worksStage.children);
		const worksThumbCont = document.querySelector('.works__sideWrapper');
		const worksThumbs = Array.from(worksThumbCont.children);

		worksThumbs.forEach((thumb, index) => {
			thumb.addEventListener('click', evt => {
				worksThumbCont.querySelector('.current').classList.remove('current');
				thumb.classList.add('current');
				worksStage.querySelector('.current').classList.remove('current');
				works[index].classList.add('current');
			});
		});

		works.forEach((work) => {
			const actionsWrapper = work.querySelector('.works__actions');
			const beforeBtn = actionsWrapper.querySelector('.works__before');
			const afterBtn = actionsWrapper.querySelector('.works__after');
			const imgs = Array.from(work.querySelectorAll('img'));

			beforeBtn.addEventListener('click', evt => {
				beforeBtn.classList.add('active');
				afterBtn.classList.remove('active');
				work.querySelector('.imgActive').classList.remove('imgActive');
				imgs[0].classList.add('imgActive');
			});

			afterBtn.addEventListener('click', evt => {
				afterBtn.classList.add('active');
				beforeBtn.classList.remove('active');
				work.querySelector('.imgActive').classList.remove('imgActive');
				imgs[1].classList.add('imgActive');
			});
		});
	};

	const steps = () => {
		const stepsStage = document.querySelector('.steps__stage');
		const stepsTexts = document.querySelector('.steps__texts');
		const steps = Array.from(stepsStage.children);
		const texts = Array.from(stepsTexts.children);

		steps.forEach((step, index) => {
			step.addEventListener('click', evt => {
				stepsStage.querySelector('.current').classList.remove('current');
				step.classList.add('current');
				stepsTexts.querySelector('.current').classList.remove('current');
				texts[index].classList.add('current');
			});
		});
	};

	const moveStepsTexts = () => {
		const texts = Array.from(document.querySelector('.steps__texts').children);
		const steps = Array.from(document.querySelector('.steps__stage').children);

		texts.forEach( (text, index) => {
			textToMove = $(text);
			$(textToMove).appendTo(steps[index]);
		} );
	};

	const garant = () => {
		const stage = document.querySelector('.garant');
		const track = document.querySelector('.garant__items');
		const items = Array.from(track.children);
		const textsContainer = document.querySelector('.garant__texts');
		const texts = Array.from(textsContainer.children);

		items.forEach((item, index) => {
			item.addEventListener('mouseover', evt => {
				track.querySelector('.active').classList.remove('active');
				textsContainer.querySelector('.active').classList.remove('active');
				item.classList.add('active');
				texts[index].classList.add('active');
			});
		});

		stage.addEventListener('mouseleave', evt => {
			track.querySelector('.active').classList.remove('active');
			textsContainer.querySelector('.active').classList.remove('active');
			items[0].classList.add('active');
			texts[0].classList.add('active');
		})
	};

	const moveGarantTexts = () => {
		const items = Array.from(document.querySelector('.garant__items').children);
		const texts = Array.from(document.querySelector('.garant__texts').children);

		texts.forEach( (text, index) => {
			textToMove = $(text);
			$(textToMove).appendTo(items[index]);

			if (index == 0) items[0].classList.remove('active');
			
			text.addEventListener('click', evt => {
				$(text).toggleClass('active');
			});
		} );
	}

	const calculator = () => {
		const inputs = Array.from(document.querySelectorAll('.calc__input'));
		const btn = document.querySelector('.calc__btn');
		const resultText = document.querySelector('.calc__results');

		inputs.forEach((input, index) => {
			input.addEventListener('input', evt => {
				if (index == 0) inputs[1].value = '';
				if (index == 1) inputs[0].value = '';
				input.value = input.value.replace(/[^\d]/, '');
				if (!isNaN(input.value) && Number(input.value) > 1000000) {
					input.value = 1000000;
				}
			})
		});

		const prettify = (number) => {
			let num = number.toString();
			return num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
		}

		const calculate = () => {
			if (!inputs[0].value && !inputs[1].value) return;
			if (inputs[0].value) {
				resultText.innerHTML = prettify(inputs[0].value * 6000);
			} else if (inputs[1].value) {
				resultText.innerHTML = prettify(inputs[1].value * 60);
			}
		}

		btn.addEventListener('click', evt => {
			evt.preventDefault();
			calculate();
		})
	};


	worksGallery();
	calculator();

	const wW = $(window).width();

	if (wW >= 1250) steps();

	if (wW >= 768) {
		gallery();
		garant();
		setTimeout(function () {
			new SimpleBar(document.querySelector('.works__sidebar'), {
				autoHide: false
			});
		}, 3000);
	}
	
	if (wW < 768) {
		moveStepsTexts();
		moveGarantTexts();
	}

	$('.callMeOpen').magnificPopup({
		type: 'inline',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true
	});

});