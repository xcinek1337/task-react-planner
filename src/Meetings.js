import React from 'react';

import MeetingForm from './components/MeetingForm';
import MeetingListView from './components/MeetingListView';

class Meetings extends React.Component {
	state = {};

	render() {
		return (
			<div>
				<MeetingForm />
				<MeetingListView />
			</div>
		);
	}
}
export default Meetings;
