import React from 'react';
import { TextField, CardHeader, CardContent, Card } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { GenerateInputComponent } from './GenerateCustomInput';

const AddressComponent = ({ text, validate, number, district, zip_code, city, state, complement, street, handleChange, handleChangeValue }) => {
    const helperZipCode = !zip_code && validate ? 'Preencha o cep' : '';
    const helperStreet = !street && validate ? 'Preencha a rua' : '';
    const helperCity = !city && validate ? 'Preencha a cidade' : '';
    const helperState = !state && validate ? 'Preencha o estado' : '';
    const helperDistrict = !district && validate ? 'Preencha o bairoo' : '';
    const helperNumber = !number && validate ? 'Preencha o número' : '';

    return (
        <Card>
            <CardHeader title={text} />
            <CardContent>
                <div className='section'>
                    <div style={{ padding: '0 20px 0 20px' }} className='row'>
                        <div className="col s6">
                            <TextField
                                error={helperStreet.length > 0}
                                margin="dense"
                                label="Rua"
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                fullWidth
                                helperText={helperStreet}
                                value={street}
                                onChange={handleChange('street')}
                            />
                        </div>
                        <div className='col s3'>
                            <NumberFormat
                                value={number}
                                label="Número"
                                onValueChange={handleChangeValue('number')}
                                error={helperNumber.length > 0}
                                helperText={helperNumber}
                                customInput={GenerateInputComponent}
                            />
                        </div>
                        <div className='col s3'>
                            <NumberFormat
                                value={zip_code}
                                label="CEP"
                                format='#####-###'
                                mask={['-']}
                                onValueChange={handleChangeValue('zip_code')}
                                error={helperZipCode.length > 0}
                                helperText={helperZipCode}
                                customInput={GenerateInputComponent}
                            />
                        </div>
                    </div>
                    <div style={{ padding: '0 20px 0 20px' }} className="row">
                        <div className='col s6'>
                            <TextField
                                margin="dense"
                                label="Bairro"
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                fullWidth
                                value={district}
                                error={helperDistrict.length > 0}
                                helperText={helperDistrict}
                                onChange={handleChange('district')}
                            />
                        </div>
                        <div className='col s6'>
                            <TextField
                                margin="dense"
                                label="Complemento"
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                fullWidth
                                value={complement}
                                onChange={handleChange('complement')}
                            />
                        </div>
                    </div>
                    <div style={{ padding: '0 20px 0 20px' }} className='row'>
                        <div className="col s6">
                            <TextField
                                error={helperCity.length > 0}
                                margin="dense"
                                label="Cidade"
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                fullWidth
                                value={city || ''}
                                onChange={handleChange('city')}
                                helperText={helperCity}
                            />
                        </div>
                        <div className='col s6'>
                            <TextField
                                error={helperState.length > 0}
                                margin="dense"
                                label="Estado"
                                InputProps={{ disableUnderline: true }}
                                type="text"
                                fullWidth
                                value={state}
                                onChange={handleChange('state')}
                                helperText={helperState}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddressComponent;