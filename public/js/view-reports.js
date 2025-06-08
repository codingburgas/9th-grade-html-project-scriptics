function translateType(type) {
    const types = {
        fire: "Пожар",
        earthquake: "Земетресение",
        flood: "Наводнение",
        accident: "Инцидент"
            // Добави още, ако имаш други типове
    };
    return types[type] || type;
}

function translateStatus(status) {
    const statuses = {
        pending: "В изчакване",
        accepted: "Приет"
            // Добави още статуси ако ще има
    };
    return statuses[status] || status;
}
fetch('/api/disasters')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("reportsContainer");
        container.innerHTML = "";

        data.forEach((report, index) => {
            const card = document.createElement("div");
            card.className = "report-card";

            const title = document.createElement("h3");
            title.textContent = "Тип: " + translateType(report.type);

            const desc = document.createElement("p");
            desc.innerHTML = "<strong>Описание:</strong> " + report.description;

            const date = document.createElement("p");
            date.innerHTML = "<strong>Дата:</strong> " + report.date;

            const location = document.createElement("p");
            location.innerHTML =
                `<strong>Локация:</strong> Ширина ${report.location.lat}, Дължина ${report.location.lng}`;

            const status = document.createElement("p");
            status.innerHTML = "<strong>Статус:</strong> " + translateStatus(report.status);
            card.appendChild(status);

            const btn = document.createElement("button");
            btn.textContent = "Приеми сигнала";
            btn.disabled = report.status === "accepted";

            btn.addEventListener("click", () => {
                fetch('/api/accept', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ index: index }) // use index to identify
                    })
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.success) {
                            btn.disabled = true;
                            status.innerHTML = "<strong>Статус:</strong> Приет";
                        }
                    });
            });

            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(date);
            card.appendChild(location);
            card.appendChild(status);
            card.appendChild(btn);

            container.appendChild(card);
        });
    });