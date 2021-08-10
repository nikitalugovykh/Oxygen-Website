const video = document.querySelector('.video');
const video__btn = document.querySelector('.video__btn');
const video__container = document.querySelector('.video__container');
const video__content = document.querySelector('.video__content');
const video__popup = document.querySelector('.video-popup');
const video__popup__content = document.querySelector('.video-popup__content');
const video_popup__close = document.querySelector('.video-popup__close');



window.addEventListener('resize', () => {
  video_popup__close.style.opacity = 0;
  const scrollPositionY = pageYOffset;
  const containerOffsetTop = video__container.offsetTop;
  const windowHeight = document.documentElement.clientHeight;
  if (video__popup.classList.contains('visible')) {

    video__popup.style.top = - (containerOffsetTop - scrollPositionY) + windowHeight/2 + 'px'; 

  }
  setTimeout(()=> {
    const video__popupHeight = video__popup__content.getBoundingClientRect().height;
    video_popup__close.style.top =  windowHeight/2 - video__popupHeight/2 + 'px';
    video_popup__close.style.right = 3 + '%';
    video_popup__close.style.opacity = 1;
  },1000);
})

window.addEventListener('click', (event) => {
  if (event.target === video__content) {
    video__popup.classList.toggle('visible');

    appearanceVideoPlayerOnFullscreen()
    settingVideoPlayer(video__content, video__popup__content)
  } else {
    video__popup.classList.toggle('visible');
    appearanceVideoPlayerOnFullscreen();
    settingVideoPlayer(video__popup__content, video__content)
  }

})


function appearanceVideoPlayerOnFullscreen () {
  const scrollPositionY = pageYOffset;
  const scrollPositionX = pageXOffset;
  const containerOffsetTop = video__container.offsetTop;
  const containerOffsetLeft = video.offsetLeft;
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  video_popup__close.style.opacity = 0;

  if (video__popup.classList.contains('visible')) {

    video__content.style.opacity = 0.3;
    video__btn.style.display = 'none';
    video__popup.style.top = - (containerOffsetTop - scrollPositionY) + windowHeight/2 + 'px';
    video__popup.style.left = 50 + '%';
    video__popup.style.width = 83 + 'vw';
    video__popup.style.height = 95 + 'vh';
    video__popup.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.backgroundColor = 'rgba(31, 31, 31, 0.9)';
    // video__popup.style.backgroundColor = 'rgba(51, 51, 51, 0.793)';
    
    video__popup__content.style.top = 50 + '%';
    video__popup__content.style.left = 50 + '%';
    video__popup__content.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'hidden';

    setTimeout(()=> {
      const video__popupHeight = video__popup__content.getBoundingClientRect().height;
      video_popup__close.style.top =  windowHeight/2 - video__popupHeight/2 + 'px';
      video_popup__close.style.right = 3 + '%';
      video_popup__close.style.opacity = 1;
    },1000);

  } else {
    video__content.style.opacity = 1;
    video__btn.style.display = 'block';
    video__popup.style.top = '50%';
    video__popup.style.left = '50%';
    video__popup.style.width = 100 + '%';
    video__popup.style.height = 350 + 'px';
    video__popup.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.backgroundColor = 'unset';

    document.documentElement.style.overflowX = 'visible';
    document.documentElement.style.overflowY = 'visible';
    video_popup__close.style.opacity = 0;
  }
}

function settingVideoPlayer(videobase, popup) {
  let timeShownVideo = videobase.currentTime;
  videobase.pause()
  
  popup.currentTime = timeShownVideo;
  popup.play()
}