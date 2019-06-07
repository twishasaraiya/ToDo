# ToDo

Create a user-wise TODO list, where a user can login, add/modify/mark as complete a task and log out

#### Features
- [x]	Register with username and password
- [x] Login with username and password
- [x]	Add / modify/ mark as complete a task
- [x]	Log Out
- [x]	Proper session maintenance
- [x] Uses AJAX requests
- [x]	Persistent data storage using mysql
- [x] User can delete a task

#### Future Work
- [ ] Log data correctly using [debug](#)
- [ ] Use [gzip](#) compression
- [ ] deploy model to production

#### Setup

1. Download or clone the git repository
2. `cd [folder-name]`
3. Install the dependencies
`npm install`
4. Setup the database using the files in models folder.
5. Once the table are setup, you need to change the mysql connection settings in `controller/dbConnection.js`
6. Start the app using the command
`npm start`
7. Once the server is running visit `http://localhost:3001`
8. As new user signup by providing Username and Password
9. Once signed up you can add/edit/complete/delete task and then Logout
10. Next time you can login again and view your tasks

#### Built with

- HTML/CSS/javascript
- jquery
- Expressjs
- Mysql
