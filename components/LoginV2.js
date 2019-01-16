import React from "react";
import "../../statics/css/custom.css";
import NotificationSystem from 'react-notification-system';
import ForgotPasswordDialog from '../components/UI Elements/ForgotPasswordDialog';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import { isValidEmail } from "../../helpers/FieldsValidation";

const $ = window.$;

class LoginV2 extends React.Component {

  state = {
    openForgotPassword: false,
    validate: false,
    isAdm: false,
    tutorial: 0
  };

  componentWillMount() {
    // $('#ImageFade').animateCss('fadeIn');
    this.isAdmLogin();
  }

  onLoginFail() {
    this.notificationSystem.addNotification({
      title: 'Erro ao entrar',
      message: 'Verifique seu suas credenciais ou sua conexão e tente novamente',
      level: 'error',
      autoDismiss: 4
    });
  }

  isAdmLogin() {
    const url = window.location.href;
    const adm = url.split('/')[3];
    if (adm === 'adm') {
      this.setState({
        isAdm: true
      })
    } 
  }

  render() {
    const { props } = this;
    const { isAdm } = this.state;
    const { validate } = props;
    const helperEmail = validate && !isValidEmail(props.user) ? 'Email inválido' : '';

    return (
      <div style={{ fontFamily: 'Poppins-Regular' }}>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form" style={{ padding: 20, paddingTop: 80 }}>

                <div style={{ paddingBottom: 50 }}>
                  <img className={'login100-form-logo'} width={150} src={require('../../statics/imgs/logo.png')} />
                </div>
                {
                  isAdm ? 
                  <span className="login100-form-title p-b-23">
                   Painel Administrativo
                  </span> :
                  <span className="login100-form-title p-b-23">
                    Painel Cliente
                 </span>  
                }

                <div>
                  <form className="login-form" onSubmit={e => {
                    e.preventDefault();
                    if (isAdm === true) {
                      props.login()
                    } else {
                      props.userLogin()
                    }
                  }}>
                    <div className="form-group">
                      <TextField
                        error={validate && !isValidEmail(props.user)}
                        autoFocus
                        margin="dense"
                        label="Usúario"
                        InputProps={{ disableUnderline: true }}
                        type="email"
                        fullWidth
                        value={props.user}
                        onChange={props.handleChange("user")}
                        helperText={helperEmail}
                      />
                    </div>
                    <div className="form-group">
                      <TextField
                        margin="dense"
                        label="Senha"
                        InputProps={{ disableUnderline: true }}
                        type="password"
                        fullWidth
                        value={props.password}
                        onChange={props.handleChange("password")}
                      />
                    </div>

                    <div>
                      {!props.loading ? (
                        <div className="container-login100-form-btn">
                          <Button className="login100-form-btn" type="submit" style={{ backgroundColor: '#322d2f', color: 'white' }}>
                            Entrar
                              </Button>
                        </div>
                      ) : (
                          <div style={{ margin: '10px 0', height: 50 }}>
                            <LinearProgress />
                          </div>
                        )}
                    </div>

                  </form>
                </div>


                <div className="flex-sb-m w-full p-t-3 p-b-22">
                  <div>
                    <b>
                      <a onClick={() => this.setState({ openForgotPassword: true })} className="txt1" style={{ cursor: 'pointer' }}>
                        esqueceu a senha?
                      </a>
                    </b>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ForgotPasswordDialog
          notificationSystem={this.notificationSystem} open={this.state.openForgotPassword} onClose={() => this.setState({ openForgotPassword: false })}
          onSuccess={() => {
            this.setState({ openForgotPassword: false });
            this.notificationSystem.addNotification({
              title: 'Sucesso!',
              message: 'Verifique seu email com instruções para alterar sua senha',
              level: 'success',
              autoDismiss: 4
            });
          }}
        />

        <NotificationSystem ref={ref => this.notificationSystem = ref} />

      </div>
    );
  }
}

export default LoginV2;
