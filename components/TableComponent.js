import React from 'react'
import EnhancedTableToolbar from './UI Elements/EnhancedTableToolbar';
import { TablePagination, withStyles } from '@material-ui/core';
import TableContentComponent from './TableContentComponent';

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

const TableComponent = ({ title, onFilterClick, handleChangePage, onEmailClick, rowsPerPage, page, data, selected, filter, ...props }) => (
    <div className="card-content">
        <EnhancedTableToolbar
            {...props}
            numSelected={selected.length}
            //exportSelected={() => this.excelSheet.download()}
            onEmailClick={onEmailClick}
            onFilterClick={onFilterClick}
            onFilterClearClick={Object.values(filter).length === 0 ? undefined : this.clearFilter}
            title={title}
        />

        <TableContentComponent 
            {...props}
            rowsPerPage={rowsPerPage}
            page={page}
            data={data}
            selected={selected}
        />

        <TablePagination
            {...props}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Página anterior',
            }}
            nextIconButtonProps={{
                'aria-label': 'Próxima página',
            }}
            onChangePage={handleChangePage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
    </div>
)

export default withStyles(styles)(TableComponent)