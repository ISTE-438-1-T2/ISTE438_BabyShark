# ISTE-438 MongoDB Project
## Description
The goal of this project is to create a basic search application that can be used to search for entries in a Mongo database.

## Objectives
The objectives for this project are:
- Design and host a MongoDB in the cloud
- Develop a front end to search from
- Develop logic in back end to process searches from UI
- Implement a cloud server for the database and application

## Work Breakdown Structure
**[Lucidchart link](https://lucid.app/lucidchart/abd79303-bfd5-4c3a-b6e2-41a55779b998/edit?invitationId=inv_ca9fceae-3ff5-4bd9-bf6f-31e531116bbc)**

## Gantt Chart
**[Lucidchart link](https://lucid.app/lucidchart/abd79303-bfd5-4c3a-b6e2-41a55779b998/edit?invitationId=inv_ca9fceae-3ff5-4bd9-bf6f-31e531116bbc)**

## Startup Process (Local Machine)
### Requires NodeJS, NPM, and MongoDB to be installed for local development
* Run `npm install` from the root project directory
* Run `mongoimport --db sharkdb --collection sharkepisodes --file sharkdata.json --jsonArray` from the `/db` directory
* Run either the `load_images_to_db.sh` if you are on Linux/Unix or `load_images_to_db.bat` if you are on Windows from the `/images`directory
* Run `npm run build` from the root project directory
* Run `npm run dev` from the root project directory

## Server Startup
* Run `npm install` from the root project directory
* Run `npm i -g nodemon` from the root project directory
* Run `mongoimport --db sharkdb --collection sharkepisodes --file sharkdata.json --jsonArray` from the `/db` directory
* Run either the `load_images_to_db.sh` if you are on Linux/Unix or `load_images_to_db.bat` if you are on Windows from the `/images`directory
* Run `npm run build` from the root project directory
* Run `sudo chmod +x startup.sh` from the root project directory
* Run `./startup.sh` from the root project directory
* (Optional!) Run `tail -f nohup.out` from the root project directory to see launch information and output logs

## Server Shutdown
* On existing EC2 instance, you can run `ps aux | grep node | awk '{print $2}' | xargs -n1 | xargs kill -9 $1` from anywhere on the server to kill any currently running Node processes.
