import React from 'react'
import { Button } from '@material-ui/core';

const BasicButtonsComponent = ({ confirm, cancel, resetState }) => (
    <div style={{ marginTop: '40px' }}>
        <div className="row">
            <div className='col s3 push-s6'>
                <Button className={cancel === 'Verificar'?  "waves-effect waves-light btn-small green" : "waves-effect waves-light btn-small red"} fullWidth style={{ color: 'white' }} onClick={resetState}>
                    {cancel}
                </Button>
            </div>
            <div className='col s3 push-s6'>
                <Button className="waves-effect waves-light btn-small indigo" fullWidth type='submit' style={{ color: 'white', marginRight: '5px' }}>
                    {confirm}
                </Button>
            </div>
        </div>
    </div>
)

export default BasicButtonsComponent