import React from 'react';

import MeetingForm from './components/MeetingForm';
import MeetingListView from './components/MeetingListView';

import { get, create, remove, update } from './components/apiProvider';

const MEETINGS_API = '/meetings';
const oneHour = 3600000;

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

		this.intervalId = setInterval(this.timeUpdate, oneHour);
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
			} else {
				return meeting;
			}
		});

		this.setState({
			meetings: updatedMeetings,
		});

		update(MEETINGS_API, id, { isDone: true });
	};
	timeUpdate = () => {
		const { meetings } = this.state;

		const updatedMeetings = meetings.map(meeting => {
			if (meeting.hoursToMeeting > 0) {
				meeting.hoursToMeeting -= 1;
			}

			return meeting;
		});

		this.setState({ meetings: updatedMeetings });
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
			<frameElement className='container__app'>
				<MeetingForm onSubmit={this.createMeeting} />
				<MeetingListView meetings={meetings} isDone={this.meetingDone} onDelete={this.deleteMeeting} />
			</frameElement>
		);
	}
}
export default Meetings;
