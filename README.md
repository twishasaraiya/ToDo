# ToDo

Create a user-wise TODO list, where a user will be able to login, add/modify/mark as complete a task and log out. Final output expected is a git repository with access given to <insert-email-id> where the files are kept. E.g. Google Keep

#### Features
- [x]	Register with username and password
- [x] Login with username and password
- [x]	Add / modify/ mark as complete a task
- [x]	Log Out

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
