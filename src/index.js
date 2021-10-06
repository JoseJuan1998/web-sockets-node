import express from 'express';
import {Server as WebSocketServer} from 'socket.io';
import http from 'http';
import {v4 as uuid} from 'uuid';

let notes = [];

const app = express();

const server = http.createServer(app);
const io = new WebSocketServer(server);

app.use(express.static(__dirname +'/public'));

io.on('connection', (socket) => {
    console.log('Nueva conexion: ',socket.id);

    io.emit('server:loadnotes', notes);

    socket.on('client:newnote', data => {
        const note = {...data, id: uuid()};
        notes.push(note);
        io.emit('server:newnote', note);
    });

    socket.on('client:deletenote', id => {
        notes = notes.filter(note => note.id !== id);
        io.emit('server:loadnotes', notes);
    });

    socket.on('client:getnote', id => {
        const note = notes.find(note => note.id === id);
        socket.emit('server:getnote', note);
    });

    socket.on('client:updatenote', noteUpdate => {
        notes = notes.map(note => {
            if(note.id === noteUpdate.id){
                note.title = noteUpdate.title;
                note.description = noteUpdate.description;
            }
            return note;
        });
        io.emit('server:loadnotes', notes);
    });
});

server.listen(3000);
console.log('Server on port 3000');