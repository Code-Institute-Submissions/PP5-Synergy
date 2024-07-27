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
| As a ""user"" I can ""create an account"" so that ""i can use the application"". | Y | ![Sign Up](documentation/signup.png) |
| As a ""User"" I can ""login"" so that ""I can view my profile"". | Y | ![Login](documentation/login.png) |
| As a ""User"" I can ""Add my friends"" so that ""we can organize events to play"". | Y | ![Add Friend](documentation/friend.png) |


| Frequent Visitor Goals    | Requirement met | Image |
| ------------------------- | --------------- | ----- |
| As a ""User"" I can ""invite friends to group"" so that ""we can play together"". | Y | ![Group List](documentation/group.png) |
| As a ""User"" I can ""create a game session"" so that ""available players can play"". | Y | ![Session](documentation/session.png) |
| As a ""User"" I can ""accept session invitation"" so that ""i can join the session"". | Y | ![Session Invite](documentation/session_invite.png) |
| As a ""User"" I can ""view my previous session"" so that ""i can compare my progress"". | Y | ![Profile](documentation/profile.png) |
| As a ""User"" I can ""View group leaderboards"" so that ""i can improve my rank"". | Y | ![Group Leader Boards](documentation/leaderboard.png) |
| As a ""Session Admin"" I can ""appoint game admin"" so that ""they can enter team results"". | Y | ![Session Admin](documentation/session_admin.png) |
| As a ""Session Admin"" I can ""generate all game fixtures"" so that ""we know which games to play"". | Y | ![Game Match Ups](documentation/game.png) |
| As a ""Game Admin"" I can ""Enter game score results"" so that ""we know who won"". | Y | ![Game Score](documentation/game_score.png) |
| As a ""Session Admin"" I can ""assign teams manually"" so that ""the match can start"". | Y | new game select field displays all available teams |
| As a ""Session Admin"" I can ""invite more players from group"" so that ""we can play more match ups"". | Y | ![Session Send Invite](documentation/send_invite.png) |
| As a ""Group User"" I can ""join open sessions"" so that ""I can play"". | Y | ![Join Session](documentation/join_session.png) |
| As a ""User"" I can ""Change my user details"" so that ""i reflect most recent changes"". | Y | ![Edit Profile](documentation/update_profile.png) |
| As a ""Group Host"" I can ""Change group name and details"" so that ""it reflects the current changes"". | Y | ![Group Host](documentation/group_update.png) |
| As a ""User participating in a session"" I can ""see all groups"" so that ""i can join future session"". | Y | ![Group](documentation/join_session.png) |
| As a ""Session Admin"" I can ""update session details"" so that ""player know of date changes"". | Y | ![Session Update](documentation/session_update.png) |


---


## Bugs

### Known bugs

Due to the user navbar including a session detail and group detail button the code app would display error when viewing different pages which did not contain the relevant model objects. All page view included a session object with the context name of 'object_detail' to match and a method called get_group_id on the session and group model to fix the error

Due to the removal of singles badminton the game creation button on the session detail page would be removed. Upon investigating and testing the application the condition for the button display was calculated based on the session status integer multiplied by 4, which once a session was in session would require 8 players in session to display button. This was fixed by adding the correct variable 'game_type' to multiplied by 4.

### Solved bugs

There were plenty of bugs during the development process since this project was a learning platform for me and allowed me to improve my skills and knowledge significantly.

One of the bugs was due to a zero division as the win percentage to be calculated would cause an error for new users when viewing their profile page which did not contain any statistics

Due to changes to fontawesome mid way the project the application stopped displaying the icons or the fontawesome icon resizing which was used. Viewing the application with chrome dev tools it identified the broken link and i changed the fontawesome icons to bootstrap 5 native icons.

Bug after group creation would not allow host user view as code would check for participating members in group which are part of a session and since new group do not have session objects would not allow host to view group. Fixed by adding additional check to see if user is group host.

---

## Validation:
### HTML Validation:

- [Full HTML Validation Report](documentation/validation/html_validation.pdf)

- No errors or warnings were found when passing through the official [W3C](https://validator.w3.org/) validator. This checking was done manually by copying the view page source code (Ctrl+U) and pasting it into the validator.

### CSS Validation:

- All application CSS using Primereact and Primeflex library, no other external CSS used

### JS Validation:

- All application JavaScript using Bootstrap 5 library, no other Javascript code used

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

- [Compatibility Report](documentation/responsive_report.pdf)

---

# Responsiveness

The responsiveness was checked manually by using devtools (Chrome) throughout the whole development. It was also checked with [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb/related?hl=en) Chrome extension.

Primeflex library used to handle responsive mobile first approach.

- [Responsive Report](documentation/responsive_report.pdf)
---