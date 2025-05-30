const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data', 'disasters.json');

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});