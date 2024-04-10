import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorimgImp from '../img/error.svg';
import okimgImp from '../img/ok.svg';
const errorimg = '../img/error.svg';
const okimg = '../img/ok.svg';
const form = document.querySelector('.form');

const input = document.querySelector('input[name="delay"][required]');

input.addEventListener('keydown', function () {
  // Змінюємо колір рамки під час натискання на клавіші
  this.style.borderColor = '#4E75FF'; // Наприклад, червоний колір рамки
});
input.addEventListener('focus', function () {
  // Змінюємо колір рамки під час натискання на клавіші
  this.style.borderColor = '#4E75FF'; // Наприклад, червоний колір рамки
});

input.addEventListener('blur', function () {
  // Повертаємо колір рамки до мінулого стану
  this.style.borderColor = ''; // Скидаємо рамку до мінулого стану
});
function delayPromise(delay, radioChecked) {
  const data = { delay, radioChecked };

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (radioChecked === 'fulfilled') {
        res(data);
      } else {
        rej(data);
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements.delay.value);
  const radioChecked = form.elements.state.value;

  delayPromise(delay, radioChecked)
    .then(({ delay }) => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay} ms`,
        color: '#59a10d',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#326101',
        iconColor: '#fff',
        iconUrl: okimgImp,
      });
    })
    .catch(({ delay }) => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay} ms`,
        color: '#EF4040',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#B51B1B',
        iconColor: '#fff',
        iconUrl: errorimgImp,
      });
    });

  form.reset();
}
