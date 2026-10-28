const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Dropdown menu: opens by click and closes when a menu item is selected.
dropdownToggle.addEventListener('click', () => {
  const isOpen = dropdownMenu.classList.toggle('open');
  dropdownToggle.setAttribute('aria-expanded', String(isOpen));
});
dropdownMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Mobile navigation.
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('mobile-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Do not allow a visit date in the past.
const dateInput = document.getElementById('tanggal');
const localToday = new Date();
const localDateString = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, '0')}-${String(localToday.getDate()).padStart(2, '0')}`;
dateInput.min = localDateString;

// Form validation and on-page confirmation (no data is sent to a server).
const visitForm = document.getElementById('visitForm');
const feedback = document.getElementById('formFeedback');
visitForm.addEventListener('submit', event => {
  event.preventDefault();
  feedback.className = 'form-feedback';
  if (!visitForm.checkValidity()) {
    visitForm.reportValidity();
    feedback.textContent = 'Periksa kembali kolom wajib yang belum terisi.';
    feedback.classList.add('error');
    return;
  }
  const formData = new FormData(visitForm);
  const visitorName = formData.get('nama').trim();
  const destination = formData.get('minat');
  const dateParts = formData.get('tanggal').split('-');
  const displayDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2])).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  feedback.innerHTML = `<strong>Rencana kunjungan berhasil dibuat, ${escapeHTML(visitorName)}!</strong><br>Minat wisata: ${escapeHTML(destination)} · Tanggal: ${displayDate}. Simpan informasi ini untuk referensi kunjunganmu.`;
  feedback.classList.add('success');
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
