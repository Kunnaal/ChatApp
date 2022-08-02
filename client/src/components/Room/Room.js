import * as React from 'react';
import { useParams } from 'react-router-dom';
import MeetCard from './Card/Card';
import DNE from "../DNE/DNE";

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

    if(JSON.parse(xhr.response).response === -1) {
        return(
            //page does not exist
            < DNE />
        );
    } else {
        return (
            <MeetCard/>
        );
    }
};

export default Room;
