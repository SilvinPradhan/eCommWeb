# eCommWeb
[FullStack] E-Commerce Shopping Platform developed using the modern technology stacks, MERN (MongoDB, Express, React, Node)

[![Build Status](https://travis-ci.com/alichtman/shallow-backup.svg?branch=master)](https://travis-ci.com/alichtman/shallow-backup)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SilvinPradhan/eCommWeb/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-CC0-blue.svg)](http://creativecommons.org/publicdomain/zero/1.0/)


Contents
========

 * [Deployment](#deployment)

**Deploy this FullStack Ecommerce app to Digital Ocean cloud servers, Add a Domain name and use Cloudflare's CDN to your application along with free SSL.**

** Code for React Presentation Layer - server.js
```
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
```

** Code `nginx` sites configuration **
```
location /api {
    proxy_pass http://localhost:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
 
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
<hr />

<h3 align = "center"><b> Deployment Procedure </b></h3>

### Step 1 --- Create a New Droplet ###
1. Sign up or Sign in to a new account in Digital Ocean(DO).
2. Open the "create" drop down menu and click the "Droplets" link - takes you to the 'Create Droplets' page. Follow the configuration options before creating a new server.
3. Select Ubuntu OS for your server: 
<imgsrc="https://miro.medium.com/max/1400/1*-EPiH9jiBHCq_k-67oSuHw.png" width="650px" height="250px"/>
4. Choose the Basic Plan for $5/month that gives enough processing power to run a medium-sized web app. However, it can be upgraded later according to the need.
<img align="center" src="https://miro.medium.com/max/1400/1*-W5qkNrUsaTywF0W1IwtAA.png" width="650px" height="250px"/>
5. If additional ` block storage ` is required for storing static assets such as Images, Videos, and more, you can add it. However, it is not necessary.
6. Pick a Data Center closest to your region.
<img align="center" src="https://miro.medium.com/max/1400/1*0LEGFEEUN8jVBTkLBn7tXQ.png" width="650px" height="250px"/>
7. [Important] Create a root password - for accessing Droplet.
<img align="center" src="https://miro.medium.com/max/1400/1*py2u7_4V3Xo9AqlZVhqugQ.png" width="650px" height="250px"/>
8. Choose `how many droplets` to be deployed. Also, choose a `hostname` which gives the server a name to remember it by(Adding a `tag` is optional.
<img align="center" src="https://miro.medium.com/max/1400/1*MKVvq3yF2hvC-5xUHBVsQw.png" height="250px"/>
9. [optional] Choose backups of your droplet generated every week.
10. Click `Create Droplet` to create your droplet with those configuration.

<hr />

### Step 2 --- Server Setup Access ###
* Access droplet as the 'root' user by using the password for root created in the last step.
 In the terminal of your computer, run the following command: <br/>
``` > ssh root@<server_ip_address> ```
* [!important] Using root access on a regular basis is discouraged. So, create an alternative account with limited scope, similar to IAM in AWS. 
Run the following command while logged in as root user in the droplet: <br />
``` > adduser <username> ```
* Since, this user has limited privileges, to give the new root user privileges, follows the command: <br />
``` > usermod -aG sudo <username> ```

<hr />

### Step 3 --- Installing Node and MongoDB ###

## Node Installation ##

* Installing Node.js with Apt Using a NodeSource PPA:
```
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh 
```
* Inspect the contents of the downloaded script with nano (or your preferred text editor):
``` nano nodesource_setup.sh ```
* When you are satisfied that the script is safe to run, exit your editor, then run the script with sudo:
```sudo bash nodesource_setup.sh```
* You can now install the Node.js package in the same way you did in the previous section:
```sudo apt install nodejs```
* Verify that you’ve installed the new version by running node with the -v version flag:
``` node -v ```

* Refresh your local package index first and install node by typing: <br />
``` sudo apt update ``` <br />
``` sudo apt install nodejs ```
* Check that the install was successful by querying node for its version number:
```nodejs -v```
* Install ```npm```:
```sudo apt install npm```

* Must include MongoDB's dedicated package repository to your APT sources.
* Run the following command in the terminal: <br />
``` cd ``` <br />
``` curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - ``` <br />
* Double check that the key was added correctly. <br/>
``` apt-key list ```
This will return the MongoDB key somewhere in the output: <br />
```Output
/etc/apt/trusted.gpg
--------------------
pub   rsa4096 2019-05-28 [SC] [expires: 2024-05-26]
      2069 1EEC 3521 6C63 CAF6  6CE1 6564 08E3 90CF B1F5
uid           [ unknown] MongoDB 4.4 Release Signing Key <packaging@mongodb.com>
. . .
```
* Run the following command that creates a file in the `` sources.list.d `` directory named ``` mongodb-org-4.4.list ```. <br />
``` $ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list  ```
* Update server's local package index so APT knows where to find the ```mongodb-org``` package: <br/>
``` sudo apt update ``` <br />
``` sudo apt install mongodb-org ```
[Press Y] when prompted, and ```ENTER``` to confirm installation of the package.

## Nginx Installation: ##

* Run the following command to install ```nginx``` <br />
``` sudo apt-get install nginx ```

## Starting MongoDB Service and Testing Database ##

1. Manage MongoDB using various ```systemctl``` commands.
2. Run the following command to start the MongoDB service:
```$ sudo systemctl start mongod.service```
3. Now, check the service's status.
```$ sudo systemctl status mongod ```
4. The following output is returned indicating that the service is up and running:
```
Output
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-06-09 12:57:06 UTC; 2s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 37128 (mongod)
     Memory: 64.8M
     CGroup: /system.slice/mongod.service
             └─37128 /usr/bin/mongod --config /etc/mongod.conf
```
5. If there is no error, enable MongoDB service to start up at boot:
``` sudo systemctl enable mongod```

