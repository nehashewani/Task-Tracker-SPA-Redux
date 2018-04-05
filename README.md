# Newtasktracker

Design Choices:

Database tables:

1. Users - name, email
2. Taskdetails - title, description, completion status, time, user_id

Design choices - Functionality:

1. New users can be registered to the app
2. The app an be logged in with user name or email.
3. Once logged in, user can create task and assign the task to itself or to other users.
4. User can view all the tasks assigned to him/her.
5. Editing and deletion of task is also possible.
6. creating/editing a task has hours and minutes(15 min interval) input boxes. which accepts the use input as hours and minutes, converts them into mintues and stores it to the database.
7. when showing the task details, the time is extracted from database and again segregated to hours and minutes to show it to the user for user convinience.
8. User can logout from the app.
9. App is only be accessible via HTTPS
