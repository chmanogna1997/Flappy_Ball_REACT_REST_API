# FLAPPY BALL GAME

This is the source code for Flappy ball created using React.js, Express and REST API's. This gmae runs in desktop applications.
![image](https://user-images.githubusercontent.com/91714626/233875400-49df94b9-4eea-4052-94fb-53be08a01ad2.png)

## List of Features:
* User should login to play the game.
* User can play both 1-player and 2-player game.
* User can challenge the available active user and can start 2-player game.
* List of Active/Available users are seen on left side.

## Skills:

* React.js
* React Hooks: useState, useEffect, usecallback, useReducers
* Reducers to manage the states.
* Long polling.
* Express
* Node.js
* Rest Api's
* Cookie-parser, UUID.

## Components:

### LOGIN:

![image](https://user-images.githubusercontent.com/91714626/233876354-71a8d961-d1b3-475a-9639-bb33882233db.png)

cookie gets created with new session id
![image](https://user-images.githubusercontent.com/91714626/233876458-0dbb7b40-03b7-4d54-9dc1-378e443c1589.png)

### Home Page:
![image](https://user-images.githubusercontent.com/91714626/233876602-3de433dc-a5e5-48f5-9f83-1c535a6a44e9.png)

### 1-player game:
Shows the user score and Higest score earned by all users
![image](https://user-images.githubusercontent.com/91714626/233877079-b12df8fd-814b-4621-8b2f-d44565a5b0ea.png)

### 2-player game:
* For this user need to do a handshake(by sending the request) by clicking challenge button. User can only play if his request is accepted.
* Requests will be auto declined if user is already playing the challenge game.

![image](https://user-images.githubusercontent.com/91714626/233877565-94d8bd88-46ba-49a2-9241-2fe21ecc417e.png)

![image](https://user-images.githubusercontent.com/91714626/233877625-dc289c0c-a12b-477d-b1d5-be364f62f9e8.png)

![image](https://user-images.githubusercontent.com/91714626/233877691-2913e7b4-0d6d-4ac2-a6f8-85495ec61308.png)

![image](https://user-images.githubusercontent.com/91714626/233877902-34ce2f0c-0ef5-4bf0-aa21-9c77a4182a66.png)

![image](https://user-images.githubusercontent.com/91714626/233877859-8de753fb-aebd-47b2-8cca-891ced3fe951.png)

### Logout

Logs out clearing the cookies


## How to run:
npm run dev :  Runs the app in development mode(http://localhost:3000/)
npm run build: Builds app for production
npm start: Runs the app in the production(http://localhost:4000/)







The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
