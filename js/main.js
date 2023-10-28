//check if there's local Storage color option

let colorOption = localStorage.getItem("color")

if(colorOption !== null) {
  document.documentElement.style.setProperty("--main-color", colorOption);

  // Remove  Active  Class From All children's 
  document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active")
    // Add Active Class on Element 
  if(element.dataset.color === colorOption ) {

    //Add class to target element
    element.classList.add("active")
  }
  })
}

// Random Background option
let backgroundOption = true;

// Variable to clear Background interval
let backgroundInterval;

// Check if there's local Storage Background option

let backgroundLocalItem = localStorage.getItem("background_option")

// Check if random background local storage Not Empty

if(backgroundLocalItem !== null) {

  // Remove Active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active")
  })

  if(backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active")

  } else {
    backgroundOption = false
    document.querySelector(".random-backgrounds .no").classList.add("active")
  }

}


/* Toggle Spin class on icon */

let settingBtn = document.querySelector(".setting-icon .fa-gear");

settingBtn.addEventListener("click", function () {
  //Toggle class Fa-spin for Rotation on self
  this.classList.toggle("fa-spin");

  //Toggle Class open on Main Setting Box
  document.querySelector(".settings-box").classList.toggle("open");
});


// Switch color
const colorLi = document.querySelectorAll(".colors-list li");

//Loop on All List Item

colorLi.forEach((li) => {
  // Click on Every Item
  li.addEventListener("click", (e) => {

    // Set Color on Root 
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set Color to local Storage 
    localStorage.setItem("color" , e.target.dataset.color)

    handelFunction(e)

  });
});


// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span ");

//Loop on All Span

randomBackEl.forEach((span) => {
  // Click on Every Item
  span.addEventListener("click", (e) => {

    handelFunction(e)

    if(e.target.dataset.background === "yes") {

      backgroundOption = true;
      randomizeImgs()
      localStorage.setItem("background_option" , true)

    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval)
      localStorage.setItem("background_option" , false)

    }

  });
});

//Select Landing page Element

let landing = document.querySelector(".landing-page");

// Get Array of images
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];



// Function to random images

function randomizeImgs() {

  if(backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random number
      let randomNum = Math.floor(Math.random() * imgsArray.length);
    
      // Change background image url
      landing.style.backgroundImage = `url("/images/background-image${imgsArray[randomNum]}")`;
    }, 1000);
  }
}



randomizeImgs();


//Select Skills Selector  

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  //skills Offset Top 
  let SkillsOffsetTop = ourSkills.offsetTop;

  //skills Outer Hight 
  let SkillsOuterHeight = ourSkills.offsetHeight;

  //window Height 
  let windowHeight = this.innerHeight;

  //window scrollTop 
  let windowScrollTop = this.scrollY;

  if(windowScrollTop > (SkillsOffsetTop + SkillsOuterHeight - windowHeight)) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;

    })
  }else {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
    allSkills.forEach(skill => {
      skill.style.width = 0;
      
    })
  }
}


// Create popup with The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach( img => {

  img.addEventListener("click" , (e) => {

    //create Element overlay 
    let overlay = document.createElement("div")

    //Add class To overlay 
    overlay.className ="popup-overlay"

    // Append overlay to body 
    document.body.appendChild(overlay)

    //create The popup box
    let popupBox = document.createElement("div")

    popupBox.className = "popup-box"

    if(img.alt !== null) {

      //create Heading 

      let imgHeading = document.createElement("h3");

      //create Text for Text heading 
      let imgText = document.createTextNode(img.alt)

      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading) 
    }

    //create The Image 
    let popupImage = document.createElement("img")

    //Set Image To Popup Box
    popupImage.src = img.src;
    
    popupBox.appendChild(popupImage);

    document.body.appendChild(popupBox)

    // create close span 
    let closeButton = document.createElement("span");

    let closeButtontext = document.createTextNode("X");

    closeButton.appendChild(closeButtontext)

    closeButton.className = "close-button"

    // add close button to popup box
    popupBox.appendChild(closeButton)

  })
  
})


//close Popup

document.addEventListener("click" , function (e) {

  if(e.target.className == "close-button" || e.target.className == "popup-overlay" )  {
    //Remove current Popup
    //e.target.parentNode.remove()  // different way to do that
    document.querySelector(".popup-box").remove()

    // Remove overlay
    document.querySelector(".popup-overlay").remove()
  }
})


//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

//Select All links 
const allLinks = document.querySelectorAll(".nav a")


function scrollTo(element) {
  element.forEach(ele => {
    ele.addEventListener("click" , (e) => {

      e.preventDefault()

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
  
}


scrollTo(allLinks)
scrollTo(allBullets)

// Handle Active State Function

function handelFunction (ev) {
  // Remove  Active  Class From All children's 
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active")
  })
  //Add Active class on Self
  ev.target.classList.add("active")
}



// Show or hide Bullet option

let bulletSpan = document.querySelectorAll(".bullets-option span")

let bulletContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem !== null) {

  bulletSpan.forEach(span => {

    span.classList.remove("active")
  })

  if(bulletLocalItem === "block") {
    bulletContainer.style.display = "block"

    document.querySelector(".bullets-option .yes").classList.add("active")
  }else {
    bulletContainer.style.display = "none"

    document.querySelector(".bullets-option .no").classList.add("active")

  }

}


bulletSpan.forEach(span => {

  span.addEventListener("click", (e) => {

    if(span.dataset.display === "show") {

      bulletContainer.style.display = "block"

      localStorage.setItem("bullets_option" , "block")

    } else {
      bulletContainer.style.display = "none"

      localStorage.setItem("bullets_option" , "none")
    }

    handelFunction(e)

  })

})


// Rest Button

document.querySelector(".rest-options").onclick = function () {

  //or you can use localStorage.clear()

  localStorage.removeItem("color")
  localStorage.removeItem("background_option")
  localStorage.removeItem("bullets_option")

  //Reload window

  window.location.reload();

}

//Toggle Menu 

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".nav")

toggleBtn.onclick = function(e) {

  //Stop Propagation
  e.stopPropagation();

  //toggle class " menu-active" on button
  this.classList.toggle("menu-active")
  //toggle class "open" on Nav
  tLinks.classList.toggle("open")

}

//click Anywhere Outside Menu and toggle Button

document.addEventListener("click" , function(e) {

  if(e.target !== toggleBtn && e.target !== tLinks) {

    //check if Menu Is open 
    if(tLinks.classList.contains("open")) {

      //toggle class " menu-active" on button
      toggleBtn.classList.toggle("menu-active")
      //toggle class "open" on Nav
      tLinks.classList.toggle("open")

    }

  }
  

}) 

//Stop Propagation on Menu

tLinks.onclick = function(e) {
  e.stopPropagation();

}
