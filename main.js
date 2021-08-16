// Burger
const headerBurger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');
const body = document.body;


headerBurger.addEventListener('click', ( )=> {
    headerBurger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
})

window.addEventListener('resize', ()=> {
    if(!isVisible(headerBurger)) {
        body.classList.remove('lock');
        headerBurger.classList.remove('active');
        menu.classList.remove('active');
    }
})

function isVisible(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0;
  }

// .............................

// Header scroll Down
const btnScrollDown = document.querySelector('.header__btn-scroll-down');


btnScrollDown.addEventListener('click', (ev) => {
    ev.preventDefault();
    const about = document.querySelector('.about');
    // const currPosition = window.pageXOffset;
    about.scrollIntoView({behavior: 'smooth'});
})

// ...........................

// Hide Menu Bar
const headerTop = document.querySelector('.header__top')

let didScroll;
let lastScrollTop = 0;
let delta = 22;
let navbarHeight = headerTop.offsetHeight;

window.addEventListener('scroll', function(event) {
  didScroll = true;

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
    // 
      let currentScroll = window.pageYOffset;
      
      let documentHeight = Math.max (
        document.body.scrollHeight, document.documentElement.scrollHeight, 
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      
      let windowHeight = document.documentElement.clientHeight

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - currentScroll) <= delta){
          return;
      }

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (menu.classList.contains('active')) {
        headerTop.classList.remove('nav-up');
        headerTop.classList.add('nav-down');
      } 
      else if (currentScroll > lastScrollTop && currentScroll > navbarHeight ) {
          // Scroll Down
          headerTop.classList.remove('nav-down');
          headerTop.classList.add('nav-up');
      } 

      else {
          // Scroll Up
          if(currentScroll + windowHeight < documentHeight) {
            headerTop.classList.remove('nav-up');
            headerTop.classList.add('nav-down');
          }
      }
      
      lastScrollTop = currentScroll;
    }
});


// .............................

// Animation Scroll

const animItems = document.querySelectorAll('._anim-items');
const animItemsLeft = document.querySelectorAll('._anim-items-left');

if(animItems || animItemsLeft) {
    window.addEventListener('scroll', animOnScroll);


    function animOnScroll(params) {
        for (let i = 0; i < animItemsLeft.length; i++) {
            const animItem = animItemsLeft[i];
            // высота самого item
            const animItemHeight = animItem.offsetHeight;
            // высота до item от верха документа (по факту)
            const animItemOffset = offset(animItem).top;
            // при достижении 1/4 высоты item или в случае когда item больше высоты окна браузера
            //  при достижении 1/4 высоты окна браузера добавляется класс _active
            const animStart = 4;

            let animItemPoint = window.innerHeight  - animItemHeight / animStart; 
            // console.log('window.pageYOffset: ', window.pageYOffset);
            // console.log('animItemOffset: ', animItemOffset);
            // console.log('animItemPoint: ', animItemPoint)
            if(animItemHeight > window.innerHeight ) {
                animItemPoint = window.innerHeight  - window.innerHeight / animStart; 
            }

            if((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if(!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
            
        }
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            // высота самого item
            const animItemHeight = animItem.offsetHeight;
            // высота до item от верха документа (по факту)
            const animItemOffset = offset(animItem).top;
            // при достижении 1/4 высоты item или в случае когда item больше высоты окна браузера
            //  при достижении 1/4 высоты окна браузера добавляется класс _active
            const animStart = 4;

            let animItemPoint = window.innerHeight  - animItemHeight / animStart; 
            // console.log('window.pageYOffset: ', window.pageYOffset);
            // console.log('animItemOffset: ', animItemOffset);
            // console.log('animItemPoint: ', animItemPoint)
            if(animItemHeight > window.innerHeight ) {
                animItemPoint = window.innerHeight  - window.innerHeight / animStart; 
            }

            if((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if(!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
            
        }
    }
    offset = (el) => {
        const rect  = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // console.log('rect.top: ', rect.top);
        // console.log('scrollTop: ', scrollTop);


                return {
            top: rect.top  + scrollTop,
            left: rect.left + scrollLeft,
        }
    }
    setTimeout(()=> {
        animOnScroll();
    }, 300)
}


// .............................

// Exspertise percentage

const animExpertise = document.querySelector('.expertise__columns');
const expertiseItem_1 = document.querySelector('#expertise__progress-line-1');
const expertiseItem_2 = document.querySelector('#expertise__progress-line-2');
const expertiseItem_3 = document.querySelector('#expertise__progress-line-3');
const expertise__contentPerc_1 = document.querySelector('.expertise__content-percentage-1');
const expertise__contentPerc_2 = document.querySelector('.expertise__content-percentage-2');
const expertise__contentPerc_3 = document.querySelector('.expertise__content-percentage-3');


animExpertise.addEventListener('transitionend', ()=> {
    
    let start = Date.now(); 

    let timer = setInterval(function() {
    let timePassed = Date.now() - start;

    if (timePassed >= 1000) {
        clearInterval(timer); 
        return;
    }
    draw(timePassed);
}, 20);

    function draw(timePassed) {
        expertiseItem_1.style.width = timePassed / 11.11 + '%';
        expertise__contentPerc_1.style.left = timePassed / 11.11 + '%';

        expertiseItem_2.style.width = timePassed / 12.5 + '%';
        expertise__contentPerc_2.style.left = timePassed / 12.5  + '%';

        expertiseItem_3.style.width = timePassed / 11.76 + '%';
        expertise__contentPerc_3.style.left = timePassed / 11.76  + '%';


    }
})

// ......................................

// Gallety................................


const portfolio__menu = document.querySelector('.portfolio__menu');
const items_wrapper = document.querySelector('.portfolio__items-wrapper');
const menu_items = document.querySelectorAll('.portfolio__menu_item');
const portfolio__btn_prev = document.querySelector('.portfolio__btn_prev');
const portfolio__btn_next = document.querySelector('.portfolio__btn_next');

let nextRightElement, nextLeftElement;

let position = 0;


// NEXT ..........

portfolio__btn_next.addEventListener('click', ()=> { 
    
    nextRightElement = findNextElement();
    const cordsRightElem = nextRightElement.getBoundingClientRect().right;
    let {right: menuCord_r} = portfolio__menu.getBoundingClientRect();

    position -= cordsRightElem - menuCord_r;
    items_wrapper.style.transform = `translateX(${position}px)`;

    findNextLeftElement()
});

// PREV ..........

portfolio__btn_prev.addEventListener('click', ()=> {

    nextLeftElement = findNextLeftElement();
    const cordsLeftElem = nextLeftElement.getBoundingClientRect().left || 0;

    let {left: menuCord_l} = portfolio__menu.getBoundingClientRect();

  
    position += menuCord_l - cordsLeftElem;
    items_wrapper.style.transform = `translateX(${position}px)`;



});



function findNextElement(){

  const menuCord_r = portfolio__menu.getBoundingClientRect().right;
  
  for (let i = 0; i < menu_items.length; i++) {
    const item = menu_items[i];
    const menuItem = item.dataset.item;
    if(((checkCords(menuItem).left > menuCord_r) ||
        ((checkCords(menuItem).left < menuCord_r) && (checkCords(menuItem).right > menuCord_r)))) { 
            return item 
    } 
  }
  return nextRightElement
}

function findNextLeftElement(){
  const menuCord_l = portfolio__menu.getBoundingClientRect().left;
  let resultItem;
  for (let i = 0; i < menu_items.length; i++) {
    const item = menu_items[i];
    const menuItem = item.dataset.item;
    if(((menuCord_l > checkCords(menuItem).left) || 
        ((checkCords(menuItem).left < menuCord_l) && (checkCords(menuItem).right > menuCord_l)))) { 
            resultItem = item
        }
  }
  return resultItem ? resultItem : nextLeftElement
}


function checkCords(name) {
  for (const item of menu_items) {
    if(item.dataset.item === name) {
      return item.getBoundingClientRect()
    }
  }
}

findNextElement()
findNextLeftElement()

let standardCountView = 9;
let startLoop = 0;
let imgRendered = 0;
let dataGridLetter = ['a','b','c','d','e','f','g','h', 'i'];
let activeTag;
let firstPreview = true;

const portfolio__items = document.querySelector('.portfolio__items');
const gallery = document.querySelector('.portfolio__gallery');
const btn_more = document.querySelector('#portfolio__btn-more');



portfolio__menu.addEventListener('click', (e)=> {
  
  menu_items.forEach(item => {
    item.classList.remove('link-active');
    if(e.target === item) {
      firstPreview = true;
      standardCountView = 9;
      startLoop = 0;
      imgRendered = 0;
      btn_more.hidden = false;
      removeShowMoreContent()
      if (item.dataset.item === 'ALL') {
        activeTag = undefined;
        item.classList.add('link-active');
        renderMainImgs(portfolio__items);
        return 
      }
      activeTag = e.target;
      activeTag.classList.add('link-active');

      renderMainImgs(portfolio__items, getBaseByTag(e.target.dataset.item));
    }
  }) 
})

btn_more.addEventListener('click', () => showMore(activeTag))


function showMore(activeTag) {
  const wrapperForMore = document.createElement('div');
  wrapperForMore.className = 'portfolio__show-more portfolio__items';

  if (activeTag !== undefined) {
      let baseForShowMore = getBaseByTag(activeTag.dataset.item);

      if (firstPreview || baseForShowMore.length - imgRendered > 0) {
        btn_more.before(wrapperForMore); 
        renderMainImgs(wrapperForMore, baseForShowMore);
      }
      return
   } else {
     if (firstPreview || (dataImg.length - imgRendered > 0)) {
        btn_more.before(wrapperForMore); 
        renderMainImgs(wrapperForMore);
     }  
     return
   }

}


function removeShowMoreContent () {
  const wrapperForMore = document.querySelectorAll('.portfolio__show-more');
  wrapperForMore.forEach(item => {
    item.remove()
  })
}

function renderMainImgs(container, dataForRender = dataImg) {
  container.innerHTML = '';
 
  if (!firstPreview) {
    standardCountView += 9
    startLoop += 9;
  }
  for (let i = startLoop, n = 0; i < standardCountView; i++, n++) {
    if (dataForRender[i] === undefined) {
      break 
    }
    const wrapper= document.createElement('div');
    wrapper.classList.add('portfolio__item-img');
    wrapper.classList.add(`${dataGridLetter[n]}`);


    const img = document.createElement('img');
    img.alt = `${dataForRender[i].description}`;
    img.classList.add('portfolio__img');
    img.src = `./img/gallery/${dataForRender[i].name}`;
    

    const div_title = document.createElement('div');
    div_title.classList.add('portfolio__item-title');
    div_title.textContent = 'OCCA CUPIDATAT'

    
    const div_descr = document.createElement('div');
    div_descr.classList.add('portfolio__item-descr');
    div_descr.textContent = 'DESIGN'


    wrapper.append(img, div_title, div_descr);
   
    container.append(wrapper);
    imgRendered +=1;
  }
  firstPreview = false;
  functionRemoveBtnShowMore()
}
  function getBaseByTag(dataAttribute) {
    const dataForRenderWithNewTags = dataImg.filter(item => {
      for (const tag of item.tags) {
       if (dataAttribute === tag) {
         return tag
       }
      }
    });
    return dataForRenderWithNewTags
  }

  function functionRemoveBtnShowMore() {
    if (activeTag !== undefined) {
      let baseForShowMore = getBaseByTag(activeTag.dataset.item);

      if (baseForShowMore.length - imgRendered <= 0) {
        btn_more.hidden = true;
        return
      }
      btn_more.hidden = false
   } else {
     if ((dataImg.length - imgRendered <= 0)) {
      btn_more.hidden = true;
      return 
     }  
     false
   }

  }

renderMainImgs(portfolio__items)


//........................................


// Video .................................

const video = document.querySelector('.video');
const video__body = document.querySelector('.video__body');
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
  
  if (event.target === video__content || event.target === video__btn) {
    video__popup.classList.toggle('visible');

    appearanceVideoPlayerOnFullscreen()
    settingVideoPlayer(video__content, video__popup__content)
  } 
  else if (video__popup.classList.contains('visible') && event.target !== video__popup__content){
    video__popup.classList.remove('visible');
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
    video__popup.style.left = 50 + '%' ;
    video__popup.style.width = 83 + 'vw';
    video__popup.style.height = 95 + 'vh';
    video__popup.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.backgroundColor = 'rgba(31, 31, 31, 0.9)';
    // video__popup.style.backgroundColor = 'rgba(51, 51, 51, 0.793)';
    
    video__popup__content.style.top = 50 + '%';
    video__popup__content.style.left = 50 + '%';
    video__popup__content.style.transform = 'translate3d(-50%, -50%, 0)';
    document.documentElement.style.padding = `0 ${findWidthOfScroll()}px 0 0`;
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    headerTop.classList.remove('nav-down');
    headerTop.classList.add('nav-up');

    setTimeout(()=> {
      const video__popupHeight = video__popup__content.getBoundingClientRect().height;
      video_popup__close.style.top =  windowHeight/2 - video__popupHeight/2 + 'px'
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

    document.documentElement.style.padding = `0 0 0 0`;
    document.documentElement.style.overflowX = 'visible';
    document.documentElement.style.overflowY = 'visible';
    video_popup__close.style.opacity = 0;
  }
}

function settingVideoPlayer(videobase, videoWitchPlay) {
  let timeShownVideo = videobase.currentTime;
  videobase.pause()
  
  videoWitchPlay.currentTime = timeShownVideo;
  let playPromise = videoWitchPlay.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      videobase.pause()

    })
    .catch(error => {
      console.log('lol');
    });
  }
}

function findWidthOfScroll() {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();
  return scrollWidth
}


// ..........................................



// Touch slider


let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider__wrapper'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slider__item'),
  arrows = document.querySelectorAll('.slider__control'),
  prev = document.querySelector('.slider__control.icon-arrow-left'),
  next = document.querySelector('.slider__control.icon-arrow-right'),
  paginationCircles = document.querySelectorAll('.slider__circle'),
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.15,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime;

function getEvent (event) {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
};
function slide () {
  if (transition) {
    sliderTrack.style.transition = 'transform .5s';
  }
  sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
  prev.classList.toggle('disabled', slideIndex === 0);
  next.classList.toggle('disabled', slideIndex === slides.length-1);
  paginationCircles.forEach((item, index) => {
    item.classList.remove('slider__circle--active');
    if (index === slideIndex) {
      item.classList.add('slider__circle--active');
    }
  })
};
function swipeStart (ev) {
  let evt = getEvent(ev);

  if (allowSwipe) {

    swipeStartTime = Date.now();
    
    transition = true;

    nextTrf = (slideIndex + 1) * -slideWidth;
    prevTrf = (slideIndex - 1) * -slideWidth;

    posInit = posX1 = evt.clientX;
    posY1 = evt.clientY;

    sliderTrack.style.transition = '';

    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mouseup', swipeEnd);

    sliderList.classList.remove('grab');
    sliderList.classList.add('grabbing');
  }
};
function swipeAction (ev) {

  let evt = getEvent(ev),
    style = sliderTrack.style.transform,
    transform = +style.match(trfRegExp)[0];

  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;

  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;

  if (!isSwipe && !isScroll) {
    let posY = Math.abs(posY2);
    if (posY > 7 || posX2 === 0) {
      isScroll = true;
      allowSwipe = false;
    } else if (posY < 7) {
      isSwipe = true;
    }
  }

  if (isSwipe) {
    if (slideIndex === 0) {
      if (posInit < posX1) {
        setTransform(transform, 0);
        return;
      } else {
        allowSwipe = true;
      }
    }

    // запрет ухода вправо на последнем слайде
    if (slideIndex === --slides.length) {
      if (posInit > posX1) {
        setTransform(transform, lastTrf);
        return;
      } else {
        allowSwipe = true;
      }
    }

    if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
      reachEdge();
      return;
    }

    sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
  }

};
function swipeEnd () {
  posFinal = posInit - posX1;

  isScroll = false;
  isSwipe = false;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  sliderList.classList.add('grab');
  sliderList.classList.remove('grabbing');

  if (allowSwipe) {
    swipeEndTime = Date.now();
    if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
      if (posInit < posX1) {
        slideIndex--;
      } else if (posInit > posX1) {
        slideIndex++;
      }
    }

    if (posInit !== posX1) {
      allowSwipe = false;
      slide();
    } else {
      allowSwipe = true;
    }

  } else {
    allowSwipe = true;
  }

};

function setTransform (transform, comapreTransform) {
  if (transform >= comapreTransform) {
    if (transform > comapreTransform) {
      sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
    }
  }
  allowSwipe = false;
};

function reachEdge() {
  transition = false;
  swipeEnd();
  allowSwipe = true;
};

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart, {passive:true});
slider.addEventListener('mousedown', swipeStart, {passive:true});

paginationCircles.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    if(event.target === item) {
        slideIndex = index;
        slide();
    }
  })
})
arrows.forEach(item => {
  item.addEventListener('click', function(event) {
    let target = event.target;
  
    if (target.classList.contains('icon-arrow-right')) {
      slideIndex++;
    } else if (target.classList.contains('icon-arrow-left')) {
      slideIndex--;
    } else {
      return;
    }
  
    slide();
  });
})

window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;
  slide()
})

// ...............

// Animation for pricing cards

if(!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))){
   // Init
   const pricing__containers = document.querySelectorAll(".pricing__item-container");
   const pricing__items = document.querySelectorAll(".pricing__item");
   const mediaQuerySize = 768;
 
   // Mouse
   class Mouse {
     constructor() {
       this._x = 0;
       this._y = 0;
       this.x = 0;
       this.y = 0;
     }
     updatePosition (event) {
       let e = event || window.event;
       this.x = e.clientX - this._x;
       this.y = (e.clientY + pageYOffset - this._y) * -1;
     };
     setOrigin (e) {
       this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
       this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
     };
     show () {
         return "(" + this.x + ", " + this.y + ")";
       };
   };
 
 
   
 const dataMouse = Array.from(pricing__containers).map(container => {
     let _obj = new Mouse();
     _obj.setOrigin(container);
     return _obj
 })  
 
   //-----------------------------------------
 
   let counter = 0;
   let updateRate = 10;
   const isTimeToUpdate = () => {
     return counter++ % updateRate === 0;
   };
 
   //-----------------------------------------
 
   const onMouseEnterHandler = event => {
     update(event);
   };
 
   const onMouseLeaveHandler = () => {
     pricing__items.forEach(item => {
         item.style = ""
     })
     ;
   };
 
   const onMouseMoveHandler = (event) => {
     if (isTimeToUpdate()) {
       update(event);
     }
   };
 
   //-----------------------------------------
 
   const update = event => {
       if (event.target.classList === 'pricing__item-container' || event.target.closest('.pricing__item-container')) {
         let elem
         if(event.target.dataset.container) {
             elem = event.target;
         } else {
             elem = event.target.closest('[data-container]')
         }
 
         let mouse = dataMouse[elem.dataset.container - 1];
         mouse.updatePosition(event);
         updateTransformStyle(
             (mouse.y / elem.firstElementChild.offsetHeight / 2).toFixed(2),
             (mouse.x / elem.firstElementChild.offsetWidth / 2).toFixed(2),
             elem.firstElementChild
         );
       }
   };
 
   const updateTransformStyle = (x, y, elem) => {
     let style = `rotateX(${x}deg) rotateY(${y}deg)`;
     elem.style.transform = style;
     elem.style.webkitTransform = style;
     elem.style.mozTransform = style;
     elem.style.msTransform = style;
     elem.style.oTransform = style;
   };
 
   //-----------------------------------------
 
 function checkMediaQuery() {
   if (window.innerWidth <= mediaQuerySize) {
     pricing__containers.forEach(container => {
       container.removeEventListener('mouseenter', onMouseEnterHandler);
       container.removeEventListener('mouseleave', onMouseLeaveHandler);
       container.removeEventListener('mousemove', onMouseMoveHandler);
     })
   } else {
     pricing__containers.forEach(container => {
       container.addEventListener('mouseenter', onMouseEnterHandler);
       container.addEventListener('mouseleave', onMouseLeaveHandler);
       container.addEventListener('mousemove', onMouseMoveHandler);
     })
   }
 }
 checkMediaQuery() 
 
 window.addEventListener('resize', checkMediaQuery);
 
 


  }

// ..........................