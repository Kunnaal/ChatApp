import '../Public/css/hero.css'
import * as React from 'react';
// import {useState} from 'react';
import { Button, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const Hero = () => {

    const theme = createTheme({
        palette: {
            background: {
                default: "green"
            },
        }
    });

    const handleClick = () => {
        fetch('/api/get-code/')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "/"+data.code;
            });
        ;
    }

    return (
        <Container className="hero" theme={theme} >
            <Button variant="outlined" color="error" onClick={handleClick} >
                Create Meet
            </Button>
        </Container>
    );
};

export default Hero;