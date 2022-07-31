const pictureList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const commmmentsFragment = document.createDocumentFragment();
let commentAmount= 5;

//  Загрузить ещё комментарии
const commentsLoaderFunction = () => {
  if ((socialComments.children.length-commentAmount) <= 5) {
    for (let i=commentAmount;i<socialComments.children.length;i++) {
      socialComments.children[i].classList.remove('hidden');
    }
    bigPicture.querySelector('.social__comment-count').textContent=`${socialComments.children.length} из ${socialComments.children.length} комментариев`;
    commentsLoader.classList.add('hidden');
    return;
  }
  for (let i=commentAmount;i<=commentAmount+5;i++) {
    if (socialComments.children[i]){
      socialComments.children[i].classList.remove('hidden');
      bigPicture.querySelector('.social__comment-count').textContent=`${i} из ${socialComments.children.length} комментариев`;
    }}
  commentAmount+=5;
};

// Функция создания комментария
const renderComments = function (data,pictureId) {
  socialComments.innerHTML= '';
  let counter=0;
  data.find((photoElement) => photoElement.id === pictureId).comments.forEach((comment) => {
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
  if (socialComments.children.length <= commentAmount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsLoader.addEventListener('click',commentsLoaderFunction);
};

// Функция открытия фотографии
const getOpenPhoto = function (data,evt) {
  if (evt.target.nodeName === 'A'|| evt.target.closest('a'))
  { bigPicture.classList.remove('hidden');
    const eventTarget = evt.target.closest('a');
    const pictureDataAtribute = Number(eventTarget.dataset.pictureId);
    bigPictureImg.querySelector('img').src=eventTarget.querySelector('.picture__img').src;
    bigPicture.querySelector('.big-picture__img img').alt=eventTarget.querySelector('.picture__img').alt;
    bigPicture.querySelector('.likes-count').textContent=eventTarget.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.social__caption').textContent=eventTarget.querySelector('.picture__img').alt;
    renderComments(data,pictureDataAtribute);
  }
  // Фиксируем контейнер с фотографиями
  body.classList.add('modal-open');
};
// Вешаем обработчик на сетку
const setMiniaturesClick = function (callBack) {
  pictureList.addEventListener('click' , (evt) => {
    callBack(evt);
  });
};
// Код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click',commentsLoaderFunction);
  commentAmount = 5;
});
document.addEventListener('keydown' ,  (evt) => {
  if (evt.code === 'Escape' ) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click',commentsLoaderFunction);
    commentAmount = 5;
  }
});

export {body,setMiniaturesClick,getOpenPhoto};
