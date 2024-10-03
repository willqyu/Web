const debug = true;

const camera = new THREE.PerspectiveCamera( 175, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;
const renderer = new THREE.WebGLRenderer();
  //{ antialias: true, alpha: true });
//renderer.autoClear = false;
//renderer.setClearColor(0x000000, 0.0);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.prepend( renderer.domElement );


window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
});

const menuItems = document.querySelectorAll(".main-menu-item");
menuItems.forEach(item => {
  item.addEventListener('click', function() {
      const id = this.getAttribute('data-header');
      console.log(id);
      scrollToSection(Number(id), override=true);
  });
});

var canScroll = true;
function scrollToSection(section, override=false) {
  
  if (!canScroll) {return}
  if (override) {canScroll = false;}
  
  var updates = 0;
  let height = window.innerHeight;
  
  console.log(section*height);
  anime.remove([document.body, document.documentElement]);
  anime({
    targets: [document.body, document.documentElement],
    scrollTop: section * height,
    duration: 200,
    easing: "cubicBezier(.17,.67,.83,.67)",
    update: function(anim) {
      console.log(updates);
      updates ++;
    },
    complete: function(anim) {
      canScroll = true;
      console.log(canScroll);
    }
  })
  
  let cameraTarget = getCameraForPlanet(section);

  anime({
    targets: camera.position,
    x: cameraTarget.x,
    y: cameraTarget.y,
    z: cameraTarget.z,
    easing: "cubicBezier(.08,.7,.16,1.04)",
    duration: 300
  });
}

var current_section = findClosestSection();
scrollToSection(current_section);

function findClosestSection() {
  let scrollPosition = window.scrollY;
  
  let direction = scrollPosition > lastScroll ? 1: -1
  lastScroll = scrollPosition;

  let height = window.innerHeight;
  let progress = scrollPosition / height
  current_section = Math.floor(progress);
  section_progress = progress - current_section;
  let closest_section = Math.floor(Math.round(progress + direction * 0.35));
  
  return closest_section;
}

var lastScroll = window.scrollY;
window.addEventListener("scroll", function(e) {
  var closest_section = findClosestSection();
  scrollToSection(closest_section)
}, true);

// window.addEventListener("scrollend", function(e) {
//   canScroll = true;
// }, true)

const scene = createScene();

// const planet_group = createPlanet();
// scene.add(planet_group);


var planets = []
for (var i=0; i < PlanetData.length; i++) {
  var planet = createPlanet(PlanetData[i])
  scene.add(planet)
  planet.position.copy(PlanetData[i].position)
  planets.push(planet);

  if (i < PlanetData.length - 1) {
    var line = createPath(
      PlanetData[i].position, PlanetData[i+1].position
    )
    scene.add(line);
  }
}

function rotatePlanets() {
  for (var i=0; i < PlanetData.length; i++) {
    planets[i].rotation.y += PlanetData[i].rotationSpeed;
  }
}


const universe_group = createUniverse();
scene.add(universe_group);


var intro_animation_props = {
    camera_FOV: camera.fov
}

function entry_idle () {
  rotatePlanets();
  universe_group.rotation.y += 0.0005;
	renderer.render( scene, camera );
  requestAnimationFrame(main_loop);
}


function orbit_universe() { 
  rotatePlanets();
  universe_group.rotation.y += 0.0005;


  renderer.render( scene, camera );
  requestAnimationFrame(main_loop);
}



var current_animation_function = entry_idle;



if (debug) {
  intro_animation(delay=0);
} else {
  loading_animation();
  intro_animation(delay=2700);
}


var time = 0;
function main_loop() {
  time ++;
	requestAnimationFrame(current_animation_function);
}
main_loop();

