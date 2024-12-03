import { useState, useEffect } from 'react';
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";
import './App.css';
import { Button } from '@mui/material';
import { TextFieldWidget } from '../components/MUI/TextFieldWidget';
import { SelectWidget } from '../components/MUI/SelectWidget';
import { PasswordWidget } from '../components/MUI/PasswordWidget';
import { TextareaWidget } from '../components/MUI/Textarea Widget';
import { UpdownWidget } from '../components/MUI/UpdownWidget';

const baseURL = "http://localhost:8000";

function App() {
  const [rjsfSchema, setRjsfSchema] = useState(null);
  const [uiSchema, setUiSchema] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userId = "674ed3213d4cedfa7fe0d047";
    try {
      const response = await axios.get(`${baseURL}/api/users/${userId}`);
      const { form_fields, uiSchema } = response.data || {};
      console.log("User data:", response.data);
      if (!form_fields || typeof form_fields !== "object") {
        throw new Error("form_fields is missing or invalid in the response");
      }
      const rjsfSchema = convertToRjsfSchema(form_fields);
      setRjsfSchema(rjsfSchema);
      setUiSchema(uiSchema || {});
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const convertToRjsfSchema = (formFields) => {
    const properties = {};
    const requiredFields = [];

    Object.keys(formFields).forEach((field) => {
      const fieldType = formFields[field];
      let type;

      switch (fieldType) {
        case "str":
          type = "string";
          break;
        case "int":
          type = "integer";
          break;
        case "Optional":
          type = "string";
          break;
        default:
          console.warn(`Unknown field type: ${fieldType}`);
          type = "string";
      }

      properties[field] = { type, title: toTitleCase(field.replace("_", " ")) };
      if (fieldType !== "Optional") {
        requiredFields.push(field);
      }
    });

    return {
      title: "User Form",
      type: "object",
      properties,
      required: requiredFields,
    };
  };

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));

  const handleSubmit = async ({ formData }) => {
    try {
      const userId = "674ed3213d4cedfa7fe0d047";
      const response = await axios.post(`${baseURL}/api/user-submissions`, {
        userId,
        submission: formData,
      });
      console.log("Submission stored successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  if (!rjsfSchema || !uiSchema) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Form
        schema={rjsfSchema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={handleSubmit}
        showErrorList={false}
        widgets={{
          TextWidget: TextFieldWidget,
          SelectWidget: SelectWidget,
          PasswordWidget: PasswordWidget,
          TextareaWidget: TextareaWidget,
          UpdownWidget: UpdownWidget,
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
