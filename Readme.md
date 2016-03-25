# A Data driven application that uses
- reactjs
- relay
- graphQL
- nodejs
- expressjs
- mongodb

## What is it?
It's just an application that I built as a poc on RGR stack. (Yes that is what we are going to call it). It's more like a basic setup at the moment with 2 main view one to get a random document from the mongodb and one to add a document to the db.

## How to run?
You need the following on your system
- mongodb/(or a cloud hosted instance of mongodb)
- node and npm
- babel-cli installed globaly (i.e. run npm install -g babel-cli)

Just clone it, move into the directory, install dependencies.
```
(Your awesome prompt)> git clone https://github.com/jck-d-rpr/react-graphql-relay.git
(Your awesome prompt)> cd react-graphql-relay
(Your awesome prompt)> npm install
(Your awesome prompt)> npm run start
```
After that go to ```localhost:3000``` to reap the fruits of your labour (and gasp in awe (optional))

You can do the following 
- ```npm run start```: to start the app on ```localhost:3000``` and will listen to changes you make and depending on that will restart the server.
- ```npm run ui_start```: to start the ui and it will listen to changes (no hot reloading)
- ```npm run start_no_watch```: same as ```npm run start``` but will not listen to changes
- ```npm run only_ui```: to start only the ui (hot reloading enabled)
- ```npm run test```: run test cases once (there are test cases too!!! well 1 or 2 maybe)
- ```npm run test_watch```: runs test cases with auto-watch enabled.
- ```npm run gen_schema```: to generate the schema.
- ```npm run lint```: to check the coding guidelines (**MOST IMPORTANT**)




