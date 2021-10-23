import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

const createMarkup = images =>
  images
    .map(({ preview, original, description }) => {
      return `
      <a href="${original}">
        <img src="${preview}" alt="${description}" title="${description}" />
      </a>`;
    })
    .join('');
const markup = createMarkup(galleryItems);

const renderMarkup = strings => {
  galleryRef.insertAdjacentHTML('beforeend', strings);
};

renderMarkup(markup);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 500,
});

const onClick = e => {
  e.preventDefault();
  console.log(e.target);
  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    lightbox.open(e.target);
  }
};
galleryRef.addEventListener('click', onClick);
