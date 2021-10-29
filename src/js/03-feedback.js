const { entries } = require('lodash');
const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
// !!!Т.З.!!!
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const STORAGE_KEY = 'feedback-form-state';
const obj = {};
const initForm = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    Object.entries(parsedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
      obj[name] = value;
    });
  }
};

initForm();

console.log(formRef.elements);
const onSubmit = e => {
  e.preventDefault();
  const formData = new FormData(formRef);
  formData.forEach((x, y) => {
    console.log(x, y);
  });
};
formRef.addEventListener('submit', onSubmit);

const onInput = e => {
  obj[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  console.log(obj);
};
formRef.addEventListener('input', onInput);
