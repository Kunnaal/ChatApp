import * as React from 'react';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

const VideoCall = () => {


    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Paper>
                    ME Component.
                </Paper>
            </Grid>
        </Grid>
    );
}

export default VideoCall;
