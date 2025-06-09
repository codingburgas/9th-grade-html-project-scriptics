// This is the final script for the PUBLIC vehicles page.

const userRole = localStorage.getItem("userRole");

// The default data is now simple, with NO type or capacity.
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [{
        name: "Пожарна 01",
        image: "/images/firetruck1.jpg",
        status: "available"
    },
    {
        name: "Пожарна 02",
        image: "/images/firetruck1.jpg",
        status: "in_work"
    },
    {
        name: "Пожарна 03",
        image: "/images/firetruck1.jpg",
        status: "off"
    }
];

const container = document.getElementById('vehiclesContainer');

if (container) {
    container.innerHTML = "";

    vehicles.forEach((vehicle, index) => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';

        const statusDot = document.createElement('div');
        statusDot.className = 'status-dot status-' + vehicle.status;

        const img = document.createElement('img');
        img.src = vehicle.image;
        img.alt = vehicle.name;

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = vehicle.name;

        // The lines for "Тип" and "Капацитет" have been completely removed.
        content.appendChild(title);

        card.appendChild(statusDot);
        card.appendChild(img);
        card.appendChild(content);

        // The logic for the "Смени статус" button remains the same.
        if (userRole === "employee" || userRole === "admin") {
            const button = document.createElement('button');
            button.className = 'status-btn';
            button.textContent = "Смени статус";

            button.addEventListener("click", () => {
                const nextStatus = getNextStatus(vehicle.status);
                vehicles[index].status = nextStatus;
                localStorage.setItem("vehicles", JSON.stringify(vehicles));
                location.reload();
            });
            content.appendChild(button);
        }

        container.appendChild(card);
    });
}

function getNextStatus(current) {
    if (current === "available") return "in_work";
    if (current === "in_work") return "off";
    return "available";
}