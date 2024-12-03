import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import PropTypes from "prop-types";

export const CheckboxWidget = (props) => (
    <FormControl component="fieldset" fullWidth margin="normal">
        <FormControlLabel
            control={
                <Checkbox
                    checked={props.value}
                    onChange={(e) => props.onChange(e.target.checked)}
                />
            }
            label={props.schema.title}
        />
    </FormControl>
);

CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};
