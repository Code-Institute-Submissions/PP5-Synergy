# Testing

## Manual Testing

Testing was done throughout site development, for each feature before it was merged into the master file.

Usability was tested with the below user acceptance testing, sent to new users to ensure testing from different users, on different devices and browsers to ensure issues were caught and where possible fixed during development.


|     | User Actions           | Expected Results | Y/N | Comments    |
|-------------|------------------------|------------------|------|-------------|
| Log In      |                        |                  |      |             |
| 1           | Click on Login button | Redirection to Login page | Y |          |
| 2           | Click on the SignUp link in the form | Redirection to SignUp page | Y |          |
| 3           | Enter valid email or username | Field will only accept email address format | Y |          |
| 4           | Enter valid password | Field will only accept secure passwords | Y |          |
| 5           | Click on the Login button | Takes user to profile page with pop-up confirming successful sign in. User navigation displayed | Y |          |
| 6           | Click "Logout" button | Redirects user to home page with pop-up confirming successful sign out| Y |          |
| Sign Up     |                        |                  |      |             |
| 1           | Click on the Sign Up button | Redirects to Sign up page | Y |          |
| 2           | Click on the Login link in the form | Redirection to Login page | Y |          |
| 3           | Enter valid email | Field will only accept email address format | Y |          |
| 4           | Enter valid username | Field will only accept non existing usernames | Y |          |
| 5           | Enter valid password | Field will only accept secure passwords | Y |          |
| 6           | Enter valid password confirmation | Field will only accept the same password from the previous field | Y |          |
| 7           | Click on the Submit button | creates user and takes user to profile page with pop-up confirming successful sign in | Y |          |
| 8           | Click "Logout" button | Redirects user to home page with pop-up confirming successful sign out| Y |          |

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