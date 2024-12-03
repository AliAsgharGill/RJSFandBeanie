import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const TextFieldWidget = (props) => (
    <TextField
        label={props.schema.title}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
    />
);

TextFieldWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
