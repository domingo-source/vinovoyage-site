/* ============================================================
   VinoVoyage — script.js
   Minimal interactivity: year, nav shadow, reveal-on-scroll, form.
   ============================================================ */

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add a hairline under the nav once the page scrolls
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal elements as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ------------------------------------------------------------
   Waitlist form
   ------------------------------------------------------------
   By default this just validates and shows a success message
   (no data is stored). To actually collect emails, set
   FORM_ENDPOINT below to a Formspree / Web3Forms / Basin URL,
   or swap to your provider's embed. See the README.
------------------------------------------------------------ */
const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/yourid'

const form = document.getElementById('signup');
const input = document.getElementById('email');
const msg = document.getElementById('signupMsg');

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function setMessage(text, type) {
  msg.textContent = text;
  msg.classList.remove('is-success', 'is-error');
  if (type) msg.classList.add(type === 'success' ? 'is-success' : 'is-error');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = input.value.trim();

  if (!isValidEmail(email)) {
    input.classList.add('is-invalid');
    setMessage('Please enter a valid email address.', 'error');
    input.focus();
    return;
  }
  input.classList.remove('is-invalid');

  // No endpoint configured yet — confirm locally.
  if (!FORM_ENDPOINT) {
    setMessage("You're on the list — thanks! We'll be in touch. (Demo mode: connect a form endpoint to start collecting emails.)", 'success');
    form.reset();
    return;
  }

  // Real submission.
  try {
    setMessage('Joining…', null);
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });
    if (res.ok) {
      setMessage("You're on the list — thanks! We'll be in touch.", 'success');
      form.reset();
    } else {
      setMessage('Something went wrong. Please try again, or email hello@vinovoyage.ai.', 'error');
    }
  } catch (err) {
    setMessage('Network error. Please try again, or email hello@vinovoyage.ai.', 'error');
  }
});

// Clear invalid state as the user types
input.addEventListener('input', () => {
  if (input.classList.contains('is-invalid') && isValidEmail(input.value)) {
    input.classList.remove('is-invalid');
    setMessage('', null);
  }
});
