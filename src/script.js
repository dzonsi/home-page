// menuBar & sideNav

var menuBarIcon = document.getElementById('menu-bar-icon');
var sideNav = document.getElementById('side-nav');

menuBarIcon.addEventListener('click', () => {
	toggleMenu();
	sideBarOpenClose();
});

function toggleMenu() {
	menuBarIcon.classList.toggle('menu-bar-open');
}

function sideBarOpenClose() {
	sideNav.classList.toggle('open');
}
// closing sidenav when window is more than 800 px wide

function closeSideNav() {
	if(window.innerWidth > 800) {
	sideNav.classList.remove('open');
	menuBarIcon.classList.remove('menu-bar-open');
	}
}
window.addEventListener('resize', closeSideNav);

// login popup

var logInButton = document.getElementById('log-in');
var logInPopup = document.getElementById('log-in-popup');
var logInPopupClose = document.getElementById('log-in-popup-close');
var sideNavLogInButton = document.getElementById('side-nav-log-in-button');

logInButton.addEventListener('click', () => {
	logInPopup.classList.toggle('log-in-popup-open');
});
logInPopupClose.addEventListener('click', () => {
	logInPopup.classList.remove('log-in-popup-open');
});
sideNavLogInButton.addEventListener('click', () => {
	if ( logInPopup.classList.contains('log-in-popup-open') ) {
		sideNav.classList.remove('open');
		menuBarIcon.classList.remove('menu-bar-open');
	} else {
		logInPopup.classList.toggle('log-in-popup-open');
		sideNav.classList.remove('open');
		menuBarIcon.classList.remove('menu-bar-open');
	}
});


// feedback

// rating row

var ratingRows = document.getElementsByClassName('rating-row');
var i;

for (i = 0; i < ratingRows.length; i++ ) {
	ratingRows[i].addEventListener('click', function() {
		var i = 0;
		for (i = 0; i < ratingRows.length; i++) {
			ratingRows[i].classList.remove('rating-color');
		}
		this.classList.add('rating-color');
	});
}

// feedback open & close
var feedbackOpen = document.getElementById('feedback-open');
var feedbackOpenText = document.getElementById('feedback-open-text');
var feedbackClose = document.getElementById('feedback-close');
var feedback = document.getElementById('feedback-body');

feedbackOpen.addEventListener('click', () => {
	feedback.classList.toggle('feedback-body-open');
	feedbackOpen.classList.toggle('feedback-open-animation');
	if(feedbackOpenText.innerHTML === 'Feedback') {
		feedbackOpenText.innerHTML = 'Close';
	} else {
		feedbackOpenText.innerHTML = 'Feedback';
	}
});
feedbackClose.addEventListener('click', () => {
	feedback.classList.remove('feedback-body-open');
	feedbackOpen.classList.toggle('feedback-open-animation');
	if(feedbackOpenText.innerHTML === 'Feedback') {
		feedbackOpenText.innerHTML = 'Close';
	} else {
		feedbackOpenText.innerHTML = 'Feedback';
	}
});

// position

// vertical position ???
function feedbackPosition() {
	if(document.documentElement.clientWidth > 1000) {
		feedback.style.right = ((document.documentElement.clientWidth - 1000) / 2 + 10) + 'px';
		feedbackOpen.style.right = ((document.documentElement.clientWidth - 1000) / 2 + 10) + 'px';
	} else {
		feedback.style.right = '10px';
		feedbackOpen.style.right = '10px';
	}
}

window.addEventListener('resize', feedbackPosition);
document.body.onload = feedbackPosition();

function feedbackPositionScroll() {
	var fullHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
	);
	var clientHeight = window.innerHeight;
	var scrollHeight = window.pageYOffset;
	const footer = document.getElementById('footer-wrapper');
	var footerHeight = footer.offsetHeight;// clientHeight sve jedno u ovom slucaju

	if ( (clientHeight + scrollHeight) > fullHeight - footerHeight ) {
		feedback.style.bottom = 49 + footerHeight + 'px';
		feedbackOpen.style.bottom = 10 + footerHeight + 'px';
	} else {
		feedback.style.bottom = '49px';
		feedbackOpen.style.bottom = '10px';
	}

}

window.addEventListener('scroll', feedbackPositionScroll);
window.addEventListener('resize', feedbackPositionScroll);// ???

// feedback form validate
var feedbackForm = document.getElementById('feedback-form');
var feedbackFormSubmit = document.getElementById('feedback-submit');

function feedbackValidate(e) {
	e.preventDefault();
	var i, rating;
	var inputs = feedbackForm.rating;
	for(i = 0; i < inputs.length; i++) {
		if(inputs[i].checked) {
			rating = feedbackForm.rating[i].value;
			feedbackForm.submit();
		}
	}
	if(!rating) {
		var errorText = document.getElementById('error-row');
		errorText.style.display = 'block';
	}
}

feedbackFormSubmit.addEventListener('click', feedbackValidate);

var inputs = feedbackForm.rating;
var inputsI;
for(inputsI = 0; inputsI < inputs.length; inputsI++) {
	inputs[inputsI].addEventListener('click', () => {
		var errorText = document.getElementById('error-row');
		errorText.style.display = 'none';
	})
}


// slideshow

var slideIndex = 1;
var autoShow;
showSlides(slideIndex);

function nextSlide(n) {
	showSlides(slideIndex += n);
	clearTimeout(autoShow);
	showSlidesAuto();
}

function thisSlide(n) {
	showSlides(slideIndex = n);
	clearTimeout(autoShow);
	showSlidesAuto();
}

function showSlides(n) {
	const slides = document.getElementsByClassName('slide');
	const dots = document.getElementsByClassName('slides-dot');
	var i;

	if(n > slides.length) { slideIndex = 1 }
	if(n < 1) { slideIndex = slides.length }

	for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('slides-dot-active');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('slides-dot-active');

}

function showSlidesAuto() {
	autoShow = setTimeout( () => {
		showSlides(slideIndex += 1);
		showSlidesAuto();
	}, 3000);
}

showSlidesAuto();

const prev = document.querySelector('.slideshow-prev');
const next = document.querySelector('.slideshow-next');
prev.addEventListener('click', () => {
	nextSlide(-1);
});
next.addEventListener('click', () => {
	nextSlide(1);
});

const dots = document.getElementsByClassName('slides-dot');
var dotsI;
for (dotsI = 0; dotsI < dots.length; dotsI++) {
	dots[dotsI].addEventListener('click', function(e) {
		var n = Number(e.target.dataset.n);
		slideIndex = n;
		thisSlide(n);
	});
}


// sign up open & close

// disable scrolling
function disableScrolling() {
	window.scrollTo(0, 0);
}

var signUpOpen = document.getElementById('sign-up-open');
var sideNavSignUpOpen = document.getElementById('side-nav-sign-up');
var signUpClose = document.getElementById('sign-up-close');
var signUpCancel = document.getElementById('cancel-button');
var signUpContainer = document.getElementById('sign-up-container');
var signUpForm = document.getElementById('sign-up-form');

signUpOpen.addEventListener('click', e => {
	e.preventDefault();
	signUpContainer.style.display = 'flex';
	window.addEventListener('scroll', disableScrolling);
});

sideNavSignUpOpen.addEventListener('click', e => {
	e.preventDefault();
	signUpContainer.style.display = "flex";
	window.addEventListener('scroll', disableScrolling);
});

signUpClose.addEventListener('click', () => {
	signUpForm.reset();
	// remove invalid class
	requiredText.classList.remove('required-text');
	username.classList.remove('invalid-input');
	email.classList.remove('invalid-input');
	password.classList.remove('invalid-input');
	repeatPassword.classList.remove('invalid-input');
	// restart conditions
	usernameCondition = false;
	emailCondition = false;
	passwordCondition = false;
	repeatPasswordCondition = false;
	agreeCondition = false;

	if( agreeSwitch.classList.contains('switch-invalid') ) {
		agreeSwitch.classList.remove('switch-invalid');
		switchSquare.classList.remove('switch-square-invalid');
	}
	window.removeEventListener('scroll', disableScrolling);
	signUpContainer.style.display = 'none';
	if(agreeSwitch.classList.contains('switch-on')) {
		agreeSwitch.classList.remove('switch-on');
		switchSquare.classList.remove('switch-square-on', 'switch-square-on-shadow');
	}
});

signUpCancel.addEventListener('click', () => {
	requiredText.classList.remove('required-text');
	// remove invalid class
	username.classList.remove('invalid-input');
	email.classList.remove('invalid-input');
	password.classList.remove('invalid-input');
	repeatPassword.classList.remove('invalid-input');
	// restart conditions
	usernameCondition = false;
	emailCondition = false;
	passwordCondition = false;
	repeatPasswordCondition = false;
	agreeCondition = false;

	if( agreeSwitch.classList.contains('switch-invalid') ) {
		agreeSwitch.classList.remove('switch-invalid');
		switchSquare.classList.remove('switch-square-invalid');
	}
	window.removeEventListener('scroll', disableScrolling);
	signUpContainer.style.display = 'none';
	if(agreeSwitch.classList.contains('switch-on')) {
		agreeSwitch.classList.remove('switch-on');
		switchSquare.classList.remove('switch-square-on', 'switch-square-on-shadow');
	}
});

// sign up switch & form

// switch
var agreeSwitch = document.getElementById('switch');
var switchSquare = document.getElementById('switch-square');

function toggleSwitch() {
	agreeSwitch.classList.toggle("switch-on");
	switchSquare.classList.toggle("switch-square-on");
	switchSquare.classList.toggle("switch-square-on-shadow");
	if (switchSquare.classList.contains("switch-square-on-shadow")) {
		switchSquare.classList.remove("switch-square-off-shadow");
	} else {
		switchSquare.classList.add("switch-square-off-shadow");
	}
}

agreeSwitch.addEventListener('click', toggleSwitch);

// form validation

var signUpForm = document.getElementById('sign-up-form');
var username = document.getElementById('sign-up-username');
var email = document.getElementById('sign-up-email');
var password = document.getElementById('sign-up-password');
var repeatPassword = document.getElementById('sign-up-repeatpassword');
var agree = document.getElementById('sign-up-agree');
var submitButton = document.getElementById('submit-button');

var usernameCondition = false;
var emailCondition = false;
var passwordCondition = false;
var repeatPasswordCondition = false;
var agreeCondition = false;

var requiredText = document.getElementById('required-text');

// username
function usernameValidation() {
	if(username.value) {
		if( username.classList.contains('invalid-input') ) {
			username.classList.remove('invalid-input');
		}
		usernameCondition = true;
	} else {
		if( !username.classList.contains('invalid-input') ) {
			username.classList.add('invalid-input');
		}
		usernameCondition = false;
	}
}

username.addEventListener('blur', usernameValidation);

// email
function emailValidation() {
	var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(reg.test(email.value)) {
		if( email.classList.contains('invalid-input') ) {
			email.classList.remove('invalid-input');
		}
		emailCondition = true;
	} else {
		if( !email.classList.contains('invalid-input') ) {
			email.classList.add('invalid-input');
		}
		emailCondition = false;
	}
}

email.addEventListener('blur', emailValidation);

// password
function passwordValidation() {
	if(password.value.length >= 8) {
		if( password.classList.contains('invalid-input') ) {
			password.classList.remove('invalid-input');
		}
		passwordCondition = true;
	} else {
		if( !password.classList.contains('invalid-input') ) {
			password.classList.add('invalid-input');
		}
		passwordCondition = false;
	}
	if(repeatPassword.value) {
		repeatPasswordValidation();
	}
}

password.addEventListener('blur', passwordValidation);

// repeatPassword
function repeatPasswordValidation() {
	if(password.value === repeatPassword.value && repeatPassword.value.length >= 8) {
		if( repeatPassword.classList.contains('invalid-input') ) {
			repeatPassword.classList.remove('invalid-input');
		}
		repeatPasswordCondition = true;
	} else{
		if( !repeatPassword.classList.contains('invalid-input') ) {
			repeatPassword.classList.add('invalid-input');
		}
		repeatPasswordCondition = false;
	}
}

repeatPassword.addEventListener('blur', repeatPasswordValidation);

// agree
function agreeValidation() {
	if(!agree.checked) {
		if( agreeSwitch.classList.contains('switch-invalid') ) {
			agreeSwitch.classList.remove('switch-invalid');
			switchSquare.classList.remove('switch-square-invalid');
		}
	} else {
		agreeSwitch.classList.add('switch-invalid');
		switchSquare.classList.add('switch-square-invalid');
	}
}

agreeSwitch.addEventListener('click', agreeValidation);
agreeSwitch.addEventListener('keypress', (e) => {
	if(e.keyCode === 13) {
		e.target.click();
	}

});

function agreeSubmitValidation() {
	if(!agree.checked && !agreeSwitch.classList.contains('switch-invalid')) {
		agreeSwitch.classList.add('switch-invalid');
		switchSquare.classList.add('switch-square-invalid');
	}
}

// submitButton
function submitValidate(e) {
	e.preventDefault();
	if( usernameCondition && emailCondition && passwordCondition && repeatPasswordCondition && agreeCondition ) {
		signUpForm.submit();
	} else {
		requiredText.classList.add('required-text');
		if(!usernameCondition) {
			usernameValidation();
		}
		if(!emailCondition) {
			emailValidation();
		}
		if(!passwordCondition) {
			passwordValidation();
		}
		if(!repeatPasswordCondition) {
			repeatPasswordValidation();
		}
		if(!agreeCondition) {
			agreeSubmitValidation();
		}
	}
}
submitButton.addEventListener('click', submitValidate);

// image filter start

// display image

var filterContainer = document.getElementById('filter-container');
var images = document.getElementsByClassName('slideshow-image');
var imagesI;
var imageHolder = document.getElementById('image-holder');
var filterClose = document.getElementById('filter-close');

for (imagesI = 0; imagesI < images.length; imagesI++) {
	images[imagesI].addEventListener('click', function() {
		imageHolder.src = this.src;
		imageHolder.alt = this.alt;
		filterContainer.style.display = 'block';
		window.addEventListener('scroll', disableScrolling);
	})
}

filterClose.addEventListener('click', () => {
	filterContainer.style.display = 'none';
	window.removeEventListener('scroll', disableScrolling);
	removeAllFilters();
});

// edit button toggle

var editSwitch = document.getElementsByClassName('edit-switch');
var editSwitchI;

function editToggle() {
	// moves switch
	this.classList.toggle("edit-switch-on");
	this.firstElementChild.classList.toggle("edit-switch-btn-on");
	this.firstElementChild.firstElementChild.classList.toggle("edit-switch-click-on");
	// show input
	this.nextElementSibling.classList.toggle('input-container-show');
	// triggers functions that removes & reset filter on input close
	if(this.classList.contains('edit-switch', 'edit-switch-on')) {
		var input = this.nextElementSibling.dataset.type;
		removeFilter(input);
		resetFilterValue(input);
	}
}

for( editSwitchI = 0; editSwitchI < editSwitch.length; editSwitchI++ ) {
	editSwitch[editSwitchI].addEventListener('click', editToggle);
}

// changeFilter

function changeFilter() {
	var newFilter = `${this.id}(${this.value + this.dataset.unit})`;

	if(imageHolder.style.filter) {// random filter set

		if(imageHolder.style.filter.includes(this.id)) {// filterName set
			// beginning of filter
			var start = imageHolder.style.filter.indexOf(this.id);
			// end of filter
			var end = imageHolder.style.filter.indexOf(")", start);
			// old filter value
			var oldFilter= imageHolder.style.filter.slice(start, end + 1);
			// replace old with new
			imageHolder.style.filter = imageHolder.style.filter.replace(oldFilter, newFilter);
		} else {// no filterName set
				imageHolder.style.filter += newFilter;
		}
	}	else {// no filter set
		imageHolder.style.filter = newFilter;
	}
}

// attach changeFilter to all inputs
var inputs = document.getElementsByClassName('input-range');
var inputsI;
for(inputsI = 0; inputsI < inputs.length; inputsI++) {
	inputs[inputsI].addEventListener('input', changeFilter);
}

// remove filter from image

function removeFilter(filterName) {
	if(imageHolder.style.filter.includes(filterName)) {
		// beginning of filter
		var start = imageHolder.style.filter.indexOf(filterName);
		// end of filter
		var end = imageHolder.style.filter.indexOf(")", start);
		// old filter value
		var oldFilter= imageHolder.style.filter.slice(start, end + 1);
		// replace old filter value with empty string
		imageHolder.style.filter = imageHolder.style.filter.replace(oldFilter, "");
	}
}

// reset filter value
function resetFilterValue(filterName) {
	var input = document.getElementById(`${filterName}`);
	var initialValue = input.dataset.value;
	input.value = initialValue;
}

// remove all filters on exit

function removeAllFilters() {
	if(imageHolder.style.filter) {
		imageHolder.style.filter = "";
	}
	var i;
	for(i = 0; i < editSwitch.length; i++) {
		var element = editSwitch[i];
		if(element.classList.contains('edit-switch-on')) {
			// close switch
			element.classList.toggle("edit-switch-on");
			element.firstElementChild.classList.toggle("edit-switch-btn-on");
			element.firstElementChild.firstElementChild.classList.toggle("edit-switch-click-on");
			// close input
			element.nextElementSibling.classList.toggle('input-container-show');
			// reset filter if value is not initial
			var input = element.nextElementSibling.dataset.type;
			resetFilterValue(input);
		}
	}
}
