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

## Server Information
NOTE: This guide was written using an AWS EC2 instance of Ubuntu Server 20.04

The application can be ran in a multitude of ways; Apache, Python Web, etc; but for this we will be using Nginx. This can be installed by running `sudo apt-get install nginx` from any location on the server. Once it is installed, run `sudo nano /etc/nginx/sites-enabled/default` to edit the default site configuration. 

Scroll down to the section that starts with `server_name`, and change the `_;` to the Elastic IP of your AWS instance, for example `server_name 123.456.7.89;`

Then, delete the entire block that says `location /` and replace it with the following:
```location / {
    proxy_pass http://localhost:3000,
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
 }
 
 location /api {
    proxy_pass http://localhost:8080,
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
 }
```
If you are changing the port numbers of the Client or Server, make sure they are reflected above, respectively.
 
Then, from the root project directory, run `nano webpack.config.js`. Scroll to the bottom and make sure of two things: First, that your /api proxy is set to the correct port; and Second, that `disableHostCheck: true,` appears inside the devServer section after `open: true,`. If not, add it.
 
Press `Ctrl + X`, then `Ctrl + Y`, then `Enter` to save your changes.

Then, run `nano ./src/server/index.js`. Make note of your ec2 address, should look something like `http://ec2-00-00-000-00.compute-1.amazonaws.com` and replace anywhere it says `localhost` with that address, making sure to remove the ports. Scroll down and change both app.put and app.listen calls to `/api/episode`, assuming you set NGINX up as stated above. Do the same for `nano ./src/client/SearchEpisode.js`.

Press `Ctrl + X`, then `Ctrl + Y`, then `Enter` to save your changes.

Rebuild the project, then from the root directory run `./startup.sh` and optionally `tail -f nohup.out` to see the logs and console output of the running processes.
