// Navigation Toggle (Hamburger Menu)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => {
                item.style.animation = ''; 
            });
        });
    });
}

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight; 

        window.scrollTo({
            top: targetElement.offsetTop - navHeight, 
            behavior: 'smooth'
        });
    });
});

let slideIndex = 0;
const slides = document.querySelectorAll('.testimoni-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

let slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000); 

const sliderContainer = document.querySelector('.testimoni-slider');
if (sliderContainer) { 
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    });
}


const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        faqQuestions.forEach(q => {
            if (q !== question && q.classList.contains('active')) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
                q.nextElementSibling.style.padding = '0 25px';
            }
        });

        if (isActive) {
            question.classList.remove('active');
            answer.style.maxHeight = null;
            answer.style.padding = '0 25px';
        } else {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '15px 25px';
        }
    });
});


window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const animateOnScroll = () => {
    const sections = document.querySelectorAll('.section-padding');
    const triggerBottom = window.innerHeight * 0.8; 

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll(); 
    window.addEventListener('scroll', animateOnScroll);
});

document.getElementById('current-year').textContent = new Date().getFullYear();


const fasilitasSlider = document.querySelector('.fasilitas-slider');
const fasilitasItems = document.querySelectorAll('.fasilitas-item');
const fasilitasPrevArrow = document.querySelector('.fasilitas .prev-arrow');
const fasilitasNextArrow = document.querySelector('.fasilitas .next-arrow');
const fasilitasDotsContainer = document.querySelector('.fasilitas-dots');

let fasilitasIndex = 0;
let fasilitasItemsPerSlide = 3; 
let fasilitasItemWidth;

const updateFasilitasSliderMetrics = () => {
    if (!fasilitasItems || fasilitasItems.length === 0) return;

    if (window.innerWidth <= 768) {
        fasilitasItemsPerSlide = 1;
    } else if (window.innerWidth <= 992) {
        fasilitasItemsPerSlide = 2;
    } else {
        fasilitasItemsPerSlide = 3;
    }
    
    const itemStyle = getComputedStyle(fasilitasItems[0]);
    const itemClientWidth = fasilitasItems[0].clientWidth;
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    fasilitasItemWidth = itemClientWidth + marginLeft + marginRight;


    fasilitasDotsContainer.innerHTML = '';
    const totalPages = Math.ceil(fasilitasItems.length / fasilitasItemsPerSlide);
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('fasilitas-dot');
        if (i === Math.floor(fasilitasIndex / fasilitasItemsPerSlide)) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            fasilitasIndex = i * fasilitasItemsPerSlide;
            updateFasilitasSlider();
        });
        fasilitasDotsContainer.appendChild(dot);
    }
};

const updateFasilitasSlider = () => {
    if (!fasilitasItems || fasilitasItems.length === 0) return;

    const maxIndex = fasilitasItems.length - fasilitasItemsPerSlide;
    if (fasilitasIndex > maxIndex) {
        fasilitasIndex = maxIndex;
    }
    if (fasilitasIndex < 0) {
        fasilitasIndex = 0;
    }

    let offset = 0;
    if (fasilitasItems[fasilitasIndex]) {
        offset = -fasilitasItems[fasilitasIndex].offsetLeft;
    }

    fasilitasSlider.style.transform = `translateX(${offset}px)`;

    const currentActiveDot = Math.floor(fasilitasIndex / fasilitasItemsPerSlide);
    Array.from(fasilitasDotsContainer.children).forEach((dot, index) => {
        if (index === currentActiveDot) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

if (fasilitasPrevArrow && fasilitasNextArrow) { 
    fasilitasPrevArrow.addEventListener('click', () => {
        fasilitasIndex -= fasilitasItemsPerSlide;
        updateFasilitasSlider();
    });

    fasilitasNextArrow.addEventListener('click', () => {
        fasilitasIndex += fasilitasItemsPerSlide;
        updateFasilitasSlider();
    });
}


window.addEventListener('resize', () => {
    updateFasilitasSliderMetrics();
    updateFasilitasSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    updateFasilitasSliderMetrics();
    updateFasilitasSlider();
});

const slideContainer = document.getElementById("slideContainer");
const slideImages = slideContainer ? slideContainer.querySelectorAll("img") : [];
let tentangSlideIndex = 0;

function changeSlide(direction) {
    if (!slideContainer || slideImages.length === 0) return;

    tentangSlideIndex += direction;

    if (tentangSlideIndex < 0) tentangSlideIndex = slideImages.length - 1;
    if (tentangSlideIndex >= slideImages.length) tentangSlideIndex = 0;

    const slideWidth = slideImages[0].clientWidth;
    slideContainer.style.transform = `translateX(-${slideWidth * tentangSlideIndex}px)`;
}

window.addEventListener('resize', () => {
    const slideWidth = slideImages[0]?.clientWidth || 0;
    slideContainer.style.transform = `translateX(-${slideWidth * tentangSlideIndex}px)`;
});

navSlide();