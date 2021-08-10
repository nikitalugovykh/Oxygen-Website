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
    if(e.target === item) {
      firstPreview = true;
      standardCountView = 9;
      startLoop = 0;
      imgRendered = 0;
      btn_more.hidden = false;
      removeShowMoreContent()
      if (item.dataset.item === 'ALL') {
        activeTag = undefined;
        renderMainImgs(portfolio__items);
        return 
      }
      activeTag = e.target;
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

console.log(containerOffsetTop);

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
    // document.documentElement.style.overflowX = 'hidden';
    // document.documentElement.style.overflowY = 'hidden';

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




// ..........................................

