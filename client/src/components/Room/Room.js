import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import DNE from "../DNE/DNE";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

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
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        );
    }
};

export default Room;
