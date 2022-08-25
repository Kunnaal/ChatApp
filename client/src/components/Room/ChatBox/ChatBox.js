import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import styles from '../Room.module.css';
import {useEffect, useState} from "react";
import { meet_code } from "../Room";
import io from "socket.io-client";

const socket = io('/');

const ChatBox = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [messageReceived, setMessageReceived] = useState(null);
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        socket.emit("join_room", meet_code);
        // socket.on("receive_message", (data) => {
        //     console.log(data);
        //     setMessageReceived(data.message);
        // });
        socket.emit("send_message", { message: `Welcome to meet ${meet_code}`, meet_code });
        console.log("socket: ", socket)
    }, [])

    // document.getElementsByName('inputMessage')
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
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

    return (
        <Paper
            elevation={4}
            className={styles.chatBox}
            name={props.name}
        >
            Hello World.
            {messageReceived}
            <div className={styles.inputGroup}>
                <input className={styles.chatInput} name="inputMessage" value={inputValue} onChange={handleInputChange}/>
                <SendIcon className={styles.chatInputSendIcon} name={"sendIcon"} onClick={sendMessage}/>
            </div>
        </Paper>
    )
}

export default ChatBox;
