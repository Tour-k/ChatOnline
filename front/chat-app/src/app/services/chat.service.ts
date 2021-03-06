import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/models/room';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class ChatService {


    currentRoom = this.socket.fromEvent<Room>('room');

    rooms = this.socket.fromEvent<any>('rooms');

    messages = this.socket.fromEvent<any>('messages');

    notificationIn = this.socket.fromEvent<string>('notificationIn');
    notificationOut = this.socket.fromEvent<string>('notificationOut');

    constructor(private socket: Socket, private userService: UserService, private cookieService: CookieService) {}


    addRoom(roomName: string) {
        const roomObject = {
            id: null,
            nom: '',
            userId: 1 //ON EST EN DUR ICI POUR LE TEST VERS LA BDD
        };
        roomObject.userId = parseInt(this.cookieService.get('userId'));
        roomObject.nom = roomName;
        this.socket.emit('addRoom' , roomObject);
    }

    deleteRoom(roomId: number) {
        this.socket.emit('deleteRoom', roomId);
    }

    getAllMessagesByRoomId(roomId: number) {
        const userName = this.userService.currentUserName;
        const data = [roomId, userName];
        this.socket.emit('getRoom', data);
    }

    sendMessage(channelId, userId, msg: string) {
        this.socket.emit('addMessage', [channelId, userId, msg]);
    }

    getAllRooms() {
        this.socket.emit('getAllRooms');
    }

    updateRoom(roomId: number, newName: string ) {
        this.socket.emit('updateRoom', [roomId, newName]);
    }

    updateMessage(msgId : number, msg: string, roomId: number){
        this.socket.emit('updateMessage', [msgId, msg, roomId]);
    }

}
