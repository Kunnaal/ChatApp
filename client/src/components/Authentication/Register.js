import * as React from 'react';
import { useState } from 'react';
import { NO_IMAGES } from "../../index";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardActions, CardContent, CardMedia, TextField } from '@mui/material';

const Register = () => {

    const navigate = useNavigate();

    const rand_img_id = Math.floor(Math.random()*NO_IMAGES);

    const [imageId, setImageId] = useState(rand_img_id);
    const [passwordState, setPasswordState] = useState("password");

    const handleLeft = () => {
        if (imageId > 0) {
            setImageId(imageId-1);
        } else {
            setImageId(NO_IMAGES-1);
        }
    }

    const handleRight = () => {
        if (imageId < (NO_IMAGES-1)) {
            setImageId(imageId+1);
        } else {
            setImageId(0);
        }
    }

    const showPassword = () => {
        if (passwordState === "password") {
            setPasswordState("text");
        } else {
            setPasswordState("password");
        }
    }

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

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": user.username, "password": user.password, "image_id": imageId}),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            navigate('/login');
        }
    }

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={`../../../user_images/${imageId}.png`}
                alt="profile picture"
                style={{
                    height: "100px",
                    width:"100px",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: "20px",
            }}
            />
            <div style={{
                display: "inline-block",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
            }}>
                <Button onClick={handleLeft}> &#9001; </Button><Button onClick={handleRight}> &#9002; </Button>
            </div>
            <CardContent>
                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
                    <TextField id="outlined-basic" label="Username" variant="outlined" name="username" onChange={handleChange} />
                    <TextField id="outlined-password-input" label="Password" type={passwordState} name="password" onChange={handleChange} />
                    <VisibilityIcon onClick={showPassword} style={{
                        position: "relative",
                        transform: "translate(-44px, 24px)",
                        margin: "0",
                        width: "30",
                    }}/>
                </Box>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleClick}>Submit</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Register;