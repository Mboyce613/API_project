# Gouling Around



## Description

Gouling Around is an app for creating groups and hosting events. Gouling Around is a clone of [Meetup](https://www.meetup.com/).

## Link to live site

Hosted on Render: [Gouling Around](https://gouling-around.onrender.com)

## Technologies

Gouling Around was built using the following technologies:
<br>
<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:75px;" />



## Getting Started

1. Clone this repo
    * `git clone https://github.com/Mboyce613/API_project`

2. Install dependencies
    * `cd backend`
    * `npm install`
    * `open a second terminal`
    * `cd frontend`
    * `npm install`

3. Create a .env file in backend directory modeled off of the .env.example from the backend directory and fill out the respective information.

4. Add a proxy to the package.json file in the frontend directory to match the PORT configuration in the .env file
    * `"proxy": "http://localhost:8000"`

5. Create Database, Migrate, and Seed models
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`

6. Start the backend server
    * `npm start`

7. Start the frontend server
    * `npm start`


## Images

<img src="./images/home.png" style="width:600px;" />
<img src="./images/groups.png" style="width:600px;" />
<img src="./images/groupdeets.png" style="width:600px;" />
