import React from 'react'
import { Card, CardContent, AppBar, Tabs, Tab, Collapse, CardHeader } from '@material-ui/core';
import AddressComponent from './AddressComponent';
import CreditCardComponent from './CreditCardComponent';

const PaymentComponent = ({ handleChangeTab, method, ...props }) => (

    <Card style={{ marginTop: '40px'}}>
        <CardHeader title={'Pagamento'}/>
        <CardContent>
            <AppBar position="static" position="relative" style={{ color: 'black', flex:'auto' }}>
                <Tabs textColor="primary" value={method} onChange={handleChangeTab} variant="fullWidth">
                    <Tab value="credit_card" label="Cartão de Crédito" style={{ color: 'white' }} />
                    <Tab value="bank_slip" label="Boleto Bancário" style={{ color: 'white' }} />
                </Tabs>
            </AppBar>
            <Collapse in={method === 'bank_slip'}>
                <AddressComponent
                    text={'Confimação de Endereço'}
                    {...props}
                />
            </Collapse>
            <Collapse in={method === 'credit_card'}>
                <CreditCardComponent
                    {...props}
                />
            </Collapse>
        </CardContent>
    </Card>
)

export default PaymentComponent