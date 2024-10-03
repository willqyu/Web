
const textureLoader = new THREE.TextureLoader();

const PlanetData = [
    { 
        texture: "./assets/sun map.jpg",
        radius: 2,
        emissive: 0x666666,
        position: new THREE.Vector3(0, 100, 0),
        rotationSpeed: 0.005
    }, {
        texture: "assets/mars map.webp",
        radius: 0.8,
        emissive: 0x552222,
        position: new THREE.Vector3(50, -100, 0),
        rotationSpeed: 0.01
    }, {
        texture: "assets/earth map.jpg",
        radius: 1,
        emissive: 0x555455,
        position: new THREE.Vector3(-25, -200, 0),
        rotationSpeed: 0.01
    }
]

function getCameraForPlanet(index) {
    return PlanetData[index].position.clone().add(new THREE.Vector3(0, 0, 10))
}


function createPlanet(
    planetData
) {
    const textureMap = textureLoader.load(planetData.texture)
    const geometry = new THREE.SphereGeometry( planetData.radius, 32, 32 );
    const material = new THREE.MeshStandardMaterial({
        map: textureMap,
        emissive: planetData.emissive,
    });
    const planet = new THREE.Mesh( geometry, material );

    return planet
}

function createPath(start, end) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
        start, end
    ]);

    // Create a LineDashedMaterial to make it dotted
    const material = new THREE.LineDashedMaterial({
      color: 0xFFFFFF,
      dashSize: 0.5,  // Length of each dash (smaller for more "dotted" effect)
      gapSize: 0.2,    // Length of the gap between dashes
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();

    return line;
}

function createUniverse() {
    const universe_group = new THREE.Group();
    for (var i = 0; i < 1000; i++) {
        var star_geometry = new THREE.SphereGeometry(Math.random()*1.5, 5, 5);
        var star_material = new THREE.MeshBasicMaterial( { color: 0xffffff});
        var star = new THREE.Mesh(star_geometry, star_material);

        var radius = 400;
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = (radius * Math.sin(phi) * Math.cos(theta));
        var y = (radius * Math.sin(phi) * Math.sin(theta));
        var z = (radius * Math.cos(phi));
        star.position.set(x, y, z );
        universe_group.add(star);
    }
    return universe_group
}
