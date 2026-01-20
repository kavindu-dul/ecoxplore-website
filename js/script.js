/* ---------- MOBILE NAV TOGGLE ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ---------- BOOKING FORM VALIDATION ---------- */
const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', function (e) {
    e.preventDefault(); // stay on page (no backend)
    clearErrors();

    let ok = true;

    const name = validateRequired('name', 'Name is required');
    const email = validateEmail('email');
    const phone = validateRequired('phone', 'Phone is required');
    const tour = validateRequired('tour', 'Please choose a tour');
    const date = validateRequired('date', 'Date is required');
    const participants = validateRequired('participants', 'Number of participants required');

    if (name && email && phone && tour && date && participants) {
        bookingForm.reset();
        showSuccess('Thank you! Your enquiry has been sent – we will reply within 24 hours.');
    }
});

function validateRequired(id, msg) {
    const el = document.getElementById(id);
    if (el.value.trim() === '') {
        showError(id, msg);
        return false;
    }
    return true;
}
function validateEmail(id) {
    const el = document.getElementById(id);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (el.value.trim() === '') {
        showError(id, 'Email is required');
        return false;
    }
    if (!re.test(el.value.trim())) {
        showError(id, 'Please enter a valid email');
        return false;
    }
    return true;
}
function showError(id, msg) {
    const box = document.getElementById(id);
    const err = document.createElement('small');
    err.className = 'error'; err.textContent = msg;
    box.classList.add('input-error');
    box.parentElement.appendChild(err);
}
function clearErrors() {
    document.querySelectorAll('.error').forEach(e => e.remove());
    document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
}
function showSuccess(msg) {
    const div = document.createElement('div');
    div.className = 'success'; div.textContent = msg;
    bookingForm.prepend(div);
    setTimeout(() => div.remove(), 5000);
}