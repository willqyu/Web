function createScene() {
    const scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight(0x999999 );
    scene.add(ambientLight);


    return scene;
}
