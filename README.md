### What?

A small library that helps deal with forms in React.

### Why?

- Manage form data
- Submit form data
- Enforce validations
- Provide visual feedback
- React hook form provides a simple, scalable and performant way to manage even the most complex of forms.

### Project setup

**Using vite:**

**npm create vite@latest react-hook-form-checklist**

- For framework, select React
- For variant, choose TypeScript

**cd react-hook-form-checklist**

**npm install**

**npm run dev**

**Using Create React App:**

npx create-react-app rhf-demo —template typescript

cd rhf-demo

npm start

## Managing Form state

Every form has a few moving parts that keep changing from the time a user loads the form to the time they submit it.

- current value of every field in the form
- whether a field has been interacted with
- whether a field’s value has changed
- whether the form is invalid
- whether a field contains errors

### 1. Form state

```jsx
{
	values: {...}
	visited: {...}
	errors: {...}
	isValid: boolean
}
```

### 2. Form Submission

### 3. Form Validation

React Hook Form supports various HTML validation rules.

- required
- minLength & maxLength
- min & max
- pattern

### Enhancing React Hook Form

- Default values
- Object and array values
- Dynamic fields
- Numeric and date values
- Watch, get and set field values
- Touched and dirty states
- Handle submission error
- Form submission state
- Reset Form
- Async validation
- Validation modes
- Manually trigger validations

### Form Submission State

- isSubmitting
- isSubmitted
- isSubmitSuccessful
- submitCount
