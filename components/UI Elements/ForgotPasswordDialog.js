import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropType from 'prop-types';
import { TextField, CircularProgress } from '@material-ui/core';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {forgotPassword} from "../../../auth/store/actions/login.actions";
import { isValidEmail } from "../../../helpers/FieldsValidation";

class ForgotPasswordDialog extends React.Component {

    state = {
        email: '',
        validate: false,
        loading: false
    };

    verifyInfo = () => {
        const { email } = this.state;
        if (!isValidEmail(email)) {
            this.setState({ validate: true });
            return;
        }
        this.setState({ loading: true });
        this.props.actions.forgotPassword(email, (success, error) => {
            if (error) {
                this.setState({ loading: false });
                this.props.notificationSystem.addNotification({
                    title: 'Email não encontrado',
                    message: 'Por favor verifique suas informações e tente novamente',
                    level: 'error',
                    autoDismiss: 4
                });
            } else {
                this.reset();
                this.props.onSuccess();
            }
        })
    };

    reset = () => {
        this.setState({ loading: false, email: '', validate: false });
    };

    render() {
        const { open, onClose } = this.props;
        const { email, validate, loading } = this.state;

        const helperEmail = validate && !isValidEmail(email) ? 'Email inválido' : '';

        return (
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={() => {
                    this.reset();
                    onClose();
                }}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Recuperação de senha</DialogTitle>
                <DialogContent>
                    <DialogContentText>Preencha seu email para recuperar sua senha</DialogContentText>

                    {loading ? <CircularProgress style={{ margin: '50px auto', display: 'block'}} size={80} /> :
                            <TextField
                                error={validate && !isValidEmail(email)}
                                autoFocus
                                margin="dense"
                                label="Email"
                                InputProps={{ disableUnderline: true }}
                                type="email"
                                fullWidth
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })}
                                helperText={helperEmail}
                            />
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} onClick={() => {
                        this.reset();
                        onClose();
                    }} color="secondary">
                        Cancelar
                    </Button>
                    <Button variant={'contained'} onClick={this.verifyInfo} color="primary">
                        Enviar email
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ForgotPasswordDialog.propTypes = {
    open: PropType.bool.isRequired,
    onClose: PropType.func,
    onSuccess: PropType.func
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(forgotPassword, dispatch)
});

export default connect(null, mapDispatchToProps)(ForgotPasswordDialog);