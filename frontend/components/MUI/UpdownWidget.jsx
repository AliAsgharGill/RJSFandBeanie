import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

export const UpdownWidget = (props) => {
  const [value, setValue] = useState(props.value || 0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  const decrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <TextField
      label={props.schema.title}
      value={value}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      margin="normal"
      type="number"
      Input={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={increment} aria-label="increase value">
              <ArrowUpward />
            </IconButton>
            <IconButton onClick={decrement} aria-label="decrease value">
              <ArrowDownward />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

UpdownWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
