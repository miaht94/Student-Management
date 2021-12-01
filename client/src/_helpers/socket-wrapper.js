import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { useFeedPageWrapper } from "./feed_page_wrapper";
import { socketAtom } from "_state/socket";
function useSocketWrapper() {
    function initConnection(token) {
        socketWrapper.socket = io("http://localhost:5000", {
                reconnectionDelayMax: 10000,
                auth: {
                    token: token
                },
                query: {
                    token: token
                }
            })

    }
    function checkConnected() {
        return socketWrapper.socket.connected
    }
    return {
        initConnection: initConnection,
        socket: socketWrapper.socket,
        checkConnected : checkConnected
    }
}

class socketWrapper {
    constructor() {

    }
    static isConnected = false;
    static feeder;
    static initiated = false;
    static socket = null;
    static initConnection(token) {
        // debugger
        if (!token) return;
        console.log("Initiating socket connection")
        if (!socketWrapper.initiated) {
            socketWrapper.socket = io("http://localhost:5000", {
                reconnectionDelayMax: 10000,
                auth: {
                    token: token
                },
                query: {
                    token: token
                }
            })
            socketWrapper.initiated =true;
        }
        
    }
}

export {socketWrapper}; 