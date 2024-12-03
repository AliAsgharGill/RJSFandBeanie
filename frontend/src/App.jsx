import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import { Button } from "@mui/material";
import schema from "./schema.json";

// Define the UI schema for Material UI (for styling)
const uiSchema = {
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
    "ui:autocomplete": "family-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/)."
  },
  "lastName": {
    "ui:autocomplete": "given-name",
    "ui:enableMarkdownInDescription": true,
    "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> "
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earth year)"
  },
  "bio": {
    "ui:widget": "textarea"
  },
  "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}

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
      {/* <h1>User Form</h1> */}
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
