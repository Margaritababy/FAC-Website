const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    button.disabled = true;
    
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]")

    const elements = document.querySelectorAll('.slide-left, .slide-right, .slide-middle');
    // Iterate over the selected elements
    elements.forEach(element => {
      // console.log('ELEMENT: ', element);
      element.classList.toggle('hidden');
    });

    setTimeout(() => {
      // console.log('Active: ', activeSlide);
      let newMiddleIndex = [...slides.children].indexOf(activeSlide) + offset
      let newLeftIndex = newMiddleIndex - 1
      let newRightIndex = newMiddleIndex + 1
      
      if (newMiddleIndex <= 0) {
        // If new middle is first slide, set left to last slide
        if (newMiddleIndex === 0) {
          newLeftIndex = slides.children.length - 1
        // If new middle is last slide, set middle and left
        } else {
          newMiddleIndex = slides.children.length - 1
          newLeftIndex = newMiddleIndex - 1
        }
        
        // Remove right slide class
        slides.children[newRightIndex + 1].className = "slide";
        // console.log('Start of slides: ', newLeftIndex);
      }

      else if (newMiddleIndex >= slides.children.length - 1) {
        // If new middle is first slide i.e. comes back around
        if (newMiddleIndex === slides.children.length) {
          newMiddleIndex = 0
          newRightIndex = newMiddleIndex + 1
        } else {
          newRightIndex = 0
        }
        // slides.children[newLeftIndex - 1].className = "slide";
        // console.log('End of slides: ', newRightIndex);
      }

      // console.log('New indexes: ', newMiddleIndex, newRightIndex, newLeftIndex);
      slides.children[newMiddleIndex].dataset.active = true
      delete activeSlide.dataset.active
      // element.className = "newClass1 newClass2";

      // Set new classes to make slides visible 
      slides.children[newMiddleIndex].className = "slide slide-middle";
      slides.children[newRightIndex].className = "slide slide-right";
      slides.children[newLeftIndex].className = "slide slide-left";

      // Delete old classes
      if (newMiddleIndex === 1) {
        slides.children[slides.children.length - 1].className = "slide";
        slides.children[newRightIndex + 1].className = "slide";
      } else if (newMiddleIndex === 4) {
        slides.children[0].className = "slide";
        slides.children[newLeftIndex - 1].className = "slide";
      }
      else { 
        slides.children[newLeftIndex - 1].className = "slide";
        slides.children[newRightIndex + 1].className = "slide"; 
      }

      // console.log('Elements; ', elements);
      // console.log('Updated classes: ', slides.children[newMiddleIndex], slides.children[newRightIndex], slides.children[newLeftIndex])
      // console.log(slides);
  
    }, 1500);

    setTimeout(() => {
      const elementsAfter = document.querySelectorAll('.slide-left, .slide-right, .slide-middle');
      // Iterate over the selected elements
      elementsAfter.forEach(element => {
        // console.log('ELEMENT: ', element);
        element.classList.remove('hidden');
      });
      button.disabled = false;
    }, 2000);
    
  }); 
});


// Zoetrope spin
const zoetrope = document.querySelector(".zoetrope");
// console.log(zoetrope)
const spinElement = document.querySelector(".spin");

spinElement.addEventListener("click", () => {
  // Hide plates
  const elements = document.querySelectorAll('.slide-left, .slide-right, .slide-middle');
  // Iterate over the selected elements
  elements.forEach(element => {
    // console.log('ELEMENT: ', element);
    element.classList.toggle('hidden');
  });
  zoetrope.classList.toggle("animate");

  zoetrope.addEventListener("animationend", () => {
    elements.forEach(element => {
      // console.log('ELEMENT: ', element);
      element.classList.remove('hidden');
    });
    zoetrope.classList.remove("animate");
  })
});


// Chevron spin next
const chevronNextElement = document.querySelector(".next");
// const contentBlocks = document.querySelectorAll(".content-block");
const contentContainers = document.querySelectorAll(".content-container:not(.slide-cover)");
// const hiddenContent = document.querySelector(".hidden-content");


chevronNextElement.addEventListener("click", () => {
  
  console.log('Next button clicked');

  setTimeout(() => {
    zoetrope.classList.toggle("animate-chevron-next");
    console.log('Animation logic running')
    // const lastSlide = contentContainers[contentContainers.length - 1];
    // console.log('LAST SLIDE: ', lastSlide);

    // setTimeout(() => {
    //   hiddenContent.style.top = '0';
    //   lastSlide.classList.toggle("hidden-content")
    // }, 10); 

    contentContainers.forEach (container => {
      // Add transition style
      container.classList.toggle("transition-top");

      const currentTop = window.getComputedStyle(container).top; // Get the current 'top' value
      // console.log('CURRENT TOP: ', currentTop);

      // Convert the current 'top' value to a number (in pixels)
      const currentTopValue = parseFloat(currentTop);
      const newTopValue = currentTopValue + 700;

      container.style.top = newTopValue + 'px';

    })
  }, 100);
});

zoetrope.addEventListener("animationend", () => {
  const listOfClasses = ["top-cover", "top-block", "middle-block", "bottom-block"];
  console.log('Class switching taking place')
  zoetrope.classList.remove("animate-chevron-next");
  
  contentContainers.forEach ((container, index) => {
    // Remove transition style 
    container.classList.remove("transition-top");

    // Move classes down 1 step
    const containerClass = container.classList.item(1)
    const indexOfClassInList = listOfClasses.indexOf(containerClass);
    console.log('container class & index in list: ', containerClass, indexOfClassInList);

    let newClass;
    if (indexOfClassInList === 3) {
      newClass = listOfClasses[0];
    } else {
      newClass = listOfClasses[indexOfClassInList + 1];
    }
    console.log(newClass);
    
    container.classList.replace(containerClass, newClass);
    container.style.cssText = '';

  })
  console.log('----------');
})


// Chevron spin prev
const chevronPrevElement = document.querySelector(".prev");
console.log(chevronPrevElement);

chevronPrevElement.addEventListener("click", () => {
  // Hide plates
  // document.querySelector(".data-slides").classList.toggle("elementHidden");
  zoetrope.classList.toggle("animate-chevron-prev");

  zoetrope.addEventListener("animationend", () => {
    zoetrope.classList.remove("animate-chevron-prev");
  })
});


// Expand content and hide spin and nav elements
// const middleSlide = document.querySelector(".slide-middle");
// const expandButton = document.querySelector(".expand");
// const navElement = document.querySelector(".nav-bar");

// expandButton.addEventListener("click", () => {
//   console.log('Class List ', middleSlide.classList);
//   middleSlide.classList.toggle("expanded");
//   if (middleSlide.classList.contains("expanded")) {
//     spinElement.style.zIndex = "-1";
//     navElement.style.zIndex = "-1";
//   } else {
//     setTimeout(() => {
//       spinElement.style.zIndex = "0";
//       navElement.style.zIndex = "0";
//     }, 500);
//   }
// });