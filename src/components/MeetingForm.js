import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

class MeetingForm extends React.Component {
	initialState = {
		formData: {
			firstName: '',
			lastName: '',
			email: '',
			date: '',
			topic: '',
			time: '',
			id: '',
			hoursToMeeting: '',
		},
		selectedDate: null,
		errors: {},
	};

	state = { ...this.initialState };

	formFields = [
		{
			label: 'Name:',
			type: 'text',
			name: 'firstName',
			pattern: null,
			required: true,
		},
		{
			label: 'Surname:',
			type: 'text',
			name: 'lastName',
			pattern: null,
			required: true,
		},
		{
			label: 'Mail (contact):',
			type: 'text',
			name: 'email',
			pattern: '^[\\w\\-.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$',
			required: true,
		},
		{
			label: 'Meeting topic:',
			type: 'text',
			name: 'topic',
			pattern: null,
			required: true,
		},
		{
			label: 'Date',
			type: 'date',
			name: 'date',
			pattern: null,
			required: true,
		},
	];

	resetForm = () => {
		this.setState({ ...this.initialState });
	};

	submitForm = e => {
		e.preventDefault();

		const timeToMeet = this.timeToMeet();
		const formDataWithTimeToMeet = {
			...this.state.formData,
			hoursToMeeting: timeToMeet,
		};

		this.resetForm();

		const errors = this.validateForm();
		if (Object.keys(errors).length === 0) {
			this.props.onSubmit(formDataWithTimeToMeet);
			this.resetForm();
		} else {
			this.setState({ errors });
		}
	};

	handleTextChange = e => {
		const { name, value } = e.target;
		this.setState(prevState => ({
			formData: {
				...prevState.formData,
				[name]: value,
			},
		}));
	};
	handleDateChange = date => {
		const formattedDate = format(date, 'yyyy-MM-dd');
		const formattedTime = format(date, 'HH:mm');

		this.setState({
			selectedDate: date,
			formData: {
				...this.state.formData,
				date: formattedDate,
				time: formattedTime,
			},
		});
	};

	timeToMeet = () => {
		const { selectedDate } = this.state;

		const currentDate = new Date();
		if (selectedDate) {
			const timeDifference = this.state.selectedDate - currentDate;
			const hoursDifference = timeDifference / (1000 * 60 * 60);

			return hoursDifference.toFixed();
		}
	};
	validateForm = () => {
		const { formData } = this.state;
		const errors = {};

		this.formFields.forEach(field => {
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

	render() {
		const { errors } = this.state;

		return (
			<section className='section__form'>
				<form className='meet__form' onSubmit={this.submitForm}>
					<h1 className='meet__h1'>planner</h1>

					{this.formFields.map(field => (
						<div key={field.name}>
							<label className='meet__label'>
								{field.label}
								{field.type === 'date' ? (
									<DatePicker
										className='meet__input'
										selected={this.state.selectedDate}
										onChange={this.handleDateChange}
										dateFormat='yyyy-d-M [HH:mm]'
										showTimeInput
										timeFormat='HH:mm'
										timeIntervals={15}
										timeCaption='Godzina'
									/>
								) : (
									<input
										className='meet__input'
										type={field.type}
										name={field.name}
										value={this.state.formData[field.name]}
										onChange={this.handleTextChange}
									/>
								)}
							</label>
							{/* krotka ocena warunkowa vvv ciekawy zapis, na poczatku mylil mnie z ifem w ktorym dwa warunki musza byc spelnione, a to dziala w ten sposob ze jesli pierwwszy element(po lewej stronie) jest true to wykonuje kod po operatorze "&&" */}
							{errors[field.name] && <span className='error-message'>{errors[field.name]}</span>}
							{/* {errors[field.name] ? <span className='error-message'>{errors[field.name]}</span> : null} */}
						</div>
					))}
					<input className='meet__btn-form' type='submit' value='Set meeting' />
				</form>
			</section>
		);
	}
}

export default MeetingForm;
