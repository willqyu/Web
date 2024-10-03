
// Hacker animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let hacker_interval = null;
var hacker_text = function(event) {  
  if (!entry_complete) {return;}
  setTimeout(() => {
    let iteration = 0;
    
    clearInterval(hacker_interval);
    
    hacker_interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.text[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.text.length){ 
        clearInterval(hacker_interval);
      }
      
      iteration += 1 / 3;
    }, 40);

  }, 100);
}
document.querySelector(".hacker-text").onmouseover = hacker_text;

// Bio animation

const words = ['Engineer', 'Founder', 'Designer', 'Innovator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBeforeDelete = 2000;
const changingText = document.getElementById('changing-bio');

function typeEffect() {
    const currentWord = words[wordIndex];
    

    if (isDeleting) {
        changingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        changingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseBeforeDelete);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingInterval = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, typingInterval);
}

typeEffect();

//Intro Animation

const loading_border_width = "5px";
const header_border_width = ".5vw";
const camera_final_position = 10;
const camera_final_fov = 70;

var loading_animation = function (delay = 0) {
  var loading = anime.timeline();
  loading
  .add({
    targets: "#loading-bar",
    delay: delay,
    duration: 500,
    borderWidth: ["0px", loading_border_width],
    opacity: 1,
    begin: function() {document.getElementById("loading-bar").style.display = "block";},
    easing: "easeOutQuad",
  })
  .add({
    targets: "#bar",
    duration: 2000,
    right: ["90vw", ".5vw"],
    easing: "cubicBezier(.7,-0.02,.15,.98)",
  })
  .add({
    targets: '#loading-bar',
    duration: 200,
    translateX: ["-50%", "-50%"],
    translateY: "+=10vh",
    opacity: 0,
    easing: "easeInQuint",
  })
}

var intro_animation = function (delay = 100) {
  var intro_animation = anime.timeline();
  intro_animation
  .add({
    targets: camera.position,
    z: [30, camera_final_position],
    easing: "cubicBezier(.08,.7,.16,1.04)",
  })
  .add({
    targets: camera,
    fov: [160, camera_final_fov],
    easing: 'cubicBezier(.08,.7,.16,1.04)',
    update: function() {
      camera.updateProjectionMatrix();
    },
    complete: function () {
      current_animation_function = orbit_universe;
    }
  })
  .add({
    targets: "#header",
    delay: 1000,
    duration: 300,
    easing: "easeOutQuart",
    opacity: 1
  })
  .add({
    targets: "#header-name",
    duration: 300,
    easing: "easeOutQuart",
    borderWidth: header_border_width,
  });
  var header = document.getElementById("name");
  header.progress = 0;
  intro_animation.add({
    targets: header,
    easing: 'cubicBezier(.7,.07,.84,.25)',
    progress: 100,
    update: function(anim) {
      var length = header.dataset.text.length;
      var last_letter = Math.max(Math.floor(length * header.progress / 100), 0);
      header.innerText = header.dataset.text.slice(0,last_letter);
    }
  })
  .add({
    targets: ".main-menu-item",
    delay: anime.stagger(300, {start: 500}),
    easing: "easeOutQuart",
    marginTop: "0px",
    opacity: 1,
    begin: function() {
      console.log("menu begin");
      const items = document.getElementsByClassName("main-menu-item");
      for (let item of items) {
        item.style.display = "block";
      };
    }
  })
  .add({
    targets: "#main-menu",
    easing: "easeOutQuart",
    borderWidth: header_border_width
  })
  .add({
    targets: "#watermark",
    easing: "easeOutQuart",
    opacity: 1,
    complete: function () {
      entry_complete = true;
      console.log("Initialising Animation Complete");
    }
  });
}
