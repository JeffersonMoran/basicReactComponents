import React from 'react'
import NumberFormat from 'react-number-format';
import GenerateInputComponent from './GenerateCustomInput';
import { isValidCpf, isValidCnpj } from '../../helpers/FieldsValidation';
import { FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';

const PayerInfoComponent = ({ userLogin, cpf_cnpj, isCompany, handleChange, type, phone, validate, handleChangeValue, handleClick }) => {
    const helperTelephone = !phone && validate ? 'Preencha o telefone' : '';
    const helperCpf = !isCompany() && !isValidCpf(cpf_cnpj) && validate ? 'Cpf Inválido' : '';
    const helperCnpj = isCompany() && !isValidCnpj(cpf_cnpj) && validate ? 'Cnpj inválido' : '';
    return (
        <div className='row'>
            <div className='form-group col s6'>
                <NumberFormat
                    error={helperTelephone.length > 0}
                    value={phone}
                    label="Telefone"
                    format='(##) ####-####'
                    mask={['-']}
                    onValueChange={handleChangeValue('phone')}
                    helperText={helperTelephone}
                    customInput={GenerateInputComponent}
                />
                { userLogin === true ? <Button className="waves-effect waves-light btn-small green" style={{ color: 'white' }} onClick={handleClick}>Trocar Senha</Button> : ''}
            </div>
            <div className="form-group col s6">
                <NumberFormat
                    error={isCompany() ? helperCnpj.length > 0 : helperCpf.length > 0}
                    value={cpf_cnpj}
                    label={isCompany() ? 'CNPJ' : 'CPF'}
                    format={isCompany() ? '##.###.###/####-##' : '###.###.###-##'}
                    mask={isCompany() ? ['.', '.', '/', '-'] : ['.', '.', '/']}
                    onChange={handleChange('cpf_cnpj')}
                    disabled={userLogin === true}
                    helperText={isCompany() ? helperCnpj : helperCpf}
                    customInput={GenerateInputComponent}
                />
                <RadioGroup
                    aria-label="Tipo pessoa"
                    name="type"
                    style={{ display: 'inline-block' }}
                    value={type}
                    onChange={handleChange('type')}
                >
                    <FormControlLabel value="Pessoa Física" disabled={userLogin === true} control={<Radio />} label="Pessoa Física" />
                    <FormControlLabel value="Pessoa Jurídica" disabled={userLogin === true} control={<Radio />} label="Pessoa Jurídica" />
                </RadioGroup>
            </div>
        </div>
    )
}

export default PayerInfoComponent