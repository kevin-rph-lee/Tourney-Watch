# TourneyWatch

Tournament manager for Overwatch that seeds individual players in to evenly matched teams. TourneyWatch also allows all users, including spectators, to follow along through tournament brackets,  and team roster listings. Users can also view live games via Twitch integrations, and watch highlights uploaded by the manager.

<p align="center">
<img src="https://media.giphy.com/media/l49JEshxivXb2kspy/giphy.gif" width="75%" height="75%" align="middle" />
</p>

## Getting Started

```
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run local
open http://localhost:8080

```


## Stack

* Javascript
* Express.js
* Node.js
* EJS
* jQuery
* PostgreSQL
* Bootstrap4