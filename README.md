# Mini Registration Platform

Created using MERN 

## Structure and Decisions

The project follows the wireframe of the brief. 

* When a user is not logged in, they can view the existing events and sign up. 
* When a user is logged in, they are able to view events, join them, edit their name, and create new accounts. They can not however, access the admin page, and are redirected from the login page. 
* When the admin user is logged in (`admin@gmail.com`), they can view existing accounts and create new events. If they attempt to go to the login or landing pages, they are redirected. 

The application is also built on the assumptions that:

* Emails should be a unique identifying attribute of users — hence, they can be used as keys, and creating an account using an email that is already being used, should not be allowed. 
* The primary key of an event is the composite of the name and the date. This assumes that events with the same name can be repeated on different days, or that there can be multiple differently named events happening on the same day. 

#### Access Control

To handle authentication and authorisation, routing and `localStorage` was used in the frontend, with JSON Web Tokens in the backend to protect both pages and API calls. For API calls requiring a user to be logged in, the axios services passed the user's token, created upon login, to the backend through the `Authorization` header. Using `localStorage` allows for the user to stay logged in before the token expires; even with page refreshes. 

API calls requiring authentication called the `authentication` middleware before proceeding, which checked that the token passed was a valid token. API calls requiring admin authorisation followed the pipeline of `authentication` and then `authorisation`, which checks that a token is attached to a user, and if so, that this user is admin. 

I ensured that there would be no passwords being passed from the database to the frontend. Each time an account is returned, the password field is left out. Initially, I did this by mapping each user object to a new object (password and ...rest), where ...rest would then be passed. Then I changed it so that this was handled in the Account model itself. 

#### Improvements

While there are many (!!!!) improvements to be made in every aspect, the most pressing is the following.

To prevent cases where the token variable is used before being correctly updated, the window should be able to watch changes in `localStorage`; whether in the same tab or in another. 