import {withStyles} from "@material-ui/core/styles/index";
import Checkbox from "@material-ui/core/Checkbox/index";

const checkBoxStyles = theme => ({
    root: {
        '&$checked': {
            color: '#2980B9',
        },
    },
    checked: {},
});

export default withStyles(checkBoxStyles)(Checkbox);