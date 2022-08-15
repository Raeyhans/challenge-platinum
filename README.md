# express-challenge-platinum
Express server

## Deployed to heroku. 

### <a href='https://mysterious-earth-40405.herokuapp.com/api-docs'>Try it here!</a>

### Steps to run it on local:
- install nodejs
- pull/download this repository
- configure env variable in .env.example file
- run command "npm install"
- run command "npx sequelize-cli db:create"
- run command "npx sequelize-cli db:migrate"
- open localhost:3000 (default run on port 3000)

1. Clone from git repository (https://github.com/Raeyhans/challenge-platinum.git)
2. change database data in folder config/config.json
3. npm install
4. import DATABASE.sql or run migration (npx sequelize-cli db:migrate)
5. access swagger doc api http://localhost:3000/api-docs/