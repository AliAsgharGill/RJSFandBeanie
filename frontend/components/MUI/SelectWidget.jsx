import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import PropTypes from "prop-types";

export const SelectWidget = (props) => (
    <FormControl fullWidth margin="normal">
        <InputLabel>{props.schema.title}</InputLabel>
        <Select
            value={props.value || ""}
            onChange={(e) => props.onChange(e.target.value)}
            label={props.schema.title}
        >
            {props.options.enumOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
};
