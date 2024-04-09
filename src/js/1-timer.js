// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
const errorimg = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAllBMVEUAAAD////+//3+//3+//3///////z+//3+//3+//3////////////9//3////+//39//3///3////////////+//3+//39//3///z+//z+//7///3///3///3///3////////+//3+//3+//3+//z+//3+//7///3///z////////+//79//3///3///z///v+//3///+trXouAAAAMHRSTlMAB+j87RBf+PXiCwQClSPYhkAzJxnx05tSyadzcmxmHRbp5d7Gwrh4TDkvsYt/WkdQzCITAAAB1UlEQVRYw+3XaXKCQBCGYSIIighoxCVqNJrEPfly/8vFImKXduNsf/Mc4K1y7FnwlMLQc/bUbj85R6bA1LXRDICg6RjJcZa7NQYtnLUGTpERSiOXxrOPkv9s30iGKDmtbYir3H7OUHJa2ylAuvZzRvzUfs7Ii/2cgfTt54x82s8ZSM848gJmYtroQzA2jHwA+LkBIEuMGt+QIng1igzlyMrkuP2CyOi47axRaYTL5jhDJehoR+aovC29s3iIyly3Eb+hRCvZo2qsGTnhKr2cLDS+J73GsqBI9W80UCmWWpEuhIjh6ZRGjyNRarjzKGJ2Ou2himCvjHwqI+rTqQdlRH06TZQR9ek0hiqiPp06mV4ke7QPX6ERUZxO8Uo3sqrfhxvoRrCpvXwL/UjR9GRHMIvLgke4d5QbiwhM6JV2YKKF4vIl7XIBkwm4keryJVmvk/TfwcmPwQNkUQuyA2/sYGwnXL7GPu4bW1jYsmevrNj09/MGZMOEPXslQVqO8hqykD17JfPHP/bmo2yGGpdZiH3IZvzZa7B3+IdDjjpjesHJcvbs5dZ/e+cddVoDdvlq7x12Nac+iN7e4R8OXTjp0pw5CGnOLNDEzeBs5gVwFniAO+8f8wvfeXP2hyqnmwAAAABJRU5ErkJggg==') no-repeat 50% 50%`;
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
        timeout: 150000,
        iconUrl: '../img/error.svg',
        class: 'custom-close-button',
        onOpening: () => {
          const xbtn = document.querySelector('.iziToast-close');

          xbtn.style.color = '#fff'; // Змінюємо колір кнопки зачинення
          xbtn.style.setProperty('background-image', 'URL("../img/btn.png")');
          // 'URL("../img/btn.png")';

          xbtn.style.setProperty('opacity', '1');
          xbtn.style.setProperty('fill', '#fff');
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
