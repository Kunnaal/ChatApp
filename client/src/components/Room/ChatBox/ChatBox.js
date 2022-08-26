import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import styles from '../Room.module.css';
import {useEffect, useState} from "react";
import { meet_code } from "../Room";
import io from "socket.io-client";

const socket = io('/');

const ChatBox = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);

    useEffect(() => {
        socket.emit("join_room", meet_code);
        // socket.emit("send_message", { message: `Welcome to meet ${meet_code}`, meet_code });
    }, [])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived((prev) => {
                return [...prev, data.message]
            });
        });
    }, [socket]);

    useEffect(() => {
        if (inputValue !== '') {
            document.getElementsByName('sendIcon')[0].classList.add(styles.colorAqua);
        } else {
            document.getElementsByName('sendIcon')[0].classList.remove(styles.colorAqua);
        }
    }, [inputValue]);

    const sendMessage = () => {
        if (inputValue !== '') {
            socket.emit("send_message", { message: inputValue, meet_code });
        }
    }

    const paraItems = messageReceived.map((message) =>
        <div className={styles.chatMessage}>
            <div className={styles.messagePackage}>
                <div className={styles.messageHeader}> &lt; senders name &gt; </div>
                <div className={styles.messageTime}> &lt; message time &gt; </div>
            </div>
            <p>{message}</p>
        </div>
    );

    return (
        <Paper
            elevation={4}
            className={styles.chatBox}
            name={props.name}
        >
            <div className={styles.chatHeader}>In-call messages</div>
            <div className={styles.chatMessages}>
                {paraItems}
            </div>
            <div className={styles.inputGroup}>
                <input className={styles.chatInput} name="inputMessage" value={inputValue} onChange={handleInputChange}/>
                <SendIcon className={styles.chatInputSendIcon} name={"sendIcon"} onClick={sendMessage}/>
            </div>
        </Paper>
    )
}

export default ChatBox;
