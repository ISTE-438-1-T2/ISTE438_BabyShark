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

## Startup Process
* Run `npm install` from the root project directory
* Run `npm run build` from the root project directory
* Run `npm run start` from the root project directory

## Server Startup (Temporary!)
* Run `nohup nodemon --exec npm run server &` from root project directory
* Run `nohup nodemon --exec npm run client &` from root project directory

## Server Shutdown
* On existing EC2 instance, you can run `knode` from anywhere to kill all current running Node processes. This command executes `ps aux | grep node | awk '{print $2}' | xargs -n1 | xargs kill -9 $1` which can also be run from anywhere on the server.