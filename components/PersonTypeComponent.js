import React from 'react'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import GenerateInputComponent from './GenerateCustomInput';
import NumberFormat from 'react-number-format';
import { isValidCpf, isValidCnpj } from '../../helpers/FieldsValidation';

const PersonTypeComponent = ({ method, type, cpf_cnpj, validate, handleChange, isCompany }) => {
    const helperCpf = method === 'bank_slip' && !isCompany() && !isValidCpf(cpf_cnpj) && validate ? 'Cpf Inválido' : '';
    const helperCnpj = method === 'bank_slip' && isCompany() && !isValidCnpj(cpf_cnpj) && validate ? 'Cnpj inválido' : '';

    return (
        <div className='row'>
            <div className="form-group col s6">
                <NumberFormat
                    error={isCompany() ? helperCnpj.length > 0 : helperCpf.length > 0}
                    value={cpf_cnpj}
                    label={isCompany() ? 'CNPJ' : 'CPF'}
                    format={isCompany() ? '##.###.###/####-##' : '###.###.###-##'}
                    mask={isCompany() ? ['.', '.', '/', '-'] : ['.', '.', '/']}
                    onChange={handleChange('cpf_cnpj')}
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
                    <FormControlLabel value="Pessoa Física" control={<Radio />} label="Pessoa Física" />
                    <FormControlLabel value="Pessoa Jurídica" control={<Radio />} label="Pessoa Jurídica" />
                </RadioGroup>
            </div>
        </div>
    )
}
export default PersonTypeComponent