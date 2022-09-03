import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import styles from '../Room.module.css';
import {useContext, useEffect, useState} from "react";
import { meet_code } from "../Room";
import io from "socket.io-client";
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from "../../App/App";

const socket = io('/');

const ChatBox = (props) => {

    let userData = useContext(UserContext);

    const [inputValue, setInputValue] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [selfUser, setSelfUser] = useState(null);

    useEffect(() => {
        if (selfUser === null) {
            setSelfUser('Anonymous');
            try {
                setSelfUser(userData.username);
            } catch {
                console.log("User not logged in!");
            }
        }
        // Make the user join the same room of socket, that the user is currently in
        socket.emit("join_room", meet_code);
        // socket.emit("send_message", { message: `Welcome to meet ${meet_code}`, meet_code });
    }, [])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived((prev) => {
                return [...prev, {
                    "username": data.username,
                    "time": data.time,
                    "message": data.message,
                }]
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

    const sendMessage = (event) => {
        event.preventDefault();
        if (inputValue !== '') {
            const date = new Date();
            const hoursAndMinutes = date.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit'});
            socket.emit("send_message", { message: {
                    "username": selfUser,
                    "time": hoursAndMinutes,
                    "message": inputValue,
                }, meet_code });
        }
        // Clearing the input field:
        setInputValue('');
    }

    const paraItems = messageReceived.map((item) =>
        <div className={styles.chatMessage}>
            <div className={styles.messagePackage}>
                <div className={styles.messageHeader}> { (item.username === selfUser) ? "You" : item.username } </div>
                <div className={styles.messageTime}> {item.time} </div>
            </div>
            <p>{item.message}</p>
        </div>
    );

    return (
        <Paper
            elevation={4}
            className={styles.chatBox}
            name={props.name}
        >
            <div className={styles.chatHeaderGroup}>
                <div className={styles.chatHeader}>In-call messages</div>
                <CloseIcon onClick={props.handleChatOpen} ></CloseIcon>
            </div>
            <div className={styles.chatMessages}>
                {paraItems}
            </div>
            <div className={styles.inputGroup}>
                <form onSubmit={sendMessage} className={styles.inputForm}>
                    <input
                        className={styles.chatInput}
                        name="inputMessage"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </form>
                <SendIcon className={styles.chatInputSendIcon} name={"sendIcon"} onClick={sendMessage}/>
            </div>
        </Paper>
    )
}

export default ChatBox;
