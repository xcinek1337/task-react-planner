# React - Planner
![react-comosition](https://github.com/xcinek1337/task-react-planner/assets/125750465/8c1b52a4-0a91-48b5-bba5-e2e192df4454)

Planner is a simple web application written in react.js to create a list of appointments. The app uses a json server as a "database" to manage the status of meetings. The meeting list is sorted by the fastest meeting to keep it practical, also when a meeting is close, the app has a small reminder in the form of red text 


## Features 

- Add, Update(done meeting) and delete meetings
- Validate form planner 
- Mocking data with JSON Server

## Technologies Used

- React
- JSON Server

## Acknowledgements

This project was developed as part of the mentoring program at [DevMentor.pl](https://devmentor.pl). I would like to thank my mentor for their invaluable guidance and feedback during the development of this project. Their insights helped me improve my code quality and deepen my understanding of React.

## Getting Started

To view the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/xcinek1337/task-react-planner.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-react-planner
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the JSON server:
    ```sh
    json-server --watch ./db/data.json --port 3005
    ```
5. Start the development server:
    ```sh
    npm run start
    ```

The project should now be running on `http://localhost:8080`.
