import DNE from "../DNE/DNE";
import * as React from 'react';
import io from 'socket.io-client';
import MeetCard from './Card/Card';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

const socket = io('/');

const Room = () => {

    // Capture the meet code from params
    let { code } = useParams();

    // Create an XML HTTP Request
    const xhr = new XMLHttpRequest();
    // open the request with the verb and the url
    xhr.open('POST', '/api/verify-code/', false);
    // set the Http request header
    xhr.setRequestHeader("Content-Type","application/json");
    // send the request
    xhr.send(JSON.stringify({"code": code}));

    socket.emit("join_room", code);
    socket.emit("send_message", { message: 'LALALALA', code });

    const [messageReceived, setMessageReceived] = useState("");

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    if(JSON.parse(xhr.response).response === -1) {
        return(
            //page does not exist
            < DNE />
        );
    } else {
        return (
            <>
                <MeetCard/>
                {messageReceived}
            </>
        );
    }
};

export default Room;
