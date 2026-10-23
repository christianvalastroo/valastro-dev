const cover = document.querySelector('#cover');
const invitation = document.querySelector('#invitation');
const openButtons = [
    document.querySelector('#openInvite'),
    document.querySelector('#openText'),
];
const replayButton = document.querySelector('#replayInvite');
const diamondRain = document.querySelector('#diamondRain');
const invitationDiamondRain = document.querySelector('#invitationDiamondRain');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let invitationRainStarted = false;

const music = document.querySelector('#invitationMusic');
const musicButton = document.querySelector('#toggleMusic');

function updateMusicButton() {
    const playing = !music.paused && !music.ended;
    musicButton.textContent = playing ? '♫ PAUSA' : '♫ ASCOLTA';
    musicButton.setAttribute('aria-label', playing ? 'Metti in pausa audio' : 'Riproduci audio');
    musicButton.setAttribute('aria-pressed', String(playing));
}

function playMusic() {
    music.play().catch(updateMusicButton);
}

['play', 'pause', 'ended'].forEach((event) => {
    music.addEventListener(event, updateMusicButton);
});
music.addEventListener('error', () => {
    musicButton.textContent = 'AUDIO NON DISPONIBILE';
    musicButton.setAttribute('aria-label', 'Audio non disponibile');
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.disabled = true;
});
musicButton.addEventListener('click', () => {
    if (music.paused || music.ended) playMusic();
    else music.pause();
});

function createDiamond(target, delay = 0, avoidEnvelope = true) {
    const diamond = document.createElement('i');
    let landingX;
    let landingY;

    do {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());

        landingX = 50 + Math.cos(angle) * radius * 42;
        landingY = 62.5 + Math.sin(angle) * radius * 8.5;
    } while (avoidEnvelope && landingX > 12 && landingX < 88 && landingY < 67);

    const perspective = (landingY - 54) / 17;
    const size = 5 + perspective * 6 + Math.random() * 3;
    const spin = 120 + Math.random() * 420;
    const sway = -16 + Math.random() * 32;

    diamond.style.setProperty('--diamond-x', `${landingX}%`);
    diamond.style.setProperty('--diamond-size', `${size}px`);
    diamond.style.setProperty('--diamond-delay', `${delay}s`);
    diamond.style.setProperty('--diamond-duration', `${2.1 + Math.random() * 1.15}s`);
    diamond.style.setProperty('--diamond-sway', `${sway}px`);
    diamond.style.setProperty('--diamond-soft-sway', `${sway * 0.45}px`);
    diamond.style.setProperty('--diamond-landing', `${landingY}vh`);
    diamond.style.setProperty('--diamond-midpoint', `${landingY * 0.48}vh`);
    diamond.style.setProperty('--diamond-spin', `${spin}deg`);
    diamond.style.setProperty('--diamond-mid-spin', `${spin * 0.45}deg`);

    diamond.addEventListener('animationend', () => {
        diamond.classList.add('settled');
        const settledDiamonds = target.querySelectorAll('.settled');

        if (settledDiamonds.length > 46) {
            settledDiamonds[0].remove();
        }
    }, { once: true });

    return diamond;
}

function startDiamondRain(target, avoidEnvelope, initialCount = 24) {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < initialCount; index += 1) {
        fragment.appendChild(createDiamond(target, Math.random() * 2.8, avoidEnvelope));
    }

    target.appendChild(fragment);

    if (!prefersReducedMotion.matches) {
        window.setInterval(() => {
            target.appendChild(createDiamond(target, 0, avoidEnvelope));
        }, 720);
    }
}

startDiamondRain(diamondRain, true);

function openInvitation() {
    if (cover.classList.contains('opening')) {
        return;
    }

    cover.classList.add('opening');
    playMusic();
    openButtons.forEach((button) => {
        button.disabled = true;
    });

    const exitDelay = prefersReducedMotion.matches ? 0 : 2050;
    const revealDelay = prefersReducedMotion.matches ? 20 : 2700;

    window.setTimeout(() => {
        cover.classList.add('leaving');
    }, exitDelay);

    window.setTimeout(() => {
        cover.hidden = true;
        invitation.hidden = false;
        invitation.classList.add('visible');
        if (!invitationRainStarted) {
            startDiamondRain(invitationDiamondRain, false, 18);
            invitationRainStarted = true;
        }
        invitation.setAttribute('tabindex', '-1');
        invitation.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, revealDelay);
}

function replayInvitation() {
    music.pause();
    music.currentTime = 0;
    invitation.hidden = true;
    invitation.classList.remove('visible');
    cover.hidden = false;
    cover.className = 'cover';
    openButtons.forEach((button) => {
        button.disabled = false;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('#openInvite').focus({ preventScroll: true });
}

openButtons.forEach((button) => {
    button.addEventListener('click', openInvitation);
});

replayButton.addEventListener('click', replayInvitation);

document.querySelectorAll('[data-dialog]').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector(`#${button.dataset.dialog}`).showModal();
    });
});

document.querySelectorAll('.info-dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
