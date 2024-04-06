import logo from './logo.svg';
import './App.css';
import socketService from './helper';
import { useEffect, useRef, useState } from 'react';
import ApiServices from './ApiServices';
function Home() {
    const [messageData, setMessageData] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const listRef = useRef(null);
    useEffect(() => {
        console.log(localStorage.getItem('users'))
        socketService.initializeSocket();
        socketService.emit('join', { 'id': JSON.parse(localStorage.getItem('users')).mobileNumber })

    }, [])

    useEffect(()=>{

        const wrapFunction = async()=>{
            await ApiServices.postRequest({ 'myId': JSON.parse(localStorage.getItem('users')).userId, 'frontUserId': 1 }, 'messageList').then((data) => {
                 setMessageData(data)
                 
             }).catch((err) => {
                 console.log('err', err);
             })
         }
         wrapFunction();
    },[])

    const sendMsg = () => {

        const obj = { "connectionId": 3, "createdAt": "2024-03-29 10:53:50", "isGroup": 0, "isImage": 0, "isSeen": 0, "message": inputValue, "messageId": 3, "receiverId": 1, "senderId": 2, "updatedAt": "2024-03-29 10:53:50" };
        socketService.emit('send_msg', { 'to': '6260149658', 'data': obj })

        messageData.push(obj)
             setMessageData([...messageData])
             setInputValue('')

    }

    useEffect(() => {
        const listner = (newmsgdata) => {
             messageData.push(newmsgdata)
             setMessageData([...messageData])
            //  setMessage('')
            console.log('newmsgdata',messageData)
         }
         listRef.current?.lastElementChild?.scrollIntoView()
         socketService.socket.on('new_msg', listner)
         return ()=> socketService.socket.off('new_msg', listner)
     }, ['new_msg',messageData])
    return (
        <div className='container'>
            <div style={{ flex: 1, flexDirection: 'row' }} ref={listRef}>

            {
                messageData.map((value, index)=>{
            let view = '';
            if (value.senderId == JSON.parse(localStorage.getItem('users')).userId) {

               view =  <div key={index} style={{ padding: 10, display: 'flex',alignItems: 'end', justifyContent:'end'}}>
                    <div style={{ backgroundColor: '#dffec5', padding: 10, borderRadius: 5, shadowColor: '#c0c8d1', shadowOpacity: 0.1, shadowRadius: 5, elevation: 1, textAlign: 'right',display:'flex' }}>
                        {value.message}
                    </div>
                </div>
            }else{



               view =  <div key={index} style={{padding: 10, textAlign: 'left', display: 'flex', marginLeft: 10 }}>
                    <div style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, shadowColor: '#c0c8d1', shadowOpacity: 0.1, shadowRadius: 5, elevation: 1 }}>
                    {value.message}

                    </div>
                </div>
            }
            return view
})}
            </div>
            <div className='input-div'>
                <input className='message' value={inputValue} name='message' onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={() => sendMsg()}>Send</button>
            </div>
        </div>
    );
}

export default Home;
