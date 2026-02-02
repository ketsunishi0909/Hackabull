const eventDate = new Date("April 25, 2026 09:00:00").getTime();

const countdown = () => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
};

setInterval(countdown, 1000);
countdown();

// --- About images rotation ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.about-card img'));
    if (!cards.length) return;
    // pool of 6 images (replace with your own images in images/about/)
    const pool = [
        'images/about/about1.jpg',
        'images/about/about2.jpg',
        'images/about/about3.jpg',
        'images/about/about4.jpg',
        'images/about/about5.jpg',
        'images/about/about6.jpg'
    ];

    // preload images
    pool.forEach(src => { const i = new Image(); i.src = src; });

    // current start index for the visible group of 3
    let currentStart = 0;

    // initialize first 3 images
    cards.forEach((img, i) => {
        const src = pool[(currentStart + i) % pool.length];
        img.src = src;
        img.style.opacity = '1';
    });

    const rotateGroup = () => {
        // advance by 3 to show next group
        currentStart = (currentStart + 3) % pool.length;

        cards.forEach((img, i) => {
            const nextSrc = pool[(currentStart + i) % pool.length];
            // fade out -> switch -> fade in
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = nextSrc;
                img.onload = () => { img.style.opacity = '1'; };
            }, 450);
        });
    };

    // rotate every 4 seconds
    setInterval(rotateGroup, 4000);
});

// FAQ accordion: toggle answers with fade and ARIA updates
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = Array.from(document.querySelectorAll('.faq-question'));
    if (!faqButtons.length) return;

    faqButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(isOpen));
            // if closing, allow transition to play (no extra code needed)
        });
    });
});
/* ---------- TRACKS CAROUSEL LOGIC ---------- */

const wrapper = document.querySelector('.tracks-track-wrapper');
const cards = document.querySelectorAll('.track-card');
const prev = document.querySelector('.carousel-btn.left');
const next = document.querySelector('.carousel-btn.right');

let index = 0;
let autoRotate;

function updateCarousel() {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
}

function startAutoRotate() {
    autoRotate = setInterval(() => {
        index = (index + 1) % cards.length;
        updateCarousel();
    }, 5000);
}

function resetAutoRotate() {
    clearInterval(autoRotate);
    startAutoRotate();
}

/* Buttons */
next.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateCarousel();
    resetAutoRotate();
});

prev.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
    resetAutoRotate();
});

/* Flip on click */
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

/* Start auto rotation */
startAutoRotate();
