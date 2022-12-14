<!-- PROJECT -->

<a id="top"></a>

  <div align="center">
  <h1 align="center">Physical Fitness</h1>
    <a href="https://github.com/sisay2405/Physical-fitness">
        <img width="250" height="80"alt="Github" src="https://raw.githubusercontent.com/sisay2405/Physical-fitness/development/src/assets/images/github.png">
            </a>
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#wireframe">Wireframe</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This app build with the existing knowledge of the React basics, and give you further practice working with codebase linting, component testing, Redux Toolkit, and TypeScript. A user should, at the bare minimum:

- exercise (add exercise, [pushup, pull, number, completed/not] save to storage , loop)
- Create complex workouts easily
- Define your own exercises with custom durations
- update and remove exercises

This app used Redux Toolkit and state slices to manage any state data needed across multiple components. In the case where data is created and used only within one component (or possibly one and a few of its direct children), consider using useState() or useReducer() and traditional prop drilling. Most apps will use a combination of "local" state management (useState() and useReducer()) and "global" state management (Redux or Context API).

Apply the TypeScript static typing system. try to use TypeScript for the majority of React components! installed typescript, add support for TypeScript linting, and use either .ts or .tsx extension for the files to apply TypeScript type-checking on.

Use the `BLANK_README.md` to get started.

<p><a  align="right" href="#top">Back to top</a></p>

### Built With

A few of the frameworks/libraries that were used to build the project are:

- React
- Firebase
- React Redux
- Axios
- React Router
- EsLint and AirBnb
- Typescript

### wireframe

### Getting Started The App build out with simple wireframes using Figma.

<img src="/public/homewireframe.png"
             height="250" width="500">           

<img src="/public/signinwireframe.png"
             height="250" width="500">

<img src="/public/signupwireframe.png"
             height="250" width="500">

<p><a  align="right" href="#top">Back to top</a></p>
<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free account at for firebase to create your own collection and add it to your .env file to connect your API to your Data base
2. Clone the repo
   ```sh
   git clone https://github.com/sisay2405/Physical-fitness
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your firebase configuration details in your `.env` file in your backend
   ```js
   REACT_APP_FIREBASE_API_KEY = 'ENTER YOUR API KEY';
   REACT_APP_FIREBASE_AUTH_DOMAIN = 'ENTER YOUR FIREBASE_AUTH_DOMAIN';
   REACT_APP_FIREBASE_PROJECT_ID = 'ENTER YOUR FIREBASE_PROJECT_ID';
   REACT_APP_FIREBASE_STORAGE_BUCKET = 'ENTER YOUR FIREBASE_STORAGE_BUCKET';
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 'ENTER YOUR FIREBASE_MESSAGING_SENDER_ID';
   REACT_APP_FIREBASE_APP_ID = 'ENTER YOUR FIREBASE_APP_ID';
   ```
5. npm start for START the app.

<p><a  align="right" href="#top">Back to top</a></p>
<!-- USAGE EXAMPLES -->

## Usage

Can be used to workout the Exercises your can create your own physical fiteness web app and share it with your community. You can:

- [x] Creat, Customize Exercises
- [x] Add Exercises
- [x] Delete Exercises
- [x] Edit Exercises
- [x] User Sign In/Sign Up
- [x] To creat your Exercises you will need to sign in/sign up

<!-- CONTACT -->

## Contact

Sisay Areaya - sareaya@alphaworks.tech , abrehasisay04@gmail.com

Project Link: <a href="https://github.com/sisay2405/phiscal-fitness-app"> Physical Fitness
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p><a  align="right" href="#top">Back to top</a></p>
