import React from 'react'
import { InputLabel, Select, MenuItem, Radio, FormControl, RadioGroup, FormControlLabel, FormHelperText } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { bankConstants } from '../../constants';
import GenerateInputComponent from './GenerateCustomInput';

const BankInfoComponent = ({ text, validate, bank_ag, bank_cc, account_type, bank, handleChange }) => {
    const helperAccountType = !account_type && validate ? 'Escolha o tipo de conta' : '';
    const helperBank = !bank && validate ? 'Selecione um banco' : '';
    const helperBankCC = !bank_cc && validate ? 'Preencha os números da conta' : '';
    const helperBankAg = !bank_ag && validate ? 'Preencha a agência' : '';
    return (
        <div className='section'>
            <div className="row">
                <h3>{text}</h3>
                <div style={{ paddingTop: '7px' }} className="form-group col s4">
                    <InputLabel htmlFor="bank">Banco</InputLabel>
                    <Select
                        value={bank || ''}
                        fullWidth
                        onChange={handleChange('bank')}
                        inputProps={{ name: 'bank', id: 'bank' }}
                    >
                        {Object.values(bankConstants).map(b => {
                            return <MenuItem value={b.value}>{b.name}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText error={helperBank.length > 0}>{helperBank}</FormHelperText>
                </div>
                <div className="col s4">
                    <NumberFormat
                        error={helperBankAg.length > 0}
                        label="Agência"
                        format={bankConstants[bank] && bankConstants[bank].agFormat}
                        value={bank_ag || ''}
                        onChange={handleChange('bank_ag')}
                        helperText={helperBankAg}
                        customInput={GenerateInputComponent}
                    />
                </div>
                <div className="col s4">
                    <NumberFormat
                        error={helperBankCC.length > 0}
                        label="Conta"
                        format={bankConstants[bank] && bankConstants[bank].ccFormat}
                        value={bank_cc || ''}
                        onChange={handleChange('bank_cc')}
                        helperText={helperBankCC}
                        customInput={GenerateInputComponent}
                    />
                </div>
            </div>
            <div className={'row'}>
                <div className="form-group col s6">
                    <FormControl>
                        <RadioGroup
                            error={Boolean(helperAccountType)}
                            helperText={helperAccountType}
                            aria-label="Tipo da conta"
                            name="account_type"
                            style={{ display: 'inline-block' }}
                            value={account_type || ''}
                            onChange={handleChange('account_type')}
                        >
                            <FormControlLabel value="Corrente" control={<Radio />} label="Conta Corrente" />
                            <FormControlLabel value="Poupança" control={<Radio />} label="Poupança" />
                        </RadioGroup>
                        <FormHelperText error>{helperAccountType}</FormHelperText>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default BankInfoComponent