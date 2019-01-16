import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { sortData } from './UI Elements/EnhancedTableToolbar';
import { CircularProgress } from '@material-ui/core';
import NotificationSystem from 'react-notification-system';
import { bindActionCreators, compose } from 'redux';
import { connect } from "react-redux";
import * as Actions from "../../store/actions/charge/charge.actions";
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

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

class ChargesComponent extends Component {
    state = {
        data: [],
        selected: [],
        subaccountSelected: '',
        filter: {},
        order: 'desc',
        orderBy: 'createdAt',
        loading: false,
        value: 0,
        query: "",
        page: 0,
        rowsPerPage: 20,
        openModal: false,
        charge: null
    }

    componentDidMount() {
        //$.fn.SimpleInit();
        // const token = await userService.restoreTokenData();
        // console.log(this.props);
        // !token && this.props.history.push("/login");
        this.loadCharges();
    }

    componentWillReceiveProps(props) {
        const { order, orderBy } = this.state;
        this.setState({ data: sortData(props.charges, order, orderBy) })
    }

    loadCharges = () => {
        this.setState({ loading: true });
        this.props.actions.getCharges(success => {
            console.log('sucesso');
            console.log(success);
            // if (!success) {
            //     this.notificationSystem.addNotification({
            //         title: 'Erro ao carregar SubContas',
            //         message: 'Verifique sua conexão e tente novamente',
            //         level: 'error',
            //         autoDismiss: 4
            //     });
            // }
            this.setState({ loading: false });
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    editCharge = (id) => {
        this.props.actions.getCharge(id, success => {
            if(success) {
                this.setState({ openModal: true });
            }
        })
    }

    handleClick = (event, data) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(data._id);
        let newSelected = [...selected];
        if (selectedIndex === -1) {
            newSelected.push(data._id);
        } else {
            newSelected.splice(selectedIndex, 1);
        }

        this.setState({ selected: newSelected });
    };

    rows = () => {
        return [
            { id: 'name', numeric: false, date: false, disablePadding: false, label: 'Cliente' },
            { id: 'email', numeric: false, date: false, disablePadding: false, label: 'Email' },
            { id: 'createdAt', numeric: false, date: true, disablePadding: false, label: 'Data' },
            { id: 'total', numeric: true, date: false, disablePadding: false, label: 'Valor' },
            { id: 'status', numeric: false, date: false, disablePadding: false, label: 'Status' }
        ]
    };

    handleChangeField = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy, data: sortData(this.state.data, order, orderBy) });
    };

    handleSelectAllClick = () => {
        const { selected, data } = this.state;
        if (selected.length !== data.length) {
            this.setState(state => ({ selected: state.data.map(n => n._id) }));
        } else {
            this.setState({ selected: [] });
        }
    };

    render() {
        const { loading, charge } = this.state;
        const { classes } = this.props;

        return (
            <div className="main-wrapper" id="main-wrapper">
                <div className="page-wrapper" style={{ padding: '10px 5px 5px 5px' }}>
                    <div className="container-fluid" style={{ padding: '10px' }}>
                        <FilterComponent
                            {...this.state}
                            handleChangeField={this.handleChangeField}
                            text="Nome ou Email"
                        />
                        <div className="col l2 s10">
                            <div className="card">
                                {loading ?
                                    <div className="card-content" style={customStyles.progressContainer}>
                                        <CircularProgress className={classes.progress} size={50} />
                                    </div>
                                    :
                                    <TableComponent
                                        {...this.state}
                                        rows={this.rows()}
                                        type={'charges'}
                                        isSelectedFunc={this.isSelected}
                                        handleSelectAllClick={this.handleSelectAllClick}
                                        handleRequestSort={this.handleRequestSort}
                                        handleClick={this.handleClick}
                                        editRegister={this.editCharge}
                                        handleChangePage={this.handleChangePage}
                                        title={'Todas as Faturas'}
                                    />
                                }
                            </div>
                        </div>
                        {/* <ConfirmDialog
                            open={openModal}
                            title={`Doação de ${name} contato :${email}`}
                            text={`Sua Doação: ${invoice_id}`}
                            textBankSlip={method === 'bank_slip' ? `Boleto:${identification}` : 'Doação feita por Cartãp de Crédito'}
                            onClose={() => this.setState({ openModal: false })}
                            onSuccess={() => this.setState({ openModal: false })}
                            buttonArea={<Button href={url} target="_blank" className="waves-effect waves-light btn-small green" style={{ float: 'right', color: 'white' }}>Fatura</Button>}
                        /> */}
                    </div>
                </div>
                <NotificationSystem ref={ref => this.notificationSystem = ref} />
            </div>
        )
    }
}

const customStyles = {
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        minHeight: 300
    }
};

const mapStateToProps = state => {
    return {
        charge: state.charges.charge,
        charges: state.charges.charges,
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(ChargesComponent);