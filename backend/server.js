const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const communityRoutes = require('./routes/community');
const nearbyRoutes = require('./routes/nearby');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/nearby', nearbyRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

mongoose.connect('your_mongo_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('newPost', (post) => {
        io.emit('newPost', post);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});