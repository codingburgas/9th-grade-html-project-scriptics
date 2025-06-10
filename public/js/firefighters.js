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
        // We try to parse the data, but if it fails, we won't crash.
        const storedFirefighters = localStorage.getItem("firefighters");
        firefighters = storedFirefighters ? JSON.parse(storedFirefighters) : defaultFirefighters;
    } catch (e) {
        console.error("Error parsing firefighters from localStorage:", e);
        // If parsing fails, we fall back to the default data.
        firefighters = defaultFirefighters;
    }

    const container = document.getElementById('firefightersContainer');
    if (!container) {
        console.error("Container #firefightersContainer not found!");
        return;
    }

    container.innerHTML = "";

    const statusTranslations = {
        'on-duty': 'На смяна',
        'off-duty': 'Почивка',
        'on-call': 'На повикване'
    };

    firefighters.forEach(ff => {
        const card = document.createElement('div');
        card.className = 'firefighter-card';

        card.innerHTML = `
            <div class="status-badge status-${ff.status}">${statusTranslations[ff.status] || ff.status}</div>
            <img src="${ff.image}" alt="Снимка на ${ff.name}" class="profile-pic">
            <h3>${ff.name}</h3>
            <p class="rank">${ff.rank}</p>
        `;
        container.appendChild(card);
    });
});