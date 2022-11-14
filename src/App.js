import Form from "./components/form/Form";
import FormField from "./components/form/FormField";
import * as Yup from "yup";
import { useValidation } from "./hooks/validation";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "At least one lowercase character")
    .matches(/[A-Z]/, "At least one uppercase character")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "At least 1 number or special character (@,!,#, etc)."
    ),
});

function App() {
  const { useField, validateForm, errors, fields } = useValidation(schema);

  const { emailField, setEmailField } = useField("email");
  const { passwordField, setPasswordField } = useField("password");

  const submitForm = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      console.log(fields);
    }
  };

  return (
    <div className="p-5">
      <Form>
        <FormField
          value={emailField}
          setValue={setEmailField}
          error={errors.email}
          labelText="Email"
          fieldType="email"
          inputType="email"
        />

        <FormField
          value={passwordField}
          setValue={setPasswordField}
          error={errors.password}
          labelText="Password"
          fieldType="password"
          inputType="password"
        />

        <button
          onClick={submitForm}
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}

export default App;
