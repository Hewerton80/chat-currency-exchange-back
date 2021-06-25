import { Socket } from "socket.io";

export interface IJwt {
    id: string,
    name: string,
    email: string
}

export interface ExtendedSocket extends Socket {
    user: IJwt;
}