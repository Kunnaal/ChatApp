import * as React from 'react';
import RouterApp from "../Router/Router";
import {createContext} from "react";
import {useNavigate} from "react-router-dom";

const UserContext = createContext();
let userData = {"username": 'Anonymous', "image_id": '00'};

const App = () => {

    const userDetails = () => {

        const token = localStorage.getItem('token');

        if (token) {
            // Create an XML HTTP Request
            const img_xhr = new XMLHttpRequest();
            // open the request with the verb and the url
            img_xhr.open('GET', `/api/getDp/${token}`, false);
            // set the Http request header
            img_xhr.setRequestHeader("Content-Type", "application/json");
            // send the request
            img_xhr.send();
            //Assigning response
            userData.image_id = JSON.parse(img_xhr.response).user_image_id;

            // Create an XML HTTP Request
            const name_xhr = new XMLHttpRequest();
            // open the request with the verb and the url
            name_xhr.open('GET', `/api/getUsername/${token}`, false);
            // set the Http request header
            name_xhr.setRequestHeader("Content-Type", "application/json");
            // send the request
            name_xhr.send();
            //Assigning response
            userData.username = JSON.parse(name_xhr.response).username;
        } else {
            console.log("User not logged in.");
        }

        return userData;
    }

    return(
        <UserContext.Provider value={userDetails()}>
        <RouterApp/>
        </UserContext.Provider>
    );
}

export default App;
export { UserContext };
