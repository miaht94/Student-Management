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
    return {
        initConnection: initConnection,
        socket: socketWrapper.socket,
    }
}

class socketWrapper {
    constructor() {

    }
    static feeder;
    static initiated = false;
    static socket = null;
    static initConnection(token) {
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