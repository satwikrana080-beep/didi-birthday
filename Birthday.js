
// =========================
// COZY INTRO — DIDIII LOVE GAME
// Each love question is a separate full-screen page.
// =========================

const roundLayouts = {
    1: { yesLeft: '25%', yesTop: '38px', noRight: '25%', noTop: '31px', yesSize: '150px', noSize: '150px' },
    2: { yesLeft: '12%', yesTop: '70px', noRight: '8%',  noTop: '20px', yesSize: '125px', noSize: '180px' },
    3: { yesLeft: '42%', yesTop: '88px', noRight: '6%',  noTop: '12px', yesSize: '105px', noSize: '215px' },
    4: { yesLeft: '8%',  yesTop: '15px', noRight: '22%', noTop: '78px', yesSize: '85px',  noSize: '250px' },
    5: { yesLeft: '45%', yesTop: '100px',noRight: '3%',  noTop: '5px',  yesSize: '65px',  noSize: '285px' }
};
// =========================
// BACKGROUND MUSIC
// =========================

const FIRST_SONG_VOLUME = 0.40;
const SECOND_SONG_VOLUME = 0.45;

// Yahan se "Tu Hain Toh" start hoga
// 45 = 0:45
const SECOND_SONG_START = 45;


// Pretty Little Baby
function startFirstSong() {

    const song1 = document.getElementById("song1");

    song1.loop = true;
    song1.volume = 0;

    song1.play()
        .then(function () {

            let volume = 0;

            const fadeIn = setInterval(function () {

                volume += 0.02;

                if (volume >= FIRST_SONG_VOLUME) {
                    song1.volume = FIRST_SONG_VOLUME;
                    clearInterval(fadeIn);
                } else {
                    song1.volume = volume;
                }

            }, 100);

        })
        .catch(function (error) {
            console.log("First song could not start:", error);
        });
}


// Fade first song + start Tu Hain Toh
function startSecondSong() {

    const song1 = document.getElementById("song1");
    const song2 = document.getElementById("song2");

    // Fade out first song
    let volume = song1.volume;

    const fadeOut = setInterval(function () {

        volume -= 0.03;

        if (volume <= 0) {
            song1.volume = 0;
            song1.pause();
            clearInterval(fadeOut);
        } else {
            song1.volume = volume;
        }

    }, 100);


    // Start second song from chosen point
    song2.currentTime = SECOND_SONG_START;
    song2.volume = 0;

    song2.play()
        .then(function () {

            let volume2 = 0;

            const fadeIn = setInterval(function () {

                volume2 += 0.025;

                if (volume2 >= SECOND_SONG_VOLUME) {
                    song2.volume = SECOND_SONG_VOLUME;
                    clearInterval(fadeIn);
                } else {
                    song2.volume = volume2;
                }

            }, 100);

        })
        .catch(function (error) {
            console.log("Second song could not start:", error);
        });
}
function activateIntroPage(pageNumber) {
    document.querySelectorAll('.cozy-intro').forEach(function(page) {
        page.classList.remove('active');
    });
    const next = document.getElementById('introPage' + pageNumber);
    if (next) next.classList.add('active');
}

function applyRoundStyle(roundNumber) {
    const page = document.getElementById('introPage' + (roundNumber + 1));
    if (!page) return;

    const layout = roundLayouts[roundNumber];
    const yes = page.querySelector('.yes-btn');
    const no = page.querySelector('.no-btn');

    yes.style.left = layout.yesLeft;
    yes.style.top = layout.yesTop;
    yes.style.minWidth = layout.yesSize;
    yes.style.padding = Math.max(8, 15 - roundNumber * 1.5) + 'px ' + Math.max(12, 25 - roundNumber * 2) + 'px';
    yes.style.fontSize = Math.max(10, 15 - roundNumber) + 'px';

    no.style.right = layout.noRight;
    no.style.top = layout.noTop;
    no.style.minWidth = layout.noSize;
    no.style.padding = (18 + roundNumber * 2) + 'px ' + (25 + roundNumber * 2) + 'px';
    no.style.fontSize = (15 + roundNumber * 1.5) + 'px';
}

function startLoveGame() {
    startFirstSong();
    applyRoundStyle(1);
    activateIntroPage(2);
}

function chooseYes(roundNumber) {
    if (roundNumber < 5) {
        applyRoundStyle(roundNumber + 1);
        activateIntroPage(roundNumber + 2);
        return;
    }
    const finalPage = document.getElementById('introPage6');
    const title = finalPage.querySelector('.cozy-title');
    const small = finalPage.querySelector('.cozy-small');
    const subtitle = finalPage.querySelector('.cozy-subtitle');
    const buttons = finalPage.querySelector('.love-buttons');
    const note = finalPage.querySelector('.round-note');

    small.textContent = 'Hehehehe... I KNEW ITTTT! 🥹❤️';
    title.textContent = 'I love you too, Didiiii! 🫶❤️';
    subtitle.textContent = 'Okay okay... now you deserve your actual surprise. 🎁';
    buttons.classList.add('hidden');
    note.textContent = '';
    createConfetti();

    setTimeout(function() {
        document.getElementById('introPage6').classList.remove('active');
        document.getElementById('page1').classList.add('active');
        currentPage = 1;
        startSecondSong();
    }, 6500);
}

function chooseNo(roundNumber) {
    const page = document.getElementById('introPage' + (roundNumber + 1));
    const noButton = page.querySelector('.no-btn');
    const note = document.getElementById('roundNote' + roundNumber);

    const notes = {
        1: "Hmmmm... I don't like that answer 😭",
        2: 'Didi is being suspiciously mean today... 👀',
        3: 'Ouch. My tiny heart just broke. 💔',
        4: 'Okay Didi... I see how it is. 😭',
        5: "Okayyy... now I'm definitely crying. 😭"
    };

    note.textContent = notes[roundNumber];
    noButton.animate([
        { transform: 'translateX(0) rotate(0deg)' },
        { transform: 'translateX(-7px) rotate(-2deg)' },
        { transform: 'translateX(7px) rotate(2deg)' },
        { transform: 'translateX(0) rotate(0deg)' }
    ], { duration: 420, easing: 'ease-in-out' });
}


let currentPage = 1;


// =========================
// PAGE NAVIGATION
// =========================

function nextPage(pageNumber) {

    const oldPage = document.getElementById("page" + currentPage);
    const newPage = document.getElementById("page" + pageNumber);

    oldPage.classList.remove("active");

    setTimeout(function () {

        newPage.classList.add("active");
        currentPage = pageNumber;

        if (pageNumber === 6) {
            startLetter();
        }

    }, 400);
}


// =========================
// OPEN ENVELOPE
// =========================

function openEnvelope() {

    const envelope = document.getElementById("envelope");

    envelope.classList.add("open");

    createConfetti();

    setTimeout(function () {
        nextPage(2);
    }, 1000);
}


// =========================
// FLIP CARDS
// =========================

function flipCard(card) {

    card.classList.toggle("flipped");

}


// =========================
// CAKE CANDLES
// =========================

let candlesBlown = 0;

function blowCandle(candle) {

    if (candle.classList.contains("blown")) {
        return;
    }

    candle.classList.add("blown");

    candlesBlown++;

    if (candlesBlown === 3) {

        document.getElementById("wish-message").innerHTML =
            "✨ Your wish is on its way... ✨";

        document
            .getElementById("final-button")
            .classList.remove("hidden");

        createConfetti();
    }
}


// =========================
// LETTER
// =========================

const letter =
"Dear Sis,\n\n" +
"I don't say it enough, but I'm genuinely lucky to have you in my life.\n\n" +
"We've had our share of arguments, annoying each other, laughing at random things, and probably driving each other crazy sometimes 😂.\n\n" +
"But underneath all of that, there's something I hope you always know:\n\n" +
"I'll always be there for you.\n\n" +
"I hope this year brings you countless reasons to smile, people who genuinely care about you, opportunities that make you proud, and memories that you'll look back on years from now and smile.\n\n" +
"Keep being exactly who you are.\n\n" +
"Don't ever forget how loved you are.\n\n" +
"And no matter how old we get, you'll always be my sister and I'll always be your annoying brother.\n\n" +
"Happy Birthday ❤️\n\n" +
"May this year be your happiest one yet.";


let letterStarted = false;


function startLetter() {

    if (letterStarted) {
        return;
    }

    letterStarted = true;

    const container =
        document.getElementById("letter-text");

    let index = 0;


    function type() {

        if (index < letter.length) {

            const character = letter.charAt(index);

            if (character === "\n") {

                container.innerHTML += "<br>";

            } else {

                container.innerHTML += character;

            }

            index++;

            setTimeout(type, 25);
        }
    }

    type();
}


// =========================
// FLOATING PARTICLES
// =========================

function createParticles() {

    const container =
        document.getElementById("particles");

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧",
        "·"
    ];


    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            8 + Math.random() * 12 + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.fontSize =
            10 + Math.random() * 20 + "px";

        container.appendChild(particle);
    }
}

createParticles();


// =========================
// CONFETTI
// =========================

function createConfetti() {

    const symbols = [
        "❤️",
        "💗",
        "✨",
        "🎉",
        "🌸",
        "♡"
    ];


    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");

        piece.innerText =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        piece.style.position = "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-30px";

        piece.style.fontSize =
            12 + Math.random() * 20 + "px";

        piece.style.zIndex = "9999";

        piece.style.pointerEvents = "none";


        document.body.appendChild(piece);


        const duration =
            2000 + Math.random() * 3000;


        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)",
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "cubic-bezier(.2,.7,.3,1)"
            }
        );


        setTimeout(function () {

            piece.remove();

        }, duration);
    }
}


// =========================
// RESTART
// =========================

function restart() {
    document.getElementById("page" + currentPage).classList.remove("active");

    setTimeout(function () {
        currentPage = 1;
        loveRound = 0;
        loveGameStarted = false;

        document.getElementById("page1").classList.remove("active");
        document.getElementById("loveGame").classList.add("hidden");
        document.getElementById("introStartBtn").classList.remove("hidden");
        document.getElementById("introPage").classList.add("active");

        document.getElementById("introSmall").textContent = "A tiny question from your betuuu...";
        document.getElementById("introTitle").textContent = "Didiiiiiiiii... Oooo Didiiiiii... 🥺";
        document.getElementById("introSubtitle").textContent = "Betuuu has something very important to ask you...";
        document.getElementById("roundNote").textContent = "";

        document.getElementById("envelope").classList.remove("open");
        document.getElementById("final-button").classList.add("hidden");
        document.getElementById("wish-message").innerHTML = "Make a wish... ✨";
        document.querySelectorAll(".candle").forEach(function (candle) { candle.classList.remove("blown"); });
        candlesBlown = 0;
        letterStarted = false;
        document.getElementById("letter-text").innerHTML = "";
    }, 400);
}