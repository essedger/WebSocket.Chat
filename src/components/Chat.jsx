import React, {useState, useEffect, useRef} from 'react';
import style from './Chat.module.css'
function Chat() {
    let messagesBlockRef = useRef();
    let [messageText, setMessageText] = useState("");
    let [ws, setWS] = useState(null);
    let [users, setUsers] = useState([]);
    if (ws) {
        ws.onmessage = (messageEvent) => {
            let messages = JSON.parse(messageEvent.data);
            console.log(messageEvent);

            setUsers([...users, ...messages]);
            messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);
        };
    }

    useEffect(() => {
        console.log('USE EFFECT');
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        setWS(localWS);
    }, []);

    let onMessageChange = (e) => {
        setMessageText(e.currentTarget.value);
    };
    let sendMessage = () => {
        ws.send(messageText);
        setMessageText("");
    };

    return (
        <div className={style.container}>
            <div className={style.chat}>
                <div className={style.users__block} ref={messagesBlockRef}>
                    {users.map( (user, index) => <div className={style.message__block} key={index}>
                        <img src={user.photo} /> <b>{user.userName}</b> <span>{user.message}</span>
                    </div>)}
                </div>
                <div className={style.input__block}>
                    <textarea onChange={onMessageChange} value={messageText} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
