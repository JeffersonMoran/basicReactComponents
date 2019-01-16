import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import {withStyles} from "@material-ui/core/styles/index";
import {
    CircularProgress,
    Table,
    TableBody,
    TableRow,
    TextField,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import Checkbox from '../UI Elements/EnhancedCheckbox';
import Lottie from 'react-lottie';
import * as animation from '../../statics/lottie/play-pause.json';

const enterKeyCode = 13;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
});

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

class GroupOrganizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteGroup: undefined,
            editIndex: -1,
            editName: '',
            loading: false,
            newGroupName: '',
            selected: [],
            hoverIndex: -1,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ loading: props.loading, selected: props.selected || [] })
    }

    handleClick = (e, group) => {
        const newSelected = [...this.state.selected];
        const index = newSelected.indexOf(group._id);
        if (index === -1) {
            newSelected.push(group._id);
        } else {
            newSelected.splice(index, 1);
        }
        this.setState({ selected: newSelected })
    };

    saveGroups = () => {
        this.props.onAssign(this.state.selected);
    };

    createGroup = () => {
        this.props.onCreate(this.state.newGroupName);
        this.setState({ newGroupName: '' });
    };

    updateGroup = (id, name) => {
        this.props.onUpdate(id, name);
    };

    deleteGroupRequest = (groupId) => {
        this.props.onDelete(groupId);
    };

    renderContent() {
        const { selected, loading, hoverIndex, editIndex, editName } = this.state;
        const { groups, classes } = this.props;

        if (loading) {
            return <CircularProgress className={classes.progress} style={contactStyles.loader} size={50} />;
        } else if (this.props.groups.length === 0) {
            return (
                <div style={contactStyles.noDataContainer}>
                    <Lottie options={defaultOptions} height={200} width={200} isPaused={false}/>
                    <div style={contactStyles.noDataLabel}>Nada por aqui! Escreva um nome acima e clique em Adicionar para começar a organizar seus grupos!</div>
                </div>
            );
        } else {
            return (
                <div style={contactStyles.tableContainer}>
                    <h5 style={contactStyles.header}>Adicionar a Grupos</h5>
                    <Table className={classes.table} style={{tableLayout: 'auto'}}>
                        <TableBody style={{ width: '100%' }}>
                            {groups.map((row, index) => {
                                const isSelected = selected.includes(row._id);
                                const isHovered = hoverIndex === index;
                                return (
                                    <TableRow
                                        hover
                                        key={row._id}
                                        role={"checkbox"}
                                        aria-checked={isSelected}
                                        selected={isSelected}
                                        onClick={e => this.handleClick(e, row)}
                                        onMouseEnter={() => this.setState({ hoverIndex: index })}
                                        onMouseLeave={() => this.setState({ hoverIndex: -1 })}
                                        style={{ alignItems: 'center', display: 'flex', width: 350 }}
                                    >
                                        <div>
                                            <Checkbox checked={isSelected} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            {editIndex === index ?
                                                <TextField
                                                    id="edit"
                                                    autoFocus
                                                    className={classes.textField}
                                                    value={editName}
                                                    onKeyDown={e => {
                                                        if (e.keyCode === enterKeyCode) {
                                                            this.setState({ editName: '', editIndex: -1 });
                                                            this.updateGroup(row._id, editName);
                                                        }
                                                    }}
                                                    onChange={e => this.setState({ editName: e.target.value })}
                                                    onBlur={() => {
                                                        this.setState({ editName: '', editIndex: -1 });
                                                        this.updateGroup(row._id, editName);
                                                    }}
                                                    margin="normal"
                                                /> :
                                                row.name
                                            }
                                        </div>
                                        {isHovered &&
                                        <div style={{ width: 100, flexDirection: 'row', display: 'flex' }}>
                                            <IconButton aria-label="Editar" style={contactStyles.hoverOption} onClick={e => {
                                                e.stopPropagation();
                                                this.setState({ editIndex: index, editName: row.name })
                                            }}>
                                                <i className={'fa fa-pencil'}/>
                                            </IconButton>
                                            <IconButton aria-label="Excluir" style={contactStyles.hoverOption} onClick={e => {
                                                e.stopPropagation();
                                                this.setState({ deleteGroup: this.props.groups[index] })
                                            }}>
                                                <i className={'fa fa-trash'}/>
                                            </IconButton>
                                        </div>}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )
        }
    }

    renderDialog() {
        const { deleteGroup } = this.state;
        return (
            <Dialog
                open={deleteGroup !== undefined}
                onClose={() => this.setState({ deleteGroup: undefined })}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Atenção</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Você tem certeza que deseja deletar o grupo ${deleteGroup && deleteGroup.name}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ deleteGroup: undefined })} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        this.props.onDelete(this.state.deleteGroup._id);
                        this.setState({ deleteGroup: undefined });
                    }} color="secondary">
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { open, anchorEl, onClose, classes, groups } = this.props;
        const { selected, loading, newGroupName } = this.state;
        const groupNames = groups.map(g => g.name);
        return (
            <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={() => {
                    this.setState({ selected: [] });
                    onClose(false)
                }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div style={contactStyles.headerContainer}>
                    <TextField
                        id="name"
                        label="Crie um novo grupo"
                        className={classes.textField}
                        value={this.state.newGroupName}
                        onChange={e => this.setState({ newGroupName: e.target.value })}
                        margin="normal"
                    />
                    <Button disabled={newGroupName.length === 0 || groupNames.includes(newGroupName)} onClick={this.createGroup} variant="contained" color="primary" className={classes.button}>
                        Criar
                    </Button>
                </div>
                <div style={contactStyles.popover}>

                    {this.renderContent()}

                    {selected.length > 0 && !loading &&
                    <Button style={contactStyles.button} variant="contained" color="primary" className={classes.button} onClick={this.saveGroups}>
                        Salvar
                    </Button>}
                </div>
                {this.renderDialog()}
            </Popover>
        )
    }

}

GroupOrganizer.prototypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onGet: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAssign: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    selected: PropTypes.array
};

const contactStyles = {
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444',
        padding: 5,
    },
    popover: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        height: 450,
        width: 350,
    },
    tableContainer: {
        overflow: 'auto',
        flex: 1
    },
    button: {
        margin: '10px auto',
    },
    loader: {
        margin: 50,
        alignSelf: 'center'
    },
    noDataContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    noDataLabel: {
        color: '#555',
        fontSize: 16,
        textAlign: 'center',
        margin: '0 20px',
        fontWeight: 'light'
    },
    headerContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        display: 'flex'
    },
    hoverOption: {
        height: 40,
        width: 40,
        margin: 5
    }
};

export default withStyles(styles, { name: 'GroupOrganizer' })(GroupOrganizer);