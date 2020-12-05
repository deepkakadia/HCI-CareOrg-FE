import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const StyledButton2 = withStyles({
    root: {
        background: 'blue',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135,0.4)',
        margin: 10,
        fontSize: 15
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);
export default StyledButton2