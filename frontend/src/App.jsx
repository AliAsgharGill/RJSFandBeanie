import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import { Button } from "@mui/material";

// Define the schema (JSON schema)
const schema = {
  title: "User Form",
  type: "object",
  properties: {
    name: { type: "string", title: "Name" },
    age: { type: "integer", title: "Age" },
  },
  required: ["name", "age"],
};

// Define the UI schema for Material UI (for styling)
const uiSchema = {
  name: {
    "ui:widget": "text", // text input field
    "ui:placeholder": "Enter your name",
  },
  age: {
    "ui:widget": "updown", // number input field
    "ui:placeholder": "Enter your age",
  },
  submit: {
    "ui:widget": "submit",
    "ui:options": {
      label: "Submit",
      backgroundColor: "#4a90e2",
      color: "white",
    },
  },
};

function App() {
  const handleSubmit = async ({ formData }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/users", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>User Form</h1>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={handleSubmit}
        showErrorList={false}
        widgets={{
          SubmitButton: () => (
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          ),
        }}
      />
    </div>
  );
}

export default App;
