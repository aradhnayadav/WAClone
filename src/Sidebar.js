import React, {useState,useEffect} from 'react'
import db from './firebase'
import './Sidebar.css';
import { Avatar,IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import {DonutLargeIcon} from '@material-ui/core/DonutLargeIcon'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import {SearchOutlined} from '@material-ui/icons'
// import MoreVertIcon from '@material-ui/icons/MoreVertIcon'
import SidebarChat from './SidebarChat'
import {useStateValue} from './StateProvider'
function Sidebar() {
    const [rooms, setRooms] =useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(() => {
      const unSubscribe= db.collection('rooms').onSnapshot(snapshot => (
           setRooms(snapshot.docs.map(doc =>({
               id: doc.id,
               data: doc.data(),
           })))
       ));
       return () => {
           unSubscribe();
       }
    }, []);
    return (
        <div className='sidebar'>
          
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_header_right">
                    <IconButton>  <DonutLargeIcon /> </IconButton>
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton> <MoreVertIcon /></IconButton>
                   
                    
                    
                </div>
            </div>
        
            <div className="sidebar_search">
                <div className="sidebar_searchcont">
                <SearchOutlined />
                <input placeholder="search or start a new chat" type="text" />

                </div>
                
                </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room =>(
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name} />
                ) )}
                </div>
              
        </div>
    )
}

export default Sidebar
