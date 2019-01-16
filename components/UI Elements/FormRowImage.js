import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormRowImage extends Component {

    state = { image: '', showUndo: false };

    componentWillReceiveProps(props) {
        this.verifyImage(props)
    }

    componentDidMount() {
        this.verifyImage(this.props)
    }

    verifyImage(props) {
        if (props.file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(props.file);
        } else {
            this.setState({ image: props.imageUrl })
        }
    }

    render() {
        const { placeholder, onChange, onUndo } = this.props;
        const { image, showUndo } = this.state;
        return (
            <div className="file-field input-field">
                <div style={styles.imageRow}>

                    {image &&
                    <div className="img-container waves-effect waves-block waves-light"
                         onClick={onUndo}
                         onMouseEnter={() => this.setState({ showUndo: true })}
                         onMouseLeave={() => this.setState({ showUndo: false })}
                    >
                        <img className={'form-row-img'} src={image} width={200} style={{ filter: `brightness(${showUndo ? 50 : 100}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
                        {showUndo && <i style={{ fontSize: 30, color: 'white', position: 'absolute' }} className={'fa fa-undo'}/>}
                    </div>}

                    <div className="btn cyan darken-1">
                        <span>Arquivo</span>
                        <input type="file" accept="image/*" onChange={onChange}/>
                    </div>
                    <div className="file-path-wrapper" style={{flex: 1}}>
                        <input className="file-path validate" type="text"
                               placeholder={placeholder}/>
                    </div>
                </div>
            </div>
        )
    }
}

FormRowImage.propTypes = {
    placeholder: PropTypes.string,
    file: PropTypes.object,
    imageUrl: PropTypes.string,
    onChange: PropTypes.func,
    onUndo: PropTypes.func
};

const styles = {
    imageRow: { display: 'flex', flexDirection: 'row', alignItems: 'center' }
};