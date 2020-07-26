const express = require('express');
const app = express();
const socket = require('socket.io');



const server = app.listen(5500, () => {
    console.log('listening on 5500');
});

app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

const io = socket(server);

app.get('/patient', (req,res) => {
    res.render('patient')
});

app.get('/hospital', (req,res) => {
    res.render('hospital');
});


io.on('connection', (socket) => {
    console.log('socket connection made')
    
    socket.on('notification', (data) => {
        socket.broadcast.emit('notification',data)
    });
    //join room
    socket.on('join_room', (data) => {
        socket.join(data.roomName)
        socket.to(data.roomName).broadcast.emit('notification',data.message)
    })
});