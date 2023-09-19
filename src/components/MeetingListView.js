import React from 'react';

class MeetingListView extends React.Component {
	handleDelete = meetingId => {
		const shouldDelete = window.confirm('Are you sure you want to delete this meeting?');

		if (shouldDelete) {
			this.props.onDelete(meetingId);
		}
	};

	render() {
		const { meetings } = this.props;

		const sortedMeetings = [...meetings];

		sortedMeetings.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			return dateA - dateB;
		});

		const meetingsList = sortedMeetings.map(meeting => {
			if (!meeting.isDone) {
				return (
					<li key={meeting.id} className='meet__li-elem'>
						{meeting.hoursToMeeting < 24 && meeting.hoursToMeeting >= 0 ? (
							<h3 className='meet__alert'>Meeting in less than {meeting.hoursToMeeting} hours!</h3>
						) : null}
						<div className='meet__about-div'>
							<span className='meet__about'>TOPIC</span>
							<span className='meet__about'>Name</span>
							<span className='meet__about'>Email</span>
							<span className='meet__about'>Date</span>
						</div>
						<div className='meet__info-div'>
							<span>{meeting.topic}</span>
							<span>
								{meeting.firstName} {meeting.lastName}
							</span>
							<span>{meeting.email}</span>
							<span>{meeting.date}</span>
							<span>{meeting.time}</span>
						</div>
						<button className='meet__btn-done meet__btn-li' onClick={() => this.props.isDone(meeting.id)}>
							done
						</button>
						<button className='meet__btn-delete meet__btn-li' onClick={() => this.handleDelete(meeting.id)}>
							delete
						</button>
					</li>
				);
			} else {
				return null;
			}
		});

		return (
			<section className='section__me'>
				<ul>{meetingsList}</ul>
			</section>
		);
	}
}

export default MeetingListView;
