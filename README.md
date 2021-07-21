# eCommWeb
[FullStack] E-Commerce Shopping Platform developed using the modern technology stacks, MERN (MongoDB, Express, React, Node)

[![Build Status](https://travis-ci.com/alichtman/shallow-backup.svg?branch=master)](https://travis-ci.com/alichtman/shallow-backup)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
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
