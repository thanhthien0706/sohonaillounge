const bookingForm = document.querySelector('.booking__form');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn! Đây là bản demo tĩnh — vui lòng gọi hotline để đặt lịch.');
  });
}
