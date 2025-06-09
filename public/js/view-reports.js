function translateType(type) {
    const types = { fire: "Пожар", earthquake: "Земетресение", flood: "Наводнение", crash: "Катастрофа" };
    return types[type] || type;
}

function translateStatus(status) {
    const statuses = {
        pending: "В изчакване",
        accepted: "Приет",
        rejected: "Отхвърлен" // Added new status
    };
    return statuses[status] || status;
}

// Fetching from your real server API
fetch('/api/disasters')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("reportsContainer");
        if (!container) {
            console.error("Fatal Error: reportsContainer div not found!");
            return;
        }
        container.innerHTML = "";

        // Only show pending reports, or show all if you prefer
        const pendingReports = data.filter(report => report.status === 'pending');

        if (pendingReports.length === 0) {
            container.innerHTML = "<p>Няма сигнали в изчакване.</p>";
            return;
        }

        pendingReports.forEach((report, originalIndex) => {
            // Find the original index from the master data array
            const reportIndex = data.findIndex(originalReport => originalReport === report);

            const card = document.createElement("div");
            card.className = "panel-card report-card";

            const statusTextElement = document.createElement("p");
            statusTextElement.innerHTML = `<strong>Статус:</strong> <span class="status-text">${translateStatus(report.status)}</span>`;

            card.innerHTML = `
                <h3>Тип: ${translateType(report.type)}</h3>
                <p><strong>Описание:</strong> ${report.description}</p>
                <p><strong>Дата:</strong> ${report.date}</p>
                <p><strong>Локация:</strong> Ширина ${report.location.lat}, Дължина ${report.location.lng}</p>
            `;
            card.appendChild(statusTextElement);

            const buttonGroup = document.createElement("div");
            buttonGroup.style.display = "flex";
            buttonGroup.style.gap = "10px";
            buttonGroup.style.marginTop = "15px";

            // ACCEPT BUTTON
            const acceptBtn = document.createElement("button");
            acceptBtn.textContent = "Приеми";
            acceptBtn.className = "btn";

            // REJECT BUTTON - THE NEW BUTTON
            const rejectBtn = document.createElement("button");
            rejectBtn.textContent = "Отхвърли";
            rejectBtn.className = "btn btn-danger";

            acceptBtn.addEventListener("click", () => handleUpdate('accept', reportIndex));
            rejectBtn.addEventListener("click", () => handleUpdate('reject', reportIndex));

            buttonGroup.appendChild(acceptBtn);
            buttonGroup.appendChild(rejectBtn); // Add new button to the group
            card.appendChild(buttonGroup);
            container.appendChild(card);

            // Function to handle both accept and reject
            function handleUpdate(action, index) {
                fetch(`/api/${action}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ index: index })
                    })
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.success) {
                            acceptBtn.disabled = true;
                            rejectBtn.disabled = true;
                            statusTextElement.innerHTML = `<strong>Статус:</strong> ${translateStatus(action + 'ed')}`;
                            card.classList.add(action + 'ed');
                        }
                    });
            }
        });
    })
    .catch(err => {
        console.error("Could not load reports from API:", err);
        const container = document.getElementById("reportsContainer");
        if (container) container.innerHTML = "<p>Грешка при зареждане на сигналите.</p>";
    });