import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const EmailWidget = (props) => (
    <TextField
        label={props.schema.title}
        type="email"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
    />
);

EmailWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
