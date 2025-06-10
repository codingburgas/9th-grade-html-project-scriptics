document.addEventListener('DOMContentLoaded', () => {
    const defaultFirefighters = [
        { name: "Иван Петров", rank: "Командир на екип", image: "/images/f-m1.jpg", status: "on-duty" },
        { name: "Георги Иванов", rank: "Старши пожарникар", image: "/images/f-m2.jpg", status: "on-call" },
        { name: "Мария Димитрова", rank: "Пожарникар", image: "/images/f-w1.jpg", status: "off-duty" },
        { name: "Симеон Тодоров", rank: "Пожарникар", image: "/images/f-m3.jpg", status: "on-duty" },
        { name: "Петър Николов", rank: "Водач на специален автомобил", image: "/images/f-m4.jpg", status: "on-duty" },
        { name: "Елена Василева", rank: "Младши инспектор", image: "/images/f-w2.jpg", status: "off-duty" },
        { name: "Николай Георгиев", rank: "Пожарникар", image: "/images/f-m5.jpg", status: "on-call" },
        { name: "Стефан Илиев", rank: "Пожарникар", image: "/images/f-m6.jpg", status: "on-duty" },
        { name: "Димитър Атанасов", rank: "Водач на специален автомобил", image: "/images/f-m7.jpg", status: "off-duty" },
        { name: "Виктория Петкова", rank: "Комуникационен специалист", image: "/images/f-w3.jpg", status: "on-call" },
        { name: "Борис Стоянов", rank: "Пожарникар-парамедик", image: "/images/f-m8.jpg", status: "on-duty" },
        { name: "Тодор Йорданов", rank: "Водач на специален автомобил", image: "/images/f-m9.jpg", status: "on-duty" }
    ];

    let firefighters = [];
    try {
        const storedFirefighters = localStorage.getItem("firefighters");
        firefighters = storedFirefighters ? JSON.parse(storedFirefighters) : defaultFirefighters;
    } catch (e) {
        firefighters = defaultFirefighters;
    }

    // Save to localStorage immediately if it was empty, to ensure consistency
    if (!localStorage.getItem("firefighters")) {
        localStorage.setItem("firefighters", JSON.stringify(firefighters));
    }

    // This looks for the correct container ID
    const container = document.getElementById('firefightersContainer');
    if (!container) return;

    container.innerHTML = "";

    firefighters.forEach((ff, index) => {
        const card = document.createElement('div');
        card.className = 'panel-card firefighter-card-manage';

        card.innerHTML = `
            <div class="ff-info">
                <img src="${ff.image}" alt="${ff.name}" class="profile-pic">
                <div>
                    <h3>${ff.name}</h3>
                    <p class="rank">${ff.rank}</p>
                </div>
            </div>
            <select class="status-select" data-index="${index}">
                <option value="on-duty" ${ff.status === 'on-duty' ? 'selected' : ''}>На смяна</option>
                <option value="off-duty" ${ff.status === 'off-duty' ? 'selected' : ''}>Почивка</option>
                <option value="on-call" ${ff.status === 'on-call' ? 'selected' : ''}>На повикване</option>
            </select>
        `;
        container.appendChild(card);
    });

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('status-select')) {
            const selectedStatus = event.target.value;
            const ffIndex = event.target.dataset.index;

            firefighters[ffIndex].status = selectedStatus;

            localStorage.setItem('firefighters', JSON.stringify(firefighters));
        }
    });
});