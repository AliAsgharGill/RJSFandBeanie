import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const NumberWidget = (props) => (
    <TextField
        label={props.schema.title}
        type="number"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
    />
);

NumberWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
