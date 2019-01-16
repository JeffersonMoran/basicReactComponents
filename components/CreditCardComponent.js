import React from 'react'
import { TextField, Card, CardHeader, CardContent } from '@material-ui/core';
import { GenerateInputComponent } from './GenerateCustomInput';
import NumberFormat from 'react-number-format';

const CreditCardComponent = ({ first_name, last_name, validate, credit_card_number, verification_value, date, handleChange, handleChangeValue }) => {
    const helperFirstName = !first_name && validate ? 'Preencha corretamente' : '';
    const helperLastName = !last_name && validate ? 'Preencha corretamente' : '';
    const helperNumber = !credit_card_number && validate ? 'Preencha corretamente' : '';
    const helperVerificationValue =  !verification_value && validate ? 'Preencha corretamente' : '';
    const helperDate =  !date && validate ? 'Preencha corretamente' : '';

    return (
        <Card>
            <CardContent>
                <div className='section'>
                    <div style={{ padding: '0 20px 0 20px' }} className='row'>
                        <div className="form-group col s6">
                            <TextField
                                error={helperFirstName.length > 0}
                                margin="dense"
                                label="Primeiro nome no cartão"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                value={first_name}
                                helperText={helperFirstName}
                                onChange={handleChange('first_name')}
                            />
                        </div>
                        <div className="col s6">
                            <TextField
                                error={helperLastName.length > 0}
                                margin="dense"
                                label="Sobrenome no cartão"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                value={last_name}
                                helperText={helperLastName}
                                onChange={handleChange('last_name')}
                            />
                        </div>
                    </div>
                    <div style={{ padding: '0 20px 10px 20px' }} className='row'>
                        <div className="col s6">
                            <NumberFormat
                                value={credit_card_number}
                                error={helperNumber.length > 0}
                                format={'#### #### #### ####'}
                                label='Número do Cartão'
                                mask={' '}
                                helperText={helperNumber}
                                onValueChange={handleChangeValue('credit_card_number')}
                                customInput={GenerateInputComponent}
                            />
                        </div>
                        <div className='col s3'>
                            <NumberFormat
                                error={helperDate.length > 0}
                                value={date}
                                format={'##/##'}
                                label='Validade'
                                mask={['/']}
                                helperText={helperDate}
                                onValueChange={handleChangeValue('date')}
                                customInput={GenerateInputComponent}
                            />
                        </div>
                        <div className="col s3">
                            <NumberFormat
                                error={helperVerificationValue}
                                value={verification_value}
                                format={'###'}
                                label='CVV'
                                helperText={helperVerificationValue}
                                onValueChange={handleChangeValue('verification_value')}
                                customInput={GenerateInputComponent}
                            />
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CreditCardComponent;