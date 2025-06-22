// Init AOS
AOS.init();

// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// On DOM ready: carousel + countdown
document.addEventListener('DOMContentLoaded', () => {
  // Testimonials carousel
  const slides = document.querySelectorAll('.testimonial-slide');
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3000);

  // Kick off countdown
  updateCountdown();
});

// Countdown function
function updateCountdown() {
  const now = new Date();
  const end = new Date();
  end.setHours(23,59,59,999);
  if (now > end) end.setDate(end.getDate() + 1);

  const diff = end - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('countdown-timer').innerText =
    `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;

  setTimeout(updateCountdown, 1000);
}
