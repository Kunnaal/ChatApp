import * as React from 'react';
// import { Container } from '@mui/material';
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        background: {
            default: "green"
        },
    }
});


const Hero = () => {
    return (
        <img src={'https://media.istockphoto.com/photos/3d-rendering-abstract-cosmic-background-ultra-violet-neon-rays-lines-picture-id1265005920?k=20&m=1265005920&s=612x612&w=0&h=rLn5ySeSLxgDT5DIzVICIg261HM7T1oEinTEHmEnAHc='} alt={'Hero Img'} width={'100%'} height={'100%'} style={{filter: 'blur(6.9px)'}} />
    );
};

export default Hero;