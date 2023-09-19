import React, { Fragment } from 'react';

import MeetingForm from './MeetingForm';
import MeetingListView from './MeetingListView';

import { get, create, remove, update } from '../providers/apiProvider';

const MEETINGS_API = '/meetings';

class Meetings extends React.Component {
	state = {
		meetings: [],
	};
	componentDidMount() {
		get(MEETINGS_API).then(meetings => {
			this.setState({
				meetings: meetings,
			});
		});
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	createMeeting = dataOfMeet => {
		create(MEETINGS_API, dataOfMeet).then(() => {
			this.updateAPI();
		});
	};
	deleteMeeting = id => {
		remove(MEETINGS_API, id).then(() => {
			this.updateAPI();
		});
	};
	meetingDone = id => {
		const updatedMeetings = this.state.meetings.map(meeting => {
			if (meeting.id === id) {
				return {
					...meeting,
					isDone: true,
				};
			}
		});

		this.setState({
			meetings: updatedMeetings,
		});

		update(MEETINGS_API, id, { isDone: true });
	};
	
	updateAPI() {
		get(MEETINGS_API).then(updatedMeetings => {
			this.setState({
				meetings: updatedMeetings,
			});
		});
	}

	render() {
		const { meetings } = this.state;

		return (
			<div className='container__app'>
				<MeetingForm onSubmit={this.createMeeting} />
				<MeetingListView meetings={meetings} isDone={this.meetingDone} onDelete={this.deleteMeeting} />
			</div>
		);
	}
}
export default Meetings;
