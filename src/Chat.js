/*eslint no-unused-vars: "error"*/
import React ,{useState,useEffect} from 'react'
import './Chat.css'
import {Avatar , IconButton} from "@material-ui/core"
import LinkIcon from '@material-ui/icons/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
// import {DonutLargeIcon} from '@material-ui/core/DonutLargeIcon'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { InsertEmoticon } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from "./firebase"
// import userEvent from '@testing-library/user-event';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider"
function Chat() {
    
    const [input,setInput]=useState("");
    const [seed,setSeed]=useState("");
    const [roomName,setRoomName]=useState("");
    const {roomId}=useParams("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();
;  
useEffect(() => {
    if (roomId){ 
        db.collection('rooms').doc(roomId).onSnapshot((snapshot )=> 
            setRoomName(snapshot.data().name)
        ) ;
        db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));

    }
}, [roomId]);


    const sendMsg = (e) => {
        e.preventDefault();
        console.log("u typed",input );
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");

    };
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="headerinfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="header_right">
                <IconButton>  <DonutLargeIcon /> </IconButton>
                    <IconButton><LinkIcon /></IconButton>
                    <IconButton> <MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chat_body">
           {messages.map(message =>(
                 <p className={`chatmsg ${message.name === user.displayName && "chatreciever"}`}>
                 <span className="chatname">{message.name}</span>
                     {message.message}
                <span className="time">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                     
                 </p>
           ))}
             
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="type a message" type="text" />
                    <button onClick={sendMsg} type="submit">send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
