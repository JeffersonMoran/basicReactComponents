import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropType from 'prop-types';
import Lottie from 'react-lottie';

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export default class InfoDialog extends React.Component {

    render() {
        const { open, onClose, onSuccess, title, description, lottie, cancelTitle, approveTitle } = this.props;
        return (
            <Dialog
                fullWidth
                maxWidth={'md'}
                open={open}
                onClose={onClose}
                onSuccess={onSuccess}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {description && <DialogContentText>{description}</DialogContentText>}
                    {lottie && <Lottie options={{...defaultOptions, animationData: lottie}} height={200} width={200} isPaused={false}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        {cancelTitle || 'Cancelar'}
                    </Button>
                    <Button onClick={onSuccess} color="primary">
                        {approveTitle || 'Sim'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

InfoDialog.propTypes = {
    title: PropType.string.isRequired,
    description: PropType.string,
    lottie: PropType.object,
    open: PropType.bool.isRequired,
    onClose: PropType.func,
    onSuccess: PropType.func,
    cancelTitle: PropType.string,
    approveTitle: PropType.string
};