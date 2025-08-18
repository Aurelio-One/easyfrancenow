// 1. Init AOS
AOS.init()

// 2. Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden')
})

// 3. On DOM ready: carousel, countdown & AJAX form
document.addEventListener('DOMContentLoaded', () => {
  // Carousel rotation
  const slides = document.querySelectorAll('.testimonial-slide')
  let idx = 0
  setInterval(() => {
    slides[idx].classList.remove('active')
    idx = (idx + 1) % slides.length
    slides[idx].classList.add('active')
  }, 3000)

  // Countdown
  updateCountdown()

  // AJAX Form submission + feedback
  const form = document.querySelector('form[name="contact"]')
  const feedback = document.getElementById('form-feedback')

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = new FormData(form)

    fetch('/', {
      method: 'POST',
      body: data,
    })
      .then(() => {
        form.reset()
        feedback.classList.remove('hidden')
      })
      .catch(() => {
        feedback.textContent = 'Oops! Something went wrong. Please try again.'
        feedback.classList.remove('hidden')
      })
  })
})

// 4. Countdown logic (resets each midnight)
function updateCountdown() {
  const now = new Date()
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  if (now > end) end.setDate(end.getDate() + 1)

  const diff = end - now
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  document.getElementById('countdown-timer').innerText = `${String(h).padStart(
    2,
    '0'
  )}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`

  setTimeout(updateCountdown, 1000)
}

function trackCheckoutStart() {
    console.log('InitiateCheckout triggered') // <--- à ajouter ici

  // Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout')
  }

  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'EUR',
      value: 97,
    })
  }
}
