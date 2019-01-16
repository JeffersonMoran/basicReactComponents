import React from 'react';
import { TextField, Card, CardContent, CardHeader, Tooltip, Button } from '@material-ui/core';
import { isValidEmail } from '../../helpers/FieldsValidation';
import PayerInfoComponent from './PayerInfoComponent';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';

const BasicInfoComponent = ({ userLogin, image, handleSelectedFile, margin, text, name, email, validate, handleChange, disabled, ...props }) => {
    const helperName = !name && validate ? 'Preencha o nome' : '';
    const helperEmail = !isValidEmail(email) && validate ? 'Email inválido' : '';

    return (
        <Card style={margin}>
            <CardHeader title={text}
                subheader={userLogin ?
                    <div >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="flat-button-file"
                            multiple={false}
                            type="file"
                            onChange={handleSelectedFile('image')}
                        />
                        <label htmlFor="flat-button-file">
                            <Tooltip title="Trocar Imagem" aria-label="Trocar Imagem">
                                <Fab color='secondary' component="span" style={{ margin: 'theme.spacing.unit', float: 'right' }}>
                                    <i class="material-icons">
                                        cloud_upload
                                    </i>
                                </Fab>
                            </Tooltip>
                        </label>
                    </div>
                    : ''}
            />
            <CardContent>
                <div className="row">
                    <div className="col s6">
                        <TextField
                            error={helperName.length > 0}
                            margin="dense"
                            label="Nome"
                            InputProps={{ disableUnderline: true }}
                            type="text"
                            fullWidth
                            value={name}
                            helperText={helperName}
                            onChange={handleChange('name')}
                        />
                    </div>
                    <div className='col s6'>
                        <TextField
                            error={helperEmail.length > 0}
                            margin="dense"
                            label="Email"
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            type="text"
                            value={email}
                            onChange={handleChange('email')}
                            helperText={helperEmail}
                        />
                    </div>
                </div>
                <PayerInfoComponent
                    {...props}
                    validate={validate}
                    userLogin={userLogin}
                    handleChange={handleChange}
                />
            </CardContent>
        </Card>
    )
}

export default BasicInfoComponent