# TourneyWatch

Tournament manager for Overwatch that seeds individual players in to evenly matched teams. TourneyWatch also allows all users, including spectators, to follow along through tournament brackets,  and team roster listings. Users can also view live games via Twitch integrations, and watch highlights uploaded by the manager.

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

<img src="https://i.imgur.com/i5dzGgE.jpg" width="75%" height="75%" align="middle" />

### Team Balancing 

<img src="https://i.imgur.com/gkoh56s.jpg" width="75%" height="75%" align="middle" />


### Team/Player Info

<img src="https://i.imgur.com/5ArgLfZ.jpg" width="75%" height="75%" align="middle" />

<img src="https://i.imgur.com/6ix7oyU.jpg" width="75%" height="75%" align="middle" />


### Team Management & Communication

<img src="https://i.imgur.com/pwRrHfH.jpg" width="75%" height="75%" align="middle" />


<img src="https://i.imgur.com/FwJ3wAc.jpg" width="75%" height="75%" align="middle" />


### Highlight Management

<img src="https://i.imgur.com/EDqseVM.gif" width="75%" height="75%" align="middle" />

<img src="https://i.imgur.com/HRJKkj2.jpg" width="75%" height="75%" align="middle" />


### User Profiles 

<img src="https://i.imgur.com/E115urO.jpg" width="75%" height="75%" align="middle" />

<img src="https://i.imgur.com/7RIozbC.jpg" width="75%" height="75%" align="middle" />

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
