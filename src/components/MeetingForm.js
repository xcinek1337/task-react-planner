import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

class MeetingForm extends React.Component {
	state = {
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
	};
	submitForm = e => {
		e.preventDefault();

		const timeToMeet = this.timeToMeet();
		const formDataWithTimeToMeet = {
			...this.state.formData,
			hoursToMeeting: timeToMeet,
		};

		this.props.onSubmit(formDataWithTimeToMeet);

		this.setState({
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
		});
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

	render() {
		return (
			<section className='section__form'>
				<form className='meet__form' onSubmit={this.submitForm}>
					<h1 className='meet__h1'>planner</h1>
					<label className='meet__label'>
						Name:
						<input
							className='meet__input'
							type='text'
							name='firstName'
							value={this.state.formData.firstName}
							onChange={this.handleTextChange}
						/>
					</label>
					<label className='meet__label'>
						Surname:
						<input
							className='meet__input'
							value={this.state.formData.lastName}
							type='text'
							name='lastName'
							onChange={this.handleTextChange}
						/>
					</label>
					<label className='meet__label'>
						mail (contact):
						<input
							className='meet__input'
							value={this.state.formData.email}
							type='text'
							name='email'
							onChange={this.handleTextChange}
						/>
					</label>
					<label className='meet__label'>
						meeting topic:
						<input
							className='meet__input'
							value={this.state.formData.topic}
							type='text'
							name='topic'
							onChange={this.handleTextChange}
						/>
					</label>
					<label className='meet__label'>
						Date:
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
					</label>
					<input className='meet__btn-form' type='submit' value='Set meeting' />
				</form>
			</section>
		);
	}
}

export default MeetingForm;
