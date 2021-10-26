// !!!Т.З!!!!
// Ознакомься с документацией библиотеки Vimeo плеера.
// Добавь библиотеку как зависимость проекта через npm.
// Инициализируй плеер в файле скрипта как это описано в секции pre-existing player,
//  но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
// Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
// Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
// Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
const throttle = require('lodash.throttle');
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

if (localStorage.getItem(CURRENT_TIME_KEY)) {
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY));
}

const onPlay = e => {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(CURRENT_TIME_KEY, seconds);
    })
    .catch(function (error) {
      console.log(error.name);
      console.log(error.message);
    });
};

const throttled = throttle(onPlay, 1000);

player.on('timeupdate', throttled);
