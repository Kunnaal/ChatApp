import React from "react";
import { Box, Button, TextField } from '@mui/material';

const Register = () => {
    return(
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-password-input" label="Password" type="password" />
            <input name="image_id" value="1" style={{display: "none"}} />
            <Button variant="contained">Contained</Button>
        </Box>
    );
};

export default Register;
