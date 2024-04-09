// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');

let timerId = null;

btn.disabled = true;
btn.classList.add('disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      date.disabled = true;
      btn.disabled = true;
      btn.classList.remove('active');
      btn.classList.add('disabled');
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        titleColor: '#fff',
        messageColor: '#fff',
        color: '#EF4040',
        // timeout: 150000,
        iconUrl:
          'https://github.com/Sergii-Minko/goit-js-hw-10/blob/main/src/img/error.svg',
        class: 'custom-close-button',
        onOpening: () => {
          const xbtn = document.querySelector('.iziToast-close');

          xbtn.style.color = '#fff'; // Змінюємо колір кнопки зачинення
          xbtn.style.setProperty(
            'background-image',
            'url("https://github.com/Sergii-Minko/goit-js-hw-10/blob/main/src/img/btn.svg")'
          );
          xbtn.style.setProperty('opacity', '1');
          xbtn.style.setProperty('background-size', '12px');
          const messagealert = document.querySelector('.iziToast');
          messagealert.style.setProperty('width', '340px');
          messagealert.style.setProperty('height', '64px');
          messagealert.style.setProperty('display', 'flex');
          messagealert.style.setProperty('align-items', 'center');
          messagealert.style.setProperty('justify-content', 'center');
        },
        onClosing: () => {
          date.disabled = false;
          btn.disabled = true;
          btn.classList.remove('active');
          btn.classList.add('disabled');
        },
      });
    } else {
      btn.disabled = false;
      btn.classList.add('active');
      btn.classList.remove('disabled');
    }
  },
};

flatpickr(date, options);

btn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  spans.forEach(item => item.classList.toggle('end'));
  date.disabled = true;
  btn.disabled = true;
  btn.classList.remove('active');
  btn.classList.add('disabled');
  timerId = setInterval(() => {
    const chosenDate = new Date(date.value);
    const timeToFinish = chosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      spans.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
      date.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
