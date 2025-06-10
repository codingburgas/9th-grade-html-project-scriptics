document.addEventListener('DOMContentLoaded', () => {
    // We will use the same data source as the main firefighters page
    const defaultFirefighters = [
        { name: "Иван Петров", rank: "Пожарникар", image: "/images/f-m1.jpg" },
        { name: "Георги Иванов", rank: "Командир на екип", image: "/images/f-m2.jpg" },
        { name: "Мария Димитрова", rank: "Пожарникар", image: "/images/f-w1.jpg" },
        { name: "Симеон Тодоров", rank: "Старши пожарникар", image: "/images/f-m3.jpg" }
    ];

    let firefighters = [];
    try {
        const storedFirefighters = localStorage.getItem("firefighters");
        // We only show the first 4 as a "featured team"
        firefighters = storedFirefighters ? JSON.parse(storedFirefighters) : defaultFirefighters;
    } catch (e) {
        firefighters = defaultFirefighters;
    }

    const container = document.getElementById('teamContainer');
    if (!container) return;

    container.innerHTML = "";

    // We only want to show a few featured members, e.g., the first 4
    const featuredTeam = firefighters.slice(0, 4);

    featuredTeam.forEach(ff => {
        const card = document.createElement('div');
        card.className = 'team-member-card';

        card.innerHTML = `
            <img src="${ff.image}" alt="Снимка на ${ff.name}" class="profile-pic">
            <h3>${ff.name}</h3>
            <p class="rank">${ff.rank}</p>
        `;
        container.appendChild(card);
    });
});