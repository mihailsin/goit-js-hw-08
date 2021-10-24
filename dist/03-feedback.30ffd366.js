const formRef = document.querySelector('.feedback-form');
console.dir(formRef);
// Т.З.
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const onFormInput = (e)=>{
    const { elements: { email , message  } ,  } = e.currentTarget;
    const userData = {
        userMail: email.value,
        userMessage: message.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};
const onFormSubmit = (e)=>{
    e.preventDefault();
    const { elements: { email , message  } ,  } = e.currentTarget;
    console.log(localStorage('feedback-form-state'));
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
};
const populateTextMessage = ()=>{
    const currentInputValues = localStorage.getItem('feedback-form-state');
    if (currentInputValues) {
        const parsedInputValues = JSON.parse(currentInputValues);
        console.log(parsedInputValues);
        const { elements: { email , message  } ,  } = formRef;
        email.value = parsedInputValues.userMail;
        message.value = parsedInputValues.userMessage;
    }
};
populateTextMessage();
formRef.addEventListener('input', _.throttle(()=>{
}, 500));
formRef.addEventListener('submit', onFormSubmit);

//# sourceMappingURL=03-feedback.30ffd366.js.map
