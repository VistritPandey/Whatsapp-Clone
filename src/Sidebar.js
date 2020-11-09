import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import { Avatar, IconButton } from '@material-ui/core'
import SidebarChat from './SidebarChat'
import db from "./firebase"

function Sidebar({id, name, addNewChat}) {
    const [rooms, setRooms ] = useState([]);
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random()* 5000));
    }, []);

    useEffect(()=> {
        db.collection('rooms').onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc)=> ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, []);
    

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebar__headerRight">
                <IconButton>
                    <AddCircleOutlineSharpIcon />
                </IconButton>
                
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search a Chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room =>(
                    <SidebarChat key={room.id} id ={room.id}
                    name = {room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
