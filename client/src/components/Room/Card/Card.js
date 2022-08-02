import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, Snackbar, Button, Stack, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, styled } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { DOMAIN } from '../../../index';
import { useParams } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MeetCard(){
    const { code } = useParams();
    const [open, setOpen] = React.useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // Pop-up code link handlers
    const handleClickOpen = () => {
        // console.log("TWINKLE N00B");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    // Copy meet code function
    const copyCode = () => {
        // noinspection JSUnresolvedVariable
        const copied_code = document.getElementsByClassName('MeetCode').MeetCode.value;

        // Copy code to clipboard
        navigator.clipboard.writeText(copied_code).then(r => {
            // Popup and alter to display link is copied.
            handleClickAlert();
        });

        // console.log(copied_code);
        //After code is copied, close the card
        handleClose();
    }

    // Alert handlers
    function TransitionLeft(props) {
        return <Slide {...props} direction="right" />;
    }

    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }

    useEffect(() => {
        handleClickOpen();
        setOpenAlert(false);
    },[]);

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Roboto Mono' rel='stylesheet' />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Invite People
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Meet Link:
                    </Typography>
                    <Typography gutterBottom style={{fontFamily:'Roboto Mono', fontSize:'22px'}}>
                        { DOMAIN }/{ code }
                        <input style={{display:'none'}} className='MeetCode' name='MeetCode' value ={`${DOMAIN}/${code}`}/>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={copyCode}>
                        Copy meet link
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert} TransitionComponent={TransitionLeft} >
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Link copied!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}