import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from './EnhancedCheckbox';
import { IconButton } from '@material-ui/core';

export default class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { subaccount, order, orderBy, rows } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {subaccount ?
                        <TableCell padding="checkbox">
                            <IconButton disabled={true}>
                                <i className="material-icons" aria-label="edit">
                                    account_balance
                            </i>
                            </IconButton>
                        </TableCell>
                        : ''
                    }
                    <TableCell padding="checkbox">
                        <IconButton disabled={true}>
                            <i className="material-icons" aria-label="edit">
                                edit
                            </i>
                        </IconButton>
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                className={'joyColumn'}
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Ordenar"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};