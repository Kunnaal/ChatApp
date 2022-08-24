import DNE from "../DNE/DNE";
import * as React from 'react';
import io from 'socket.io-client';
import MeetCard from './Card/Card';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import styles from './Room.module.css';
import ChatBox from "./ChatBox/ChatBox";

// const socket = io('/');
let meet_code = ''

const Room = () => {

    // Capture the meet code from params
    let { code } = useParams();
    meet_code = code;

    // Create an XML HTTP Request
    const xhr = new XMLHttpRequest();
    // open the request with the verb and the url
    xhr.open('POST', '/api/verify-code/', false);
    // set the Http request header
    xhr.setRequestHeader("Content-Type","application/json");
    // send the request
    xhr.send(JSON.stringify({"code": code}));

    // socket.emit("join_room", code);
    // socket.emit("send_message", { message: 'LALALALA', code });
    // socket.emit("send_message", { message: '2', code });

    // const [messageReceived, setMessageReceived] = useState("");

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         setMessageReceived(data.message);
    //     });
    // }, [socket]);

    // Store that state of chat

    // const [new_message, set_new_message] = useState(false);
    const [chat_open, set_chat_open] = useState(false);

    const handleChatOpen = () => {
        set_chat_open(prev => !prev);
    }

    useEffect(() => {
        document.getElementsByName('chat')[0].classList.toggle(styles.hidden);
        document.getElementsByName('openChat')[0].classList.toggle(styles.hidden);
        document.getElementsByName('chatBox')[0].classList.toggle(styles.hidden);
    }, [chat_open])

    if(JSON.parse(xhr.response).response === -1) {
        return(
            //page does not exist
            < DNE />
        );
    } else {
        return (
            <>
                <MeetCard/>

                {/*Chat box styling*/}
                <ChatBox name="chatBox" />

                {/*{messageReceived}*/}

                {/* Bottom right icons */}
                <ChatBubbleOutlineIcon
                    name="openChat"
                    className={styles.chatPosition}
                    onClick={handleChatOpen}
                />
                <ChatBubbleIcon
                    name="chat"
                    className={styles.hidden+' '+styles.chatPosition}
                    onClick={handleChatOpen}
                />
                <MarkChatUnreadIcon
                    name="newChat"
                    className={styles.hidden+' '+styles.chatPosition}
                />

            </>
        );
    }
};

export default Room;
export { meet_code };
