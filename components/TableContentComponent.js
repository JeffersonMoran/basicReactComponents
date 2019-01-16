import React from 'react';
import { withStyles, Table, TableBody, TableRow, TableCell, IconButton, Tooltip, Icon } from '@material-ui/core';
import EnhancedTableHead from './UI Elements/EnhancedTableHead';
import moment from 'moment';
import { verify_status } from "../../constants/user.constants";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
        overflowX: 'auto',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    }
});

const TableContentComponent = ({ type, rows, handleSelectAllClick, isSelectedFunc, handleRequestSort, handleClick, subaccount, classes, order, orderBy, rowsPerPage, page, data, selected, editRegister, verifyRegister, ...props }) => {
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                    rows={rows}
                    {...props}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    subaccount={subaccount}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                />
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                            const isSelected = isSelectedFunc(n._id);
                            return (
                                <TableRow
                                    className={classes.row}
                                    hover
                                    onClick={(event) => handleClick(event, n)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    key={n._id}
                                    selected={isSelected}
                                >
                                    {subaccount ?
                                        <TableCell padding="checkbox">
                                            <Tooltip title={verify_status[n.client.verification_status].hoverLabel}>
                                                <IconButton label={"Verificar"} disabled={n.client.verification_status === verify_status.processing} onClick={() => verifyRegister(n._id)}>
                                                    <Icon label={"Verificar"} style={{ color: verify_status[n.client.verification_status].color }}>account_balance</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell> : ''
                                    }
                                    <TableCell padding="checkbox">
                                        <Tooltip title="Editar">
                                            <IconButton label={"Editar"} onClick={() => editRegister(n._id)}>
                                                <Icon label={"Editar"}>edit</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    {rows.map((item) => {
                                        if(type === 'charges' ) {
                                            let total = 0;
                                            if(n.items) for(let i = 0; i < n.items.length; i++) total = total + n.items[i].price_cents;
                                            switch(item.id) {
                                                case 'createdAt':
                                                    return <TableCell key={"date" + n._id}>{moment(n[item.id]).locale('pt-br').format('ddd, DD/MM/YYYY')}</TableCell>
                                                case 'status':
                                                    return  <TableCell numeric={item.numeric ? true : false}>{n[item.id] === 'payed' ? 'Pago' : 'Pendente'}</TableCell>
                                                case 'total' :
                                                    return <TableCell numeric={item.numeric ? true : false}>{total || 0}</TableCell>
                                                default:
                                                    return ( <TableCell numeric={item.numeric ? true : false}>{n.customer && (item.id === 'name' || item.id === 'email') ? n.customer[item.id] : n[item.id]}</TableCell> )
                                            }
                                        }
                                        return <TableCell numeric={item.numeric ? true : false}>{item.id === 'created_at' ? moment(n[item.id]).locale('pt-br').format('ddd, DD/MM/YYYY') : n[item.id]}</TableCell> 
                                    })
                                    }
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(TableContentComponent)