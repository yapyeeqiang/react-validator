# React Validator

### Steps to integrate Validator

1. Define form schema

```js
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
```

2. Initialize the useValidation hook

```js
import { useValidation } from "./hooks/validation";

const { fields, errors, useField, validateForm } = useValidation(schema);
```

Definitions:

- `fields` - Form inputs value object
- `errors` - Errors detected when submitting the form
- `useField` - Method that defines a form field
- `validateForm` - Method that checks if validation passed

3. Define form fields

```js
// Format: <KEY>field, set<KEY>Field = useField("<KEY>")
const { emailField, setEmailField } = useField("email");
```

4. Define custom form submit action

```js
const submitForm = () => {
  const isFormValid = validateForm();

  if (isFormValid) {
    // Do something (API call, etc.)
  }
};
```

5. Use custom FormField component

For example, let's define a email field:

```jsx
<FormField
  value={emailField}
  setValue={setEmailField}
  error={errors.email}
  labelText="Email"
  fieldType="email"
  inputType="email"
/>
```
