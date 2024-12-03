import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import PropTypes from "prop-types";

export const RadioWidget = (props) => (
    <FormControl component="fieldset" fullWidth margin="normal">
        <RadioGroup
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            row={props.schema?.options?.inline} // Handle inline option
        >
            {props.options.enumOptions.map((option, index) => (
                <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                />
            ))}
        </RadioGroup>
    </FormControl>
);

RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
};
