import React from 'react';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { GenerateInputComponent } from './GenerateCustomInput'

const DonationComponent = ({ text, price_cents, validate, handleClick, handleChangeValue }) => {
    const helperPriceCents = !price_cents && validate ? 'Escolha um valor para doar' : '';
    return (
        <Card>
            <CardHeader title={text}/>
            <CardContent>
                <div className='section'>
                    <div style={{ padding: '10px 20px 0 20px' }} className='row'>
                        <br />
                        <div className="col s3">
                            <Button className="waves-effect waves-light btn-small green" style={{ color: 'white' }} value={'5'} fullWidth onClick={handleClick('price_cents')}>R$5</Button>
                        </div>
                        <div className="col s3">
                            <Button className="waves-effect waves-light btn-small green" style={{ color: 'white'}} value={'10'} fullWidth onClick={handleClick('price_cents')}>R$10</Button>
                        </div>
                        <div className="col s3">
                            <Button className="waves-effect waves-light btn-small green" style={{ color: 'white' }} value={'20'} fullWidth onClick={handleClick('price_cents')}>R$20</Button>
                        </div>
                        <div className="col s3">
                            <Button className="waves-effect waves-light btn-small green" style={{ color: 'white' }} value={'50'} fullWidth onClick={handleClick('price_cents')}>R$50</Button>
                        </div>
                        <div className="col s3 push-s9">
                            <div className='form-group'>
                                <NumberFormat
                                    error={helperPriceCents.length > 0}
                                    prefix={'R$'}
                                    value={price_cents}
                                    name='price_cents'
                                    onValueChange={handleChangeValue('price_cents')}
                                    label="Valor"
                                    helperText={helperPriceCents}
                                    customInput={GenerateInputComponent}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default DonationComponent;