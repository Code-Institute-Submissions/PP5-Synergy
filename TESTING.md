# Testing

## Manual Testing

Testing was done throughout site development, for each feature before it was merged into the master file.

Usability was tested with the below user acceptance testing, sent to new users to ensure testing from different users, on different devices and browsers to ensure issues were caught and where possible fixed during development.


|     | User Actions           | Expected Results | Y/N | Comments    |
|-------------|------------------------|------------------|------|-------------|
| Home      |                        |                  |      |             |
| 1           | Click on Get started button | Redirection to signup page | Y |          |
| 2           | Click on the get started button in hero section | Redirection to SignUp page | Y |          |
| Home Nav      |                        |                  |      |             |
| 1           | Click on Get started button | Redirection to signup page | Y |          |
| 2           | Click on Logo | Redirection to home page | Y |          |
| Footer      |                        |                  |      |             |
| 1           | Click on linkedin icon | opens new tab with authors linkedin profile | Y |          |
| 2           | Click on facebook icon | opens new tab with facebook  | Y |          |
| 2           | Click on github icon | opens new tab with authors github page | Y |          |
| Log In      |                        |                  |      |             |
| 1           | Click on Login button | Redirection to Login page | Y |          |
| 2           | Click on the SignUp link in the form | Redirection to SignUp page | Y |          |
| 3           | Enter valid username | message indicating username and password do not match | Y |          |
| 4           | Enter valid password | message indicating username and password do not match | Y |          |
| 5           | Click on the Login button | Takes user to dashbord page | Y |          |
| Sign Up     |                        |                  |      |             |
| 1           | Click on the Sign Up button | Redirects to Sign up page | Y |          |
| 2           | Click on the Login link in the form | Redirection to Login page | Y |          |
| 4           | Enter valid username | Field will only accept non existing usernames | Y |          |
| 5           | Enter valid password | Field will only accept secure passwords | Y |          |
| 6           | Enter valid password confirmation | Field will only accept the same password from the previous field | Y |          |
| 7           | Click on the Submit button | creates user and takes user to signin page | Y |          |
| Dashboard menu      |                        |                  |      |             |
| 1           | Click on dashboard link | Redirection to dashboard page | Y |          |
| 2           | Click on tasks link | Redirection to tasks page | Y |          |
| 3           | Click on workstream link | Redirection to workstream page | Y |          |
| 4           | Click on notification link | Redirection to notification page | Y |          |
| 5           | Click on logout link | The user is logged out and redirected to signin page | Y |          |
| Dashboard Page      |                        |                  |      |             |
| 1           | Click on edit profile link | dialog box to edit profile displayed | Y |          |
| 2           | Click on view worksteam link | Redirection to active workstream page | Y |          |
| 3           | Click on view task link | Redirection to tasks page | Y |          |
| Edit Profile Dialog      |                        |                  |      |             |
| 1           | Enter first name | displays updated text variable | Y |          |
| 2           | Enter last name | displays updated text variable | Y |          |
| 3           | select avatar image | Select image from file  | Y | message displayed when selecting large files |
| 4           | submit button clicked | Updates user profile | Y | User profile in dashboard menu will reflect avatar image changes|
| 5           | click cancel button | closes the dialog box | Y |          |
| Tasks Page      |                        |                  |      |             |
| 1           | Click on Create task button | right Sidebar will display with task form | Y |          |
| 2           | Click 3 vertical dots on task to open task menu | task menu displayed underneath button | Y |          |
| 3           | Click checkbox | task status will updated to checkbox value | Y |completed tasks are displayed below the todo list|
| Tasks edit menu      |                        |                  |      |             |
| 1           | Click edit task link | right Sidebar will display with task form pre populated with current task details | Y |          |
| 2           | Click unassign task link | task owner will be set to null and removed from current users task list | Y |          |
| 3           | Click delete link | task will be deleted and removed from task list | Y |    |
| Tasks Form      |                        |                  |      |             |
| 1           | enter task name | required field to submit form | Y | leaving blank will display error message underneath field |
| 2           | enter task detail | displays updated variable in text area | Y |          |
| 3           | select priority | dropdown to select priority | Y |          |
| 4           | click 'X' on selected priority | priority selected value cleared | Y |          |
| 5           | select category | dropdown to select category | Y |          |
| 6           | click 'X' on selected category | category selected value cleared | Y |          |
| 7           | click on warning message | redirects user to active workstream | Y |displays when no category created in workstream|
| 8           | select project | dropdown to select project | Y |          |
| 9           | click 'X' on selected project | project selected value cleared | Y |          |
| 10           | click on deadline filed | displays calendar dialog to select date | Y |          |
| 11           | select date from calendar | date set and displayed in deadline field | Y |          |
| 12           | click switch button to self assign task | button text and colour changes when selected | Y |          |
| Workstream Page      |                        |                  |      |             |
| 1           | click on active workstream card | redirect user to active workstream page | Y |          |
| 2           | click create workstream | dialog box displayed to craete workstream | Y |          |
| 3           | click join button | redirect user to join page | Y |          |
| 4           | click on workstream in switchable section | changes users active workstream to selected | Y |          |
| Active Workstream Page      |                        |                  |      |             |
| 1           | click on 'X' in fieldset legend | User is removed from workstream and redirected to workstream page | Y | only displayed to workstream participants that are not the owner |
| 2           | click on 3 dots in fieldset legend | displays workstream menu | Y | only displayed for workstream owner |
| 3           | click '+' button in participants tab | redirect user to invite page | Y |          |
| 4           | click switch button in staff tab | updates user staff privileges | Y |          |
| 5           | click '+' button in category tab | dialog box to create new category displayed | Y |          |
| 6           | click edit button on selected category | dialog box to edit category displayed | Y |          |
| 7           | click '+' button in project tab | dialog box to create new project displayed | Y |          |
| 8           | click edit button on selected project | dialog box to edit project displayed | Y |          |
| 9           | click download button in the task | assigns task to current user | Y |          |
| 10           | unselected workstream redirect | users are redirected to workstream page if no active workstream is set | Y |          |
| Workstream menu      |                        |                  |      |             |
| 1           | Click edit link | dialog box to edit workstream name displayed | Y |          |
| 2           | Click delete link | dialog box to confirm workstream delete displayed | Y | cancel will close the dialog box with no delete, confirm will delete workstream and redirects user to workstream page |
| Notification Page      |                        |                  |      |             |
| 1           | click on invite link | redirect user to invite page | Y |          |
| 2           | click on join link | redirect user to join page | Y |          |
| 3           | click on delete link | overlay to confirm invite delete | Y | cancel will close the dialog box with no delete, confirm will delete and remove the invite |
| 4           | click on accept link in invite | the selected invite will be removed and user added to workstream | Y |          |
| 5           | click on accept link in join | the selected join will be removed and current user added to the workstream displayed | Y |          |
| Invite Page      |                        |                  |      |             |
| 1           | click on user profile card | selected user will receive join request for current users workstream | Y |          |
| Join Page      |                        |                  |      |             |
| 1           | click on workstream card | selected workstream owner will receive a invite request for current user to join | Y |          |

---

## Testing User Story

| First Time Visitor Goals | Requirement met | Image |
| ------------------------- | --------------- | ----- |
|As a ""first time visitor"" I want ""to be able to see an informative page about the application"" so that ""I can understand what it is about"".| Y |  ![Home Info](documentation/home_info.png)  |
|As a ""first time visitor"" I want to ""be able to easily navigate through the application"" so that ""I can find what I am looking for"".| Y |  ![Dashmenu](documentation/dashmenu.png)  |
|As a ""first time visitor"" I want ""to be able to register"" so that ""I can have an account"".| Y |  ![Sign Up](documentation/signup.png)  |
|As a ""first time visitor"" I want ""to be able to login"" so that ""I can access my account"".| Y |  ![Sign In](documentation/signin.png)  |


| Frequent Visitor Goals    | Requirement met | Image |
| ------------------------- | --------------- | ----- |
|As a ""Registered User"" I want ""Create my workstream"" so that ""start managing my tasks"".| Y |  ![Create Workstream](documentation/create_workstream.png)  |
|As a ""Registered User"" I want ""to define my own task categories"" so that ""my task can be effectively managed"".| Y |  ![Category](documentation/category.png)  |
|As a ""Registered User"" I want ""to create tasks"" so that ""i know what to do"".| Y |  ![Create Task](documentation/create_task.png)  |
|As a ""Registered User"" I want ""to set task to completed"" so that ""i know which are done"".| Y |  ![Task Status](documentation/task_status.png)  |
|As a ""Registered User"" I can ""invite other users to my workstream"" so that ""we can complete tasks together"".| Y |  ![Invite](documentation/invite.png)  |
|As a ""Registered User"" I can ""Request to join another's workstream"" so that ""we can complete tasks together"".| Y |  ![Join](documentation/join.png)  |
|As a ""Registered User"" I can ""select the tasks i want to do"" so that ""there will be less for the team to do"".| Y |  ![Accept Task](documentation/assign_task.png)  |
|As a ""Registered User"" I can ""see report of all completed tasks"" so that ""i know how well i am doing"".| Y |  ![Task Report](documentation/task_report.png)  |
|As a ""Registered User"" I can ""view my dashboard"" so that ""i can see all task assigned to me"".| Y |  ![Task Page](documentation/task_page.png)  |
|As a ""Registered User"" I can ""switch between workspaces"" so that ""i can focus on tasks i need to do"".| Y |  ![Change Workstream](documentation/switch.png)  |
|As a ""Registered User"" I can ""create an event/project"" so that ""group a collection of tasks"".| Y |  ![Project](documentation/project.png)  |
|As a ""Registered User"" I can ""update task details"" so that ""it reflects updated criteria"".| Y |  ![Task Update](documentation/task_update.png)  |
|As a ""Workstream Owner"" I can ""give staff permission to participating"" so that ""other users can create category or projects"".| Y |  ![Staff permissions](documentation/staff.png)  |


---


## Bugs

### Known bugs

Due to the user updated to the react router dom the history.push no longer works

There is a bug that the current task do not update once they are edited and require a page refresh to display


### Solved bugs

There were plenty of bugs during the development process since this project was a learning platform for me and allowed me to improve my skills and knowledge significantly.

One of the bugs was due to the deadline taking local date format causing an error for american date format. This was solved using the moments.js date formatter to pass correct value when form was submitted

Due to this being my first application utilizing my own api the endpoint required the trailing slash which was omitted.

There was a bug that new users can access their active workstream page before they created a workstream which only displayed the loading spinner. I solved this by adding a conditional if statement in the active workstream component to return the user to the workstream page.

---

## Validation:
### HTML Validation:

- [HTML Validation Report](documentation/validation/html_validation.png)

- No errors or warnings were found when passing through the official [W3C](https://validator.w3.org/) validator. This checking was done manually by copying the view page source code (Ctrl+U) and pasting it into the validator.

- Since the application's frontend is written in React the page source only displays reacts initial index.html

### CSS Validation:

- All application CSS using Primereact and Primeflex library, no other external CSS used

### JS Validation:

- Since the application's frontend is written in React, I could not use the JSHint validator to validate the application. As you can down below, JSHint just doesn't understand JSX syntax.

![JSHint output](documentation/validation/jshint.png)

- But React itself validates the code on each build, and if there were any errors, the application would not be able to run.
- Since it runs correctly, we can consider all the code to be valid.


### Python Validation:

- [Full Python Validation Report](documentation/validation/python_validation.pdf)

- No errors were found when the code was passed through [CI Python Linter](https://pep8ci.herokuapp.com/#). According to the reports, the code is [Pep 8-compliant](https://legacy.python.org/dev/peps/pep-0008/). This checking was done manually by copying python code and pasting it into the validator.

---
## Lighthouse Report

- [Full Lighthouse Report](documentation/validation/lighthouse_report.pdf)


---

## Compatibility

Testing was conducted on the following browsers;

- Safari;
- Chrome;
- Firefox;

- [Compatibility Report](documentation/validation/compatibility_report.pdf)

---

# Responsiveness

The responsiveness was checked manually by using devtools (Chrome) throughout the whole development. It was also checked with [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb/related?hl=en) Chrome extension.

Primeflex library used to handle responsive mobile first approach.

- [Responsive Report](documentation/validation/responsive_report.pdf)
---