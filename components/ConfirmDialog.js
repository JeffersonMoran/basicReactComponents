import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ open, onClose, onSuccess, title, text, textArea, buttonArea, textBankSlip }) => (
    <div>
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                    <br />
                    {textArea}
                    <div className='form-group'>
                        {textBankSlip}
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose() }} className="waves-effect waves-light btn-small red" style={{ color: 'white' }}>
                    Fechar
                </Button>
                {buttonArea ? buttonArea : <Button onClick={() => { onSuccess() }} className="waves-effect waves-light btn-small indigo" style={{ color: 'white' }} autoFocus>
                    Confirmar
                </Button>}
            </DialogActions>
        </Dialog>
    </div>
)

export default ConfirmDialog;