import React from "react";
import { Box, Button, TextField } from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        "username": null,
        "password": null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleClick = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": user.username, "password": user.password}),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            navigate('/');
        }
    }

    return(
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
            <TextField id="outlined-basic" label="Username" variant="outlined" name="username" onChange={handleChange} />
            <TextField id="outlined-password-input" label="Password" type="password" name="password" onChange={handleChange} />
            <Button variant="contained" onClick={handleClick}>Contained</Button>
        </Box>
    );
};

export default Login;
