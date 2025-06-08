const userRole = localStorage.getItem("userRole");

let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [{
        name: "Пожарна 01",
        image: "images/firetruck1.jpg",
        status: "available"
    },
    {
        name: "Пожарна 02",
        image: "images/firetruck1.jpg",
        status: "in_work"
    },
    {
        name: "Пожарна 03",
        image: "images/firetruck1.jpg",
        status: "off"
    }
];

let container = document.getElementById('vehiclesContainer');

vehicles.forEach((vehicle, index) => {
    let card = document.createElement('div');
    card.className = 'vehicle-card';

    let statusDot = document.createElement('div');
    statusDot.className = 'status-dot status-' + vehicle.status;

    let img = document.createElement('img');
    img.src = vehicle.image;
    img.alt = vehicle.name;

    let title = document.createElement('h3');
    title.textContent = vehicle.name;

    card.appendChild(statusDot);
    card.appendChild(img);
    card.appendChild(title);

    // ✅ Only show button if employee or admin
    if (userRole === "employee" || userRole === "admin") {
        let button = document.createElement('button');
        button.className = 'status-btn';
        button.textContent = "Смени статус";

        button.addEventListener("click", () => {
            let nextStatus = getNextStatus(vehicle.status);
            vehicle.status = nextStatus;
            statusDot.className = 'status-dot status-' + nextStatus;
            localStorage.setItem("vehicles", JSON.stringify(vehicles));
        });

        card.appendChild(button);
    }

    container.appendChild(card);
});

function getNextStatus(current) {
    if (current === "available") return "in_work";
    if (current === "in_work") return "off";
    return "available";
}
s