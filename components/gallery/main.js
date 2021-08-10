const menu = document.querySelector('.portfolio__menu');
const items_wrapper = document.querySelector('.portfolio__items-wrapper');
const menu_items = document.querySelectorAll('.portfolio__menu_item');
const portfolio__btn_prev = document.querySelector('.portfolio__btn_prev');
const portfolio__btn_next = document.querySelector('.portfolio__btn_next');

let nextRightElement, nextLeftElement;

let position = 0;


// NEXT ...........................................................................................................

portfolio__btn_next.addEventListener('click', ()=> { 
    
    nextRightElement = findNextElement();
    const cordsRightElem = nextRightElement.getBoundingClientRect().right;
    let {right: menuCord_r} = menu.getBoundingClientRect();

    position -= cordsRightElem - menuCord_r;
    items_wrapper.style.transform = `translateX(${position}px)`;

    findNextLeftElement()
});


// ............................................................................................................

// PREV .......................................................................................................

portfolio__btn_prev.addEventListener('click', ()=> {

    nextLeftElement = findNextLeftElement();
    const cordsLeftElem = nextLeftElement.getBoundingClientRect().left || 0;

    let {left: menuCord_l} = menu.getBoundingClientRect();

  
    position += menuCord_l - cordsLeftElem;
    items_wrapper.style.transform = `translateX(${position}px)`;



});
// .........................................................................................................................



function findNextElement(){

  const menuCord_r = menu.getBoundingClientRect().right;
  
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
  const menuCord_l = menu.getBoundingClientRect().left;
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



menu.addEventListener('click', (e)=> {
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
    img.src = `./gallery/${dataForRender[i].name}`;
    

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
    // renderMainImgs(portfolio__items, dataForRenderWithNewTags);
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

    // if (dataForTags.length === 0) {
      
    // } else {

    //   if (dataForTags[i] === undefined) {
    //     divWrapper.innerHTML = ``
    //     return
    //   }

    //   const img = document.createElement('img');
    //   img.alt = `${dataForTags[i].description}`;
    //   img.classList.add('portfolio__img');
    //   img.src = `./gallery/${dataForTags[i].name}`;
      
  
    //   const div_title = document.createElement('div');
    //   div_title.classList.add('portfolio__item-title');

  
      
    //   const div_descr = document.createElement('div');
    //   div_descr.classList.add('portfolio__item-descr');

  
  

    //   divWrapper.append(img, div_title, div_descr);
    // }

renderMainImgs(portfolio__items)







// for (let i = 0; i < standardCountView; i++) {
//   let div = document.createElement('div');
//   div.classList.add('portfolio__item-img');
//   div.classList.add(`${dataGridLetter[i]}`);
//   if (dataForTags.length === 0) {
//     div.innerHTML = `
//       <img class="portfolio__img"  src="./gallery/${dataImg[i].name}" alt="${dataImg[i].description}">
//       <div class="portfolio__item-title">OCCA CUPIDATAT</div>
//       <div class="portfolio__item-descr">DESIGN</div>
//     `
//   } else {
//     if (dataForTags[i] === undefined) {
//       div.innerHTML = ``
//     }
//     div.innerHTML = `
//       <img class="portfolio__img"  src="./gallery/${dataForTags[i]?.name}" alt="${dataForTags[i]?.description}">
//       <div class="portfolio__item-title">OCCA CUPIDATAT</div>
//       <div class="portfolio__item-descr">DESIGN</div>
//     `
//   }
  
//   portfolio__items.append(div);
//   console.log(num++);
// }



