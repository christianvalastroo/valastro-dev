const cover = document.querySelector('#cover');
const invitation = document.querySelector('#invitation');
const stage = document.querySelector('.stage');
const triggers = [document.querySelector('#openInvite'), document.querySelector('#openText')];
const birthdayMusic = document.querySelector('#birthdayMusic');
const countdown = document.querySelector('#countdown');
const eventTime = new Date('2026-09-24T20:30:00+02:00').getTime();

function updateCountdown() {
  const remaining = eventTime - Date.now();
  if (remaining <= 0) {
    countdown.classList.add('started');
    countdown.innerHTML = '<p>È IL MOMENTO</p><strong>CI VEDIAMO QUESTA SERA</strong>';
    return false;
  }

  const units = {
    countdownDays: Math.floor(remaining / 86400000),
    countdownHours: Math.floor((remaining % 86400000) / 3600000),
    countdownMinutes: Math.floor((remaining % 3600000) / 60000),
    countdownSeconds: Math.floor((remaining % 60000) / 1000),
  };
  Object.entries(units).forEach(([id, value]) => {
    document.querySelector(`#${id}`).textContent = String(value).padStart(2, '0');
  });
  return true;
}

updateCountdown();
const countdownTimer = window.setInterval(() => {
  if (!updateCountdown()) window.clearInterval(countdownTimer);
}, 1000);

function startMusic(restart = false) {
  if (restart) birthdayMusic.currentTime = 0;
  birthdayMusic.volume = 1;
  birthdayMusic.play().catch(() => {});
}

function playExplosion() {
  const sampleRate = 44100;
  const duration = 1.15;
  const samples = Math.floor(sampleRate * duration);
  const wav = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(wav);
  const write = (offset, value) => [...value].forEach((letter, index) => view.setUint8(offset + index, letter.charCodeAt(0)));
  write(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); write(8, 'WAVE');
  write(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); write(36, 'data'); view.setUint32(40, samples * 2, true);
  let smoothNoise = 0;
  for (let index = 0; index < samples; index += 1) {
    const time = index / sampleRate;
    const decay = Math.pow(1 - index / samples, 3);
    smoothNoise = smoothNoise * 0.86 + (Math.random() * 2 - 1) * 0.14;
    const bass = Math.sin(2 * Math.PI * (82 - time * 38) * time) * Math.exp(-time * 4.2);
    const crack = index < 1800 ? (Math.random() * 2 - 1) * (1 - index / 1800) : 0;
    const signal = Math.max(-1, Math.min(1, smoothNoise * decay * 2.2 + bass * 0.78 + crack * 0.45));
    view.setInt16(44 + index * 2, signal * 32767, true);
  }
  const source = URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));
  const explosion = new Audio(source);
  explosion.volume = 0.55;
  explosion.play();
  explosion.addEventListener('ended', () => URL.revokeObjectURL(source), { once: true });
}

cover.hidden = false;
cover.className = 'cover';
invitation.className = 'invitation';
invitation.setAttribute('aria-hidden', 'true');
window.scrollTo(0, 0);
birthdayMusic.load();

function openInvitation() {
  if (cover.classList.contains('opening')) return;
  playExplosion();
  const flash = document.querySelector('#flash');
  const sparks = document.querySelector('#sparks');
  const shockwaves = document.querySelector('#shockwaves');
  const confetti = document.querySelector('#confetti');
  startMusic(true);
  cover.classList.add('opening');
  window.setTimeout(() => {
    stage.classList.add('detonating');
    flash.classList.add('burst');
    shockwaves.classList.add('burst');
    for (let index = 0; index < 32; index += 1) {
      const spark = document.createElement('i');
      spark.className = 'spark';
      spark.style.setProperty('--angle', `${index * (360 / 32)}deg`);
      spark.style.animationDelay = `${Math.random() * 0.18}s`;
      sparks.appendChild(spark);
    }
    for (let index = 0; index < 18; index += 1) {
      const debris = document.createElement('b');
      debris.className = 'debris';
      debris.style.setProperty('--angle', `${Math.random() * 360}deg`);
      debris.style.setProperty('--distance', `${-(180 + Math.random() * 300)}px`);
      debris.style.animationDelay = `${Math.random() * 0.12}s`;
      sparks.appendChild(debris);
    }
  }, 820);
  window.setTimeout(() => cover.classList.add('leaving'), 1740);
  window.setTimeout(() => {
    cover.hidden = true;
    window.scrollTo(0, 0);
    invitation.classList.add('visible');
    invitation.setAttribute('aria-hidden', 'false');
    for (let index = 0; index < 70; index += 1) {
      const piece = document.createElement('i');
      piece.style.setProperty('--x', `${Math.random() * 100}vw`);
      piece.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
      piece.style.setProperty('--fall', `${2.8 + Math.random() * 3}s`);
      piece.style.setProperty('--delay', `${Math.random() * 1.8}s`);
      piece.style.setProperty('--spin', `${360 + Math.random() * 900}deg`);
      piece.dataset.tone = String(index % 3);
      confetti.appendChild(piece);
    }
    confetti.classList.add('falling');
  }, 2290);
}

triggers.forEach((trigger) => trigger.addEventListener('click', openInvitation));

const videoModal = document.querySelector('#videoModal');
const routeVideo = document.querySelector('#routeVideo');

document.querySelector('#showRoute').addEventListener('click', () => {
  videoModal.classList.add('visible');
  videoModal.setAttribute('aria-hidden', 'false');
  routeVideo.currentTime = 0;
  routeVideo.play();
});

document.querySelector('#closeVideo').addEventListener('click', () => {
  routeVideo.pause();
  videoModal.classList.remove('visible');
  videoModal.setAttribute('aria-hidden', 'true');
});
