const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
// !!!Т.З.!!!
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const FORM_FIELDS_KEY = 'feedback-form-state';
const email = formRef.elements.email;
const message = formRef.elements.message;

const onFormInput = e => {
  const userData = {
    userMail: email.value,
    userMessage: message.value,
  };
  localStorage.setItem(FORM_FIELDS_KEY, JSON.stringify(userData));
};

const throttled = throttle(onFormInput, 500);

const storageValuesLogger = () => {
  const values = localStorage.getItem(FORM_FIELDS_KEY);
  const parsedValues = JSON.parse(values);
  const storageObj = {
    email: parsedValues.userMail,
    message: parsedValues.userMessage,
  };
  console.log(storageObj);
};

const onFormSubmit = e => {
  e.preventDefault();
  // console.log(localStorage.getItem(FORM_FIELDS_KEY));
  storageValuesLogger();
  e.currentTarget.reset();
  localStorage.removeItem(FORM_FIELDS_KEY);
};

const populateTextMessage = () => {
  const currentInputValues = localStorage.getItem(FORM_FIELDS_KEY);
  if (currentInputValues) {
    const parsedInputValues = JSON.parse(currentInputValues);

    email.value = parsedInputValues.userMail;
    message.value = parsedInputValues.userMessage;
  }
};

populateTextMessage();

formRef.addEventListener('input', throttled);
formRef.addEventListener('submit', onFormSubmit);
