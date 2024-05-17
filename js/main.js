let headerLi = Array.from(document.querySelectorAll('.header-page .links li a'))
let landingPage = document.querySelector('.bmw-landing-page')
let bgSpans = document.querySelectorAll('.background span')
let state = true
let rand
let check = localStorage.getItem('random')
let liColor = Array.from(document.querySelectorAll('.color li'))
let salesNum = document.querySelectorAll('.sales .info .n')
let sales = document.querySelector('.sales')
let service = document.querySelector('.services')
let started = false // function is not operated
let cars = document.querySelectorAll('.services .cars img')
let bullets = document.querySelectorAll('.bulles-box')
let bulletsBox = document.querySelectorAll('.bulles-box')
let bulletsSpan = document.querySelectorAll('.show-bullets span')
let bulletsContainer = document.querySelector('.bullets')
let resetBtn = document.querySelector('.setting button')
let menuIcon = document.querySelector('.bmw-landing-page i.fa-bars')
let headerLinks = document.querySelector('.header-page .links')
// opend setting tap when clicking on the gear icon
document.querySelector('.setting .gear').addEventListener('click', function () {
  // set a class opened to the setting div to open setting tap
  document.querySelector('.setting').classList.toggle('opened')
  // make the gear icon rotate if the setting tap is opened
  this.classList.toggle('fa-spin')
})
// make the active class for the header li when clicking on it 
// call fucntion to remove class active from all element and add it to the clicked element
classAction(headerLi)
// Make the background Randomly
bgSpans.forEach(bg => {
  // check if the span is yes or no 
  bg.addEventListener('click', function () {
    if (bg.dataset.random == 'yes') {
      // set the state equal true
      if (state == false) {
        random()
        state = true
      }
      localStorage.setItem('random', state)
      // call the function to remove active class from all element and add it to the clicked element
      classAction(bgSpans)
    } else {
      // call the function to remove active class from all element and add it to the clicked element
      classAction(bgSpans)
      // clearing interval
      clearInterval(rand)
      //   set the state equal false
      state = false
      localStorage.setItem('random', state)
    }
  })
})
// for local storage
if (check !== null) {
  if (check === 'false') {
    state = false
    // remove active-1 class from all spans 
    bgSpans.forEach(bg => {
      // remove active class from all spans 
      bg.classList.remove('active')
    })
    // add class active-1 to the clickable span
    document.querySelector('.background .no').classList.add('active')
  } else {
    random()
    state = true
    // remove active-1 class from all spans 
    bgSpans.forEach(bg => {
      // remove active class from all spans 
      bg.classList.remove('active')
    })
    document.querySelector('.background .yes').classList.add('active')
  }
}
// switch colors from setting tap
liColor.forEach(li => {
  li.onclick = function (e) {
    // call the function to remove active class from all element and add it to the clicked element
    classAction(liColor)
    // note: to choose the :root css element using js  => documentElement 
    document.documentElement.style = ` --main-color:${e.target.dataset.color}`
    // call function to add colors in the localstorage
    addColors(e.target.dataset.color)
  }
  // trigger the localstorage function to get the color
  getColors(li, liColor)
})
// make the sales section increase on window scroll
// make action when scrolling into about section 
window.onscroll = function () {
  salesScroll()
}
// create a popup when clicking on the car image
// looping on the car img
cars.forEach(car => {
  // add click event to the car img
  car.addEventListener('click', () => {
    // create div overlay 
    let carOverlay = document.createElement('div')
    // set a class name to overlay div
    carOverlay.className = 'car-overlay'
    // create image div container 
    let carContain = document.createElement('div')
    // set class name to carContain div
    carContain.className = 'car-contain'
    // create img that put it into  div
    let carImage = document.createElement('img')
    // set the image src 
    carImage.src = car.src
    // append img into the
    carContain.appendChild(carImage)
    if (car.alt != null) {
      // create alt of the image as a heading above of the popup 
      let carHead = document.createElement('h2')
      // create a heading text 
      let carHeadTxt = document.createTextNode(car.alt)
      // appending the text of the head into the head
      carHead.appendChild(carHeadTxt)
      // appending the heading into the popup div 
      carContain.prepend(carHead)
      // append the div into the document body 
      document.body.appendChild(carContain)
      // append overlay div into document body 
      document.body.appendChild(carOverlay)
    }
    // create a span exit 
    let exit = document.createElement('span')
    // set a class name to span
    exit.className = 'exit'
    // create text of the span 
    let spanTxt = document.createTextNode('X')
    // append the text into span 
    exit.appendChild(spanTxt)
    // append exit span into the carContain div 
    carContain.appendChild(exit)
    // add click event to the popup to remove it 
    exit.addEventListener('click', () => {
      carContain.remove()
      carOverlay.remove()
    })
  })
})
// when clicking on bullets move to its section
// looping on bullets 
bullets.forEach(bullet => {
  bullet.addEventListener('click', (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    })
    // call the function that remove class from all element and add it to the clicked element
    classAction(bullets)
  })
})
// action in showing bullets or not 
bulletsSpan.forEach(bull => {
  bull.addEventListener('click', () => {
    bulletsSpan.forEach(bull => {
      bull.classList.remove('active')
    })

    if (bull.dataset.show === 'show') {
      bulletsContainer.style.display = 'block'
      bull.classList.add('active')
      localStorage.setItem('bullet', bull.dataset.show)
    } else {
      bulletsContainer.style.display = 'none'
      bull.classList.add('active')
      localStorage.setItem('bullet', bull.dataset.show)
    }
  })
})
if (localStorage.getItem('bullet') != null) {
  bulletsSpan.forEach(bull => {
    bull.classList.remove('active')
  })
  if (localStorage.getItem('bullet') == 'show') {
    bulletsSpan[0].classList.add('active')
    bulletsContainer.style.display = 'block'
  } else {
    bulletsSpan[1].classList.add('active')
    bulletsContainer.style.display = 'none'
  }
}
// reset the setting option when clicking on reset button 
resetBtn.onclick = () => {
  // clear localstorage 
  localStorage.clear()
  // reload the page 
  window.location.reload()
}
// show links when clicking on the menu icon in medium and small screens
// open the header links when clicking on the menu icon
menuIcon.onclick = () => {
  headerLinks.classList.toggle('open')
  menuIcon.classList.toggle('menu-active')
}
// remove headerlinks when clicking on any place on the dom 
document.onclick = (e) => {
  // check if the target element is menuIcon or not 
  // to make the second condition of if condition you must stopPropagation of header Links
  if (e.target != menuIcon && e.target != headerLinks) {
    // check if the header links open or not
    if (headerLinks.classList.contains('open')) {
      headerLinks.classList.toggle('open')
      menuIcon.classList.toggle('menu-active')
    }
  }
}
// note: you stopPropagation of the header links
headerLinks.onclick = (e) => {
  e.stopPropagation()
}
//  make the page go to the top when reload the page 
window.onload = function () {
  window.scrollTo(0, 0)
}
// function that responsible for interval 
function random () {
  rand = setInterval(() => {
    //   let randomNum = Math.floor(Math.random() * bgImages.length)
    //   landingPage.style.backgroundImage = `url('imgs/${bgImages[randomNum]}')`
    let randomNum = Math.floor(Math.random() * 4 + 1)
    landingPage.style.backgroundImage = `url('imgs/${randomNum}.jpg')`
    landingPage.setAttribute('alt', `${randomNum}.jpg`)
  }, 5000)
}
// add colors to the localstorage 
function addColors (color) {
  localStorage.setItem('colors', color)
}
// set the color from the localstorage in the default main color
function getColors (li, liColor) {
  if (!localStorage.key == '') {
    let color = localStorage.getItem('colors')
    document.documentElement.style.setProperty('--main-color', `${color}`)
  }
  // set the active class to the color value on the localstorage
  if (li.dataset.color == localStorage.getItem('colors')) {
    // remove active class from all li
    liColor.forEach(li => {
      li.classList.remove('active')
    })
    // add active class to the color that is found in the localstorage key
    li.classList.add('active')
  }
}
// function that contains for interval the sales number
function salesCount (el) {
  let goal = el.dataset.n
  let countSale = setInterval(() => {
    el.textContent++
    if (el.textContent == goal) {
      clearInterval(countSale)
    }
  }, 1000 / goal) // note: i divided 1000 miliseconds by goal to make the number stop interval together
}
// function that when you scroll in the about section the interval operate
function salesScroll () {
  // check if the window scrolling reaching on sales section call the function that makes the interval
  if (window.scrollY >= (sales.offsetTop + sales.offsetHeight - window.innerHeight)) {
    if (!started) {
      salesNum.forEach(num => salesCount(num))
    }
    started = true
  }
}
// function that remove class from all element and add it to the clicked element
function classAction (section) {
  section.forEach(sec => {
    sec.addEventListener('click', function () {
      // removing active class from all li 
      section.forEach(sec => {
        sec.classList.remove('active')
      })
      // adding the active class to the clicked element
      sec.classList.add('active')
    })
  })
}
