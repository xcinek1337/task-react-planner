import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MeetingForm() {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleChange = date => {
		setSelectedDate(date);
	};

	return (
		<form style={{ display: 'flex', flexDirection: 'column' }}>
			<label>
				Imię:
				<input type='text' name='name' />
			</label>
			<label>
				Nazwisko:
				<input type='text' name='surname' />
			</label>
			<label>
				Kontakt do klienta:
				<input type='text' name='contact' />
			</label>
			<label>
				Temat Spotkania:
				<input type='text' name='meetingTopic' />
			</label>
			<label>
				Data i godzina spotkania:
				<DatePicker
					selected={selectedDate}
					onChange={handleChange}
					showTimeInput
					dateFormat='dd/MM/yyyy h:mm aa' // Format daty i godziny
					timeFormat='HH:mm'
					timeIntervals={15}
					timeCaption='Godzina'
				/>
			</label>
			<input type='submit' value='Wyślij' />
		</form>
	);
}

export default MeetingForm;
