import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const PasswordWidget = (props) => (
    <TextField
        label={props.schema.title}
        type="password"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
    />
);

PasswordWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
