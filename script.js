/* =========================================
   SLIDE SYSTEM
========================================= */

let currentSlide = 1;

const totalSlides = 8;


/* =========================================
   ELEMENTS
========================================= */

const music = document.getElementById("backgroundMusic");

const musicButton = document.getElementById("musicButton");


/* =========================================
   START EXPERIENCE
========================================= */

function startExperience() {

    // Mulai musik
    music.play().catch(function(error) {

        console.log("Musik belum dapat diputar:", error);

    });

    // Pindah ke slide 2
    nextSlide();

}


/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    if (currentSlide >= totalSlides) {
        return;
    }

    const oldSlide =
        document.getElementById(`slide${currentSlide}`);

    oldSlide.classList.remove("active");

    currentSlide++;

    const newSlide =
        document.getElementById(`slide${currentSlide}`);

    newSlide.classList.add("active");

    updateIndicator();

}


/* =========================================
   UPDATE DOT
========================================= */

function updateIndicator() {

    for (let i = 1; i <= totalSlides; i++) {

        const dot =
            document.getElementById(`dot${i}`);

        dot.classList.remove("active-dot");

    }

    const currentDot =
        document.getElementById(`dot${currentSlide}`);

    currentDot.classList.add("active-dot");

}


/* =========================================
   MUSIC CONTROL
========================================= */

function toggleMusic() {

    if (music.paused) {

        music.play();

        musicButton.textContent = "🎵";

    } else {

        music.pause();

        musicButton.textContent = "🔇";

    }

}


/* =========================================
   RESTART
========================================= */

function restartStory() {

    const current =
        document.getElementById(`slide${currentSlide}`);

    current.classList.remove("active");

    currentSlide = 1;

    const first =
        document.getElementById("slide1");

    first.classList.add("active");

    updateIndicator();

    music.currentTime = 0;

    music.play().catch(function() {

        console.log("Klik tombol musik untuk memulai kembali.");

    });

}


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {

        nextSlide();

    }

});


/* =========================================
   SWIPE SUPPORT FOR MOBILE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener("touchstart", function(event) {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", function(event) {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (difference > 50) {

        nextSlide();

    }

}