const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data', 'disasters.json');
const usersPath = path.join(__dirname, 'data', 'users.json');

app.post('/report', (req, res) => {
    const newReport = req.body;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Read error:', err);
            return res.status(500).json({ message: 'Error reading data file.' });
        }

        let reports = [];
        try {
            reports = JSON.parse(data);
        } catch (e) {
            console.error('Parse error:', e);
        }

        reports.push(newReport);

        fs.writeFile(dataPath, JSON.stringify(reports, null, 2), err => {
            if (err) {
                console.error('Write error:', err);
                return res.status(500).json({ message: 'Error writing to data file.' });
            }

            res.status(200).json({ message: 'Report saved successfully!' });
        });
    });
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).json({ success: false });
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.json({ success: true, role: user.role });
        } else {
            res.json({ success: false });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});