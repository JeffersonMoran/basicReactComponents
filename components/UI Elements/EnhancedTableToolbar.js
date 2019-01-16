import React from 'react';
import { withStyles } from "@material-ui/core/styles/index";
import { Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core';
import { FilterList, ClearAll, SwapHoriz, HelpOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

export function desc(a, b, orderBy) {
    if (_.get(b, orderBy) < _.get(a, orderBy)) {
        return -1;
    }
    if (_.get(b, orderBy) > _.get(a, orderBy)) {
        return 1;
    }
    return 0;
}

export function sortData(array, order, orderBy) {
    return stableSort(array, getSorting(order, orderBy))
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: 'white',
                background: 'linear-gradient(45deg, #2980B9 30%, #6DD5FA 90%)'
            }
            : {
                color: theme.palette.text.primary,
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        flexDirection: 'row',
        display: 'flex'
    },
    tooltip: {
        background: 'white',
        margin:5
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes, exportSelected, onEmailClick, onFilterClick, title, onFilterClearClick } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selecionados
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        {title}
                    </Typography>
                )}
            </div>

            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    [onEmailClick && <Tooltip title="Enviar email" key={'Email'}>
                        <IconButton id={'emailButton'} aria-label="Email" className={classes.tooltip} onClick={onEmailClick}>
                            <i className={'fa fa-envelope'}/>
                        </IconButton>
                    </Tooltip>,
                        exportSelected && <Tooltip title="Exportar para Excel" key={'Excel'}>
                            <IconButton id={'excelButton'} aria-label="Excel" className={classes.tooltip} onClick={exportSelected}>
                                <i className={'fa fa-file-excel'} />
                            </IconButton>
                        </Tooltip>]
                ) : (
                    [onFilterClearClick && <Tooltip title="Limpar filtro" key={'Limpar'}>
                        <IconButton aria-label="Limpar filtro" onClick={onFilterClearClick}>
                            <ClearAll />
                        </IconButton>
                    </Tooltip>,
                        onFilterClick && <Tooltip title="Filtrar lista" key={'Filtrar'}>
                        <IconButton id={'filterButton'} aria-label="filtar" onClick={onFilterClick}>
                            <FilterList />
                        </IconButton>
                    </Tooltip>]
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onEmailClick: PropTypes.func,
    onFilterClearClick: PropTypes.func,
    onFilterClick: PropTypes.func,
    exportSelected: PropTypes.func
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);