export const validator = (formData, formFields) => {

	const errors = {};

	formFields.forEach(field => {
		const value = formData[field.name];

		if (field.required && value.trim() === '') {
			errors[field.name] = `Field ${field.label} is required`;
		}

		if (field.pattern && !new RegExp(field.pattern).test(value)) {
			errors[field.name] = `Field  ${field.label} contains invalid characters or doesn't match with email pattern`;
		}
	});

	return errors;
};

export default validator;
