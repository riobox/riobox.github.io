const express = require('express');
const mongoose = require('mongoose');
const Counter = require('./models/Counter');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/cookie_counter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.static('public'));

app.post('/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter({ count: 1 });
        } else {
            counter.count++;
        }
        await counter.save();
        res.status(200).json({ count: counter.count });
    } catch (err) {
        console.error('Error incrementing counter', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/counter', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        res.status(200).json({ count: counter ? counter.count : 0 });
    } catch (err) {
        console.error('Error fetching counter', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
