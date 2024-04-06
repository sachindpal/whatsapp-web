import  io  from "socket.io-client";

class SocketClass{


    initializeSocket = async ()=>{
        try{
            this.socket = io('http://192.168.1.11:3000');
            

            this.socket.on('connect',()=>{
                console.log('user connected')
            })

            this.socket.on('disconnect',()=>{
                console.log('user disconnect')
            })
            
            this.socket.on('error',()=>{
                console.log('user error')
            })

        }catch(err){
            console.log('problem in socket connection',err)
        }
        
    }

    //emit function
    emit = (event,data)=>{
        this.socket.emit(event,data)
    }

    on = (data,cb)=>{
        console.log('kkkkkk',cb)
        this.socket.on(data,cb)
    }

    removeListner = (listenerName)=>{
        this.socket.removeListener(listenerName)
    }
}

const socketService = new SocketClass();

export default socketService;

