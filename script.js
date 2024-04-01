let scene, camera, renderer;

const turtles = [
    { id: 1, name: "Turtle1" },
    { id: 2, name: "Turtle2" }
];

function populateTurtles() {
    const turtleSelector = document.getElementById("turtleSelector");
    turtles.forEach(turtle => {
        const option = document.createElement("option");
        option.value = turtle.id;
        option.innerText = `${turtle.id} - ${turtle.name}`;
        turtleSelector.appendChild(option);
    });
}

function selectTurtle() {
    const selectedTurtleId = document.getElementById("turtleSelector").value;
    console.log("Selected Turtle ID:", selectedTurtleId);
    // Add code to fetch and display turtle data based on the selected ID
}

function updateDirection(direction) {
    document.getElementById("direction").innerText = direction;
}

function updateFuelLevel(level) {
    document.getElementById("fuelLevel").innerText = level;
}

function updateInventory(inventory) {
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = ""; // Clear previous inventory

    inventory.forEach(item => {
        const slotDiv = document.createElement("div");
        slotDiv.className = "inventorySlot";
        slotDiv.innerText = `${item.name} (${item.count})`;
        inventoryDiv.appendChild(slotDiv);
    });
}

function sendCustomCode() {
    const customCode = document.getElementById("customCode").value;
    console.log("Sending custom code:", customCode);
    // Add code to send custom code to the turtle
}

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threeCanvas") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create grid
    const gridSize = 10;
    const gridStep = 1;
    const gridColor = 0x000000;
    
    for (let i = -gridSize; i <= gridSize; i += gridStep) {
        const verticalGeometry = new THREE.Geometry();
        verticalGeometry.vertices.push(new THREE.Vector3(i, -gridSize, 0));
        verticalGeometry.vertices.push(new THREE.Vector3(i, gridSize, 0));
        
        const verticalMaterial = new THREE.LineBasicMaterial({ color: gridColor });
        const verticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
        scene.add(verticalLine);
        
        const horizontalGeometry = new THREE.Geometry();
        horizontalGeometry.vertices.push(new THREE.Vector3(-gridSize, i, 0));
        horizontalGeometry.vertices.push(new THREE.Vector3(gridSize, i, 0));
        
        const horizontalMaterial = new THREE.LineBasicMaterial({ color: gridColor });
        const horizontalLine = new THREE.Line(horizontalGeometry, horizontalMaterial);
        scene.add(horizontalLine);
    }
    
    // Render loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener("load", () => {
    populateTurtles();
    initThreeJS();
});
