"use client";

import { io } from "socket.io-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const socket = io();
export const socket = io(`${baseUrl}`,{transports:['websocket']});
