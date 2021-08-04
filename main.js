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







// ..............................

// const http = require('http');
// http.createServer((req, res)=> {


//     let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
//     console.log(path);

//     switch(path) {
//         case '': 
//             res.writeHead(200, {'Content-type': 'text/html'});
//             res.end('<p>Hello World</p>');
//             break;
//         case '/about': 
//             res.writeHead(200, {'Content-type': 'text/html'});
//             res.end('<p>About page</p>');
//             break;
//         default:
//             res.writeHead(404, {'Content-type': 'text/html'});
//             res.end('<p>Page doesn`t exist</p>');
//             break;
//     }
// }).listen(3000);

// console.log('Server has been');