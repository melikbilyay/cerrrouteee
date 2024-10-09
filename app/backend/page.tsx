// index.js
const express = require('express');
const app = express();
const port = 3005;

// Middleware to parse JSON
app.use(express.json());

// Predefined token for authentication (for simplicity)
const AUTH_TOKEN = "mysecrettoken";

// Authorization Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // If token is valid, proceed to the next middleware/route handler
    next();
};

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET request to fetch all users (with auth)
app.get('/users', authenticate, (req, res) => {
    res.json(users);
});

// POST request to create a new user (with auth)
app.post('/users', authenticate, (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT request to update an existing user by ID (with auth)
app.put('/users/:id', authenticate, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE request to remove a user by ID (with auth)
app.delete('/users/:id', authenticate, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users = users.filter(user => user.id !== userId);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
