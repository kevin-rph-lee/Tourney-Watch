# TourneyWatch

Tournament manager for Overwatch that seeds individual players in to evenly matched teams. TourneyWatch also allows all users, including spectators, to follow along through tournament brackets,  and team roster listings. Users can also view live games via an embedded <a href="www.twitch.com">Twitch</a> viewer, and watch highlights uploaded by the Tournament manager in the form of embedded Youtube videos.

<p align="center">
<img src="https://media.giphy.com/media/l49JEshxivXb2kspy/giphy.gif" width="75%" height="75%" align="middle" />
</p>

## Getting Started

```
npm install
npm run local
open http://localhost:8080
```

If you'd like to try out our app with some pre-loaded data, please follow the following steps to run the seed file.

```
npm run knex migrate:latesst
npm run knex seed:run
```

Please note that the first user you register, after seeding the database, will own the first tournament. The first tournament can be started by navigating to your profile (under the navbar's User Options) and clicking the "as Manager" tab, or you can enter http://localhost:8080/t/1 in to your adress bar.

<p align="center">
<img src="https://media.giphy.com/media/l0HUf8kHuq39iBbSE/giphy.gif" width="75%" height="75%" align="middle" />
</p>

## Features

### Bracket Management

Tournament owner can track scoring within the tournament bracket. If the owner hits the "save" button and another user pulls up the tournament page, they will see the scores within the bracket that the owner has put in. 

<img src="https://i.imgur.com/i5dzGgE.jpg" width="75%" height="75%" align="middle" />

### Team Seeding 

TourneyWatch will pull player stats using the NPM package <a href="https://www.npmjs.com/package/overwatch-js">Overwatch-JS</a>. Then based off player level it will seed the teams so each team will be a relatively similar experience level. 

<img src="https://i.imgur.com/gkoh56s.jpg" width="75%" height="75%" align="middle" />

### Team/Player Info

Users can see the relative experience level of each team.

<img src="https://i.imgur.com/5ArgLfZ.jpg" width="75%" height="75%" align="middle" />

Using Overwatch-JS users can track what kind of hero class (Support, Tank, Defence, DPS) each player prefers based off their play history.

<img src="https://i.imgur.com/6ix7oyU.jpg" width="75%" height="75%" align="middle" />


### Team Management & Communication

The tournament owner can swap players between teams to help give them further control over the tournament that they are running.

<img src="https://i.imgur.com/pwRrHfH.jpg" width="75%" height="75%" align="middle" />

The tournament owner can send an e-mail to all players on a particular team to help facilitate communication.

<img src="https://i.imgur.com/FwJ3wAc.jpg" width="75%" height="75%" align="middle" />


### Highlight Management

A tournament manager can upload videos to the tournament page (via Youtube links). Users who view the page can then view these videos via an embedded Youtube video.

<img src="https://i.imgur.com/EDqseVM.gif" width="75%" height="75%" align="middle" />

The manager can add/remove these videos via the frontend UI.

<img src="https://i.imgur.com/HRJKkj2.jpg" width="75%" height="75%" align="middle" />


### User Profiles 

When a user registers, their playstats are pulled in via Overwatch-JS and displayed on their profile page.

<img src="https://i.imgur.com/E115urO.jpg" width="75%" height="75%" align="middle" />

The avatar is pulled from what they currently use on Battlenet. Users have the option to upload their own custom avatar to be used on their profile.

<img src="https://i.imgur.com/7RIozbC.jpg" width="75%" height="75%" align="middle" />

Users can see their playtime per hero (again pulled from Overwatch-JS) along with other data pulled from their play history.

<img src="https://i.imgur.com/ssRaEnL.jpg" width="75%" height="75%" align="middle" />


## Stack

* Javascript
* Express.js
* Node.js
* EJS
* jQuery
* PostgreSQL
* Bootstrap4

## Contributors

* <a href="https://github.com/kevin-rph-lee">Kevin Lee</a>
* <a href="https://github.com/WhtMage">Chris Northwood</a>
* <a href="https://github.com/l-shih">Lilian Shih</a>
* <a href="https://github.com/Mochirii">Mel Smith</a>
