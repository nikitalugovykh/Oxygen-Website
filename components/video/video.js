const video = document.querySelector('.video');
const video__container = document.querySelector('.video__container');
const video__popup = document.querySelector('.video-popup');
const video__popup__content = document.querySelector('.video-popup__content');


video__container.addEventListener('click', () => {
  video__popup.classList.toggle('visible');
  const scrollPositionY = pageYOffset;
  const scrollPositionX = pageXOffset;
  const containerOffsetTop = video__container.offsetTop;
  const containerOffsetLeft = video.offsetLeft;
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;

  if (video__popup.classList.contains('visible')) {

    video__popup.style.top = - (containerOffsetTop - scrollPositionY) + windowHeight/2 + 'px';

    video__popup.style.left = 50 + '%';
    video__popup.style.width = 95 + 'vw';
    video__popup.style.height = 95 + 'vh';
    video__popup.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.backgroundColor = 'rgba(31, 31, 31, 0.9)';
    // video__popup.style.backgroundColor = 'rgba(51, 51, 51, 0.793)';
    
    video__popup__content.style.top = 50 + '%';
    video__popup__content.style.left = 50 + '%';
    video__popup__content.style.transform = 'translate3d(-50%, -50%, 0)';
s
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'hidden';


  } else {

    video__popup.style.top = '50%';
    video__popup.style.left = '50%';
    video__popup.style.width = 100 + '%';
    video__popup.style.height = 350 + 'px';
    video__popup.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.backgroundColor = 'unset';

    document.documentElement.style.overflowX = 'visible';
    document.documentElement.style.overflowY = 'visible';
  }
})

window.addEventListener('resize', () => {
  const scrollPositionY = pageYOffset;
  const containerOffsetTop = video__container.offsetTop;
  const windowHeight = document.documentElement.clientHeight;
  console.log('lol');
  if (video__popup.classList.contains('visible')) {

    video__popup.style.top = - (containerOffsetTop - scrollPositionY) + windowHeight/2 + 'px'; 
  }
})
