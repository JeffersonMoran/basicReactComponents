import React from 'react'
import { Paper, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab/Fab';

const FilterComponent = ({ handleChangeField, query, text, search, openAdd, openAddText }) => (
    <Paper style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 20 }}>
        <div className="input-field col s12" style={{ padding: '10px' }}>
            <i className="material-icons prefix">search</i>
            <input id="field_query" type="text" value={query} onChange={handleChangeField("query")} />
            <label htmlFor="field_query">{text}</label>
        </div>
        <div className="input-field col s2" style={{ marginLeft: '10px' }}><a className="waves-effect waves-light blue btn" style={{ color: 'white', paddingLeft: '10px' }} onClick={() => search()}>Pesquisar</a></div>

        <div style={{ flex: 1 }} />

        {openAdd &&
        <Tooltip title={openAddText}>
            <Fab color='secondary' component="span" onClick={() => openAdd() } style={{ margin: 'theme.spacing.unit', float: 'right' }}>
                <i class="material-icons">
                    add
                </i>
            </Fab>
        </Tooltip>}
    </Paper>
)

export default FilterComponent;