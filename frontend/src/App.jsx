import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";
import axios from "axios";

function App() {
  const handleSubmit = async ({ formData }) => {
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post("http://localhost:8000/api/users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>User Form</h1>
      <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
