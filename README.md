# MusicSphere: Music Search Engine
23rd Challenge: Final Project - MERN Stack Single-Page Application

## Description
MusicSphere is an music search engine powered by Spotify API. By searching the artists, you will be able to see the albums and favorite it placing to your profile. All searches won't be accepted not unless you are a member.

This application is a MERN Single Page Application, deployed in Heroku with MOngoDB.

## User Story
```md
AS A music lover, 
I WANT to search my favorite albums
SO THAT I can keep a list of music records that I could go back and listen to
```

## Acceptance Criteria
```md
GIVEN a music search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Albums and Login/Signup and an input field to search for the artists and a submit button
WHEN I click on the Search for Album menu option
THEN I am presented with an input field to search for artist's name and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a album’s title, artist, description, image, and a link to that music records on the Spotify App
WHEN I click on the Login/Signup menu option
THEN it will give you between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Albums, an option to see my saved albums, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, the artist's discography will show
WHEN I click on the Save button on a album
THEN that album’s information is saved to my account
WHEN I click on the option to see my saved albums
THEN I am presented with all of the albums I have saved to my account, each featuring the album’s title, artist, description, image, and a link to that album on the Spotify App site and a button to remove an album from my account
WHEN I click on the Remove button on a album
THEN that album is deleted from my saved albums list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Albums and Login/Signup and an input field to search for albums and a submit button  
```

## Technologies Used
- JavaScript
- Material UI
- Express.js
- React
- React Icons
- Node.js
- Apollo Server
- Apollo Client
- Web Vitals
- GraphQL
- JSON Web Tokens
- Heroku
- MongoDB
- Rapid API   
  
## Installation and Usage
- Navigate to this [repository](https://github.com/mcramileux/mcramileux-music-sphere-project)
- Open your terminal on your local machine and clone the repository.
- Create a react portfolio. By this challenge, it was pulled from the Gitlab repository as the codes has been provided.
  ```md
  npx create-react-app
  ```
- To check all package dependencies has been installed, run the following command in the terminal.
  ```md
  npm i 
  ```
- Create an .env file to ensure the root directory of the application.
- Run this command in the server folder to start node.js and other npm related packages to start the server of the application.
  ```md 
  npm start
  ```
- Run this command in the client folder to start development-related tasks.
  ```md 
  npm run develop
  ```

## Screenshot
- Homepage
        ![homepage](https://github.com/mcramileux/mcramileux-music-sphere-project/assets/122607160/6f2bd88f-2e44-448b-a161-78a98f709060)

- Signup
        ![signup](https://github.com/mcramileux/mcramileux-music-sphere-project/assets/122607160/109e727b-583d-46c6-81de-b5b4d6426143)

- Login 
         ![login](https://github.com/mcramileux/mcramileux-music-sphere-project/assets/122607160/23da75d4-8538-45ff-804f-fca3ba38eede)

## Version
- [Github Repository Version 1.0](https://github.com/mcramileux/mcramileux-final-project) as the installed packages keeps on breaking the react app and more errors are coming up so I decided to make a new repository.

## Links
- [Github Repository](https://github.com/mcramileux/mcramileux-music-sphere-project)
- [Heroku Deployment](https://music-sphere-twopointoh-164899043ee9.herokuapp.com/)


## References
- [Unsplash.com](https://unsplash.com/photos/1oKxSKSOowE) for background photo
- [Material UI v.4](https://v4.mui.com/getting-started/installation/) UI Component library 
- [Rapid API](https://rapidapi.com/Glavier/api/spotify23/) Music API
- [Spotify API](https://developer.spotify.com/dashboard/) Music API
- [Error Boundaries](https://legacy.reactjs.org/docs/error-boundaries.html) for old docs that won't update
- [Building a Spotify API Searcher in React](https://www.youtube.com/watch?v=1PWDxgqLmDA)
- [How To Make a Donation Form In Stripe](https://www.youtube.com/watch?v=4hLXnU8SUko)
- [Stripe](https://stripe.com/docs/stripe-js/react) for Donation Payment
- MERN and State Class Activities - used the mini-projects as the starter code
- [How to go back to a previous commit](https://medium.com/swlh/using-git-how-to-go-back-to-a-previous-commit-8579ccc8180f)

## Contributions
Contributions to this project won't be accepted as this is the reflection of the author's work hence the following questions and answers. Furthermore, forking or creating a pull request is acceptable.

## Questions
For more questions or inquiries, please contact the author at [GitHub](https://github.com/mcramileux) or email kristineramilo21@gmail.com.

## Acknowledgements and Credits
- I want to thank my weekly bootcamp tutor, Jacob, for all the help he gave me throughout this journey. I won't be able get this far without his guidance. 
- AskBCS Learning Assistants

## License
This project is under [MIT](https://choosealicense.com/licenses/mit/) license.

## Author
© 2023 mcramileux 