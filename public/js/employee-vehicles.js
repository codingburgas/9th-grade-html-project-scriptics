// This script is specifically for the EMPLOYEE vehicles page

// 1. Get the vehicle data from localStorage, or use a default list if it's empty.
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [
    { name: "Пожарна 01", image: "/images/firetruck1.jpg", status: "available" },
    { name: "Пожарна 02", image: "/images/firetruck1.jpg", status: "in_work" },
    { name: "Пожарна 03", image: "/images/firetruck1.jpg", status: "off" }
];

// 2. Find the container element in the HTML.
const container = document.getElementById('vehiclesContainer');

// 3. Check if the container was actually found.
if (container) {
    container.innerHTML = ""; // Clear it before adding new cards

    // 4. Loop through each vehicle and create a card for it.
    vehicles.forEach((vehicle, index) => {
        const card = document.createElement('div');
        card.className = 'panel-card vehicle-card';

        const statusDot = document.createElement('div');
        statusDot.className = 'status-dot status-' + vehicle.status;

        const img = document.createElement('img');
        img.src = vehicle.image; // Absolute path, which we know works
        img.alt = vehicle.name;

        const title = document.createElement('h3');
        title.textContent = vehicle.name;

        const button = document.createElement('button');
        button.className = 'btn status-btn';
        button.textContent = "Смени статус";

        button.addEventListener("click", () => {
            const nextStatus = getNextStatus(vehicle.status);
            vehicles[index].status = nextStatus; // Update the status in the array
            statusDot.className = 'status-dot status-' + nextStatus; // Update the dot color
            localStorage.setItem("vehicles", JSON.stringify(vehicles)); // Save the new array to localStorage
        });

        card.appendChild(statusDot);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(button);
        container.appendChild(card);
    });
} else {
    // If the container is not found, this error will appear in the F12 console.
    console.error("Error: The container element with id 'vehiclesContainer' was not found on the page.");
}

function getNextStatus(current) {
    if (current === "available") return "in_work";
    if (current === "in_work") return "off";
    return "available";
}