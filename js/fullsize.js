import { pictureElement } from './miniature.js';
import { randomDescriptions } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('.body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const commmmentsFragment = document.createDocumentFragment();

// Список комментариев под фотографией:
const renderComments = function (pictureId) {
  socialComments.innerHTML='';
  let counter=0;
  randomDescriptions.find((photoElement) => photoElement.id === pictureId).comments.forEach((comment) => {
    counter=counter+1;
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src=comment.avatar;
    socialPicture.alt=comment.name;
    socialPicture.width=35;
    socialPicture.height=35;
    socialComment.appendChild(socialPicture);
    if (counter>5) {
      socialComment.classList.add('hidden');
    }
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent=comment.message;
    socialComment.appendChild(socialText);
    commmmentsFragment.appendChild(socialComment);
    const commentsArray = Array.from(commmmentsFragment.querySelectorAll('.social__comment'));
    const result = commentsArray.filter((element) => !element.classList.contains('hidden'));
    bigPicture.querySelector('.social__comment-count').textContent=`${result.length} из ${commentsArray.length} комментариев`;
  });
  socialComments.appendChild(commmmentsFragment);
};

// Вешаем обработчик на сетку
pictureElement.addEventListener('click' ,  (evt) => {
  if (evt.target.nodeName === 'A'|| evt.target.closest('a'))
  { bigPicture.classList.remove('hidden');
  const eventTarget = evt.target.closest('a');
  const pictureDataAtribute = Number(eventTarget.dataset.pictureId);


  bigPictureImg.querySelector('img').src=eventTarget.querySelector('.picture__img').src;
    bigPicture.querySelector('.big-picture__img img').alt=eventTarget.querySelector('.picture__img').alt;
    bigPicture.querySelector('.likes-count').textContent=eventTarget.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.social__caption').textContent=eventTarget.querySelector('.picture__img').alt;
    renderComments(pictureDataAtribute);
  }
  // Фиксируем контейнер с фотографиями
  body.classList.add('modal-open');
});



// Код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});
document.addEventListener('keydown' ,  (evt) =>{
  if (evt.code === 'Escape' ) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});
export {body};
