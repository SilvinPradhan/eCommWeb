# eCommWeb :technologist:

[![SilvinPradhan's GitHub stats](https://github-readme-stats.vercel.app/api?username=SilvinPradhan)](https://github.com/anuraghazra/github-readme-stats)

[FullStack] E-Commerce Shopping Platform developed using the modern technology stacks, MERN (MongoDB, Express, React,
Node), MailChimp, Google Analytics, Braintree(PayPal) :shopping:

[![Build Status](https://travis-ci.com/alichtman/shallow-backup.svg?branch=master)](https://travis-ci.com/alichtman/shallow-backup)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)

## Become a Patron by supporting my work ##
If you guys like my work, please do support my work by becoming a patron here: <br />
 https://www.patreon.com/ghostDragoon95

Contents
========

* Cloning
* Installation
* File Structure
* Language & Tools
* Integration
* Deployment

 <hr />

## Cloning ##

In your terminal of the destination folder, run the following command:

``` $ git clone https://github.com/SilvinPradhan/eCommWeb.git <eCommWeb> ```

<hr />

## Installation ##

1. After cloning the project, navigate inside the project

``` > cd eCommWeb
    > cd eCommerceWeb
    > npm install [//]: # (Install Dependencies and Packages.)
    > cd .. <!--- navigate out of the backend folder --->
    > cd eComm-client <!--- navigate inside client project folder --->
    > npm install <!--- install package dependencies --->
```

2. To setup the server, navigate inside the backend project folder, i.e, eCommerceWeb. Run the following commands:
    * sudo touch .env // Create an environment variable file
3. Add the following environment variables in ` .env ` file:
   [Image file here!]
4. Now, in the terminal of the backend project folder, run the following command: <br />
   ``` $ npm run server ```
5. For the ` DATABASE ` environment variable, you need to set up the Free Tier Cluster for MongoDB Atlas. Follow this
   site which is a walkthrough for the setup: <br />
   ``` https://studio3t.com/knowledge-base/articles/mongodb-atlas-tutorial/ ```
6. Add a new terminal on the same Parent Directory (eCommWeb)

```
 > cd eComm-client
 > sudo touch .env
```

[Image file here!]

7. Add the following lines to the ` .env ` file:

 ```
 SKIP_PREFLIGHT_CHECK=true
 REACT_APP_API_URL='http://localhost:8000/api'
```

8. Now test if the React App is working:
   ``` $ npm run start ```

<hr />

## File Structure ##

1. Backend Directory Tree

```
eCommerceWeb/
├── controllers
│   ├── auth.js
│   ├── braintree.js
│   ├── category.js
│   ├── order.js
│   ├── product.js
│   └── user.js
├── helpers
│   └── dbErrorHandler.js
├── loading.js
├── models
│   ├── category.js
│   ├── order.js
│   ├── product.js
│   └── user.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.js
│   ├── braintree.js
│   ├── category.js
│   ├── order.js
│   ├── product.js
│   └── user.js
└── validator
    └── loading.js
```

2. Frontend Directory Tree

```
ecomm-client/
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── server.js
└── src
    ├── 404
    │   ├── PageNotFound.js
    │   └── PageNotFound.scss
    ├── App.js
    ├── admin
    │   ├── AddCategory.js
    │   ├── AddProduct.js
    │   ├── ManageProducts.js
    │   ├── Orders.js
    │   ├── UpdateProduct.js
    │   └── apiAdmin.js
    ├── auth
    │   ├── AdminRoute.js
    │   ├── PrivateRoute.js
    │   └── user.js
    ├── config.js
    ├── core
    │   ├── Header.js
    │   ├── Home.js
    │   ├── Layout.js
    │   ├── apiCore.js
    │   ├── cards
    │   │   ├── Card.js
    │   │   └── ShowImage.js
    │   ├── cart
    │   │   ├── Cart.js
    │   │   └── cartHandler.js
    │   ├── checkbox
    │   │   └── CheckBox.js
    │   ├── checkout
    │   │   └── Checkout.js
    │   ├── loading
    │   │   └── loading.js
    │   ├── newsletter
    │   │   ├── NewsletterForm.js
    │   │   └── NewsletterSubscribe.js
    │   ├── price
    │   │   └── FixedPrice.js
    │   ├── product
    │   │   └── Product.js
    │   ├── radiobox
    │   │   └── RadioBox.js
    │   ├── search
    │   │   └── Search.js
    │   └── shop
    │       └── Shop.js
    ├── loading.js
    ├── reportWebVitals.js
    ├── routes
    │   └── routes.js
    ├── setupTests.js
    ├── static
    │   └── images
    │       ├── cards
    │       │   └── homepage.png
    │       └── categoryBG
    │           └── bg.jpg
    ├── style.css
    ├── user
    │   ├── AdminDashboard.js
    │   ├── Profile.js
    │   ├── UserDashboard.js
    │   ├── apiUser.js
    │   ├── signin.js
    │   └── signup.js
    └── utils
        └── miscellaneous.js
        
```

## Language & Tools ##

* Node
* Express
* Mongoose
* React
* Webpack
* Google Analytics

## Integration ##

Send newsletter to connect with your audience? Maybe your application has `user` signup functionality and you have a
great database of emails. In this case, there are ways to take advantage of that database and use this column to create
your contact list directly. And maybe your web application does not require sign up and you're not capturing those that
come to your website. It is vital to have an easy and quick access to form a contact list and stay connected with your
audience/customers. This is all possible with integrating `Mailchimp` which does all of the heavy lifting for you.

### Steps to integrate Mailchimp ###

[Optional]

1. Get to Mailchimp's site and sign up for a free account <a href="https://login.mailchimp.com/signup/">here</a>.
2. Go the terminal of the `frontend` directory of your project, and run the following command:
   ``` $ npm i react-mailchimp-form ```
3. In your Mailchimp navigate to your dashboard, and to your ‘Audience’ tab. You’ll need to make sure that you have your
   contact list initiated.
4. Copy the HTML and extract the action from “Signup Forms > Embedded forms”. <br />
   <img src="https://user-images.githubusercontent.com/52342206/127592052-66412e8c-6029-4cb5-a489-16a18ec92ad0.png" width="550" height="350" /> <br/>
   `` Note:
   This ‘Signup Form’ can be navigated to from the Audience Tab, as well. While in ‘Embedded forms’ you’ll see the section in the right column ‘Copy/paste onto your site’. ``
5. Do not copy the whole block of code, but the following string in `<form action="COPY_MAILCHIMP_URL" />` <br />
   <img src="https://user-images.githubusercontent.com/52342206/127592130-326e5f17-e62f-47fa-a339-9dc4e392cde6.png" width="550" height="350" />
6. In the client side directory, navigate to `.env` file and paste the copied string (COPY_MAILCHIMP_URL) into a new
   environment variable, i.e, REACT_APP_MAILCHIMP_URL='COPY_MAILCHIMP_URL'.<br/>
   <img src="https://user-images.githubusercontent.com/52342206/127592403-9a514d02-a3f7-4b95-9c58-be8c590440f4.png" width="550" height="350" />
7. Now, navigate to your NewsletterSubscriptionForm jsx file and build a form. You need to test making sure that all of
   your signups are hitting your Audience Contact list in MailChimp.
8. To COPY a custom Newsletter Subscription Form that I built, navigate to -> `src/core/newsletter/NewsletterSubscribe`
9. Before pushing the code to the github repo, make sure TO MOVE YOUR ‘action=’ value to a .env file to hide your
   personal, secret mailchimp key.

### Steps to integrate Google Analytics ###

What can we do with Google Analytics?
* You will be able to track your revenue,
* Track user flow/traffic to your site,
* Track your new user acquisition rate,
* Even track which age-group are more interested in your business,
* Also, you can gain insight into the region they live in.

#### Steps ####

1. Create an account in Google Accounts: <a src="https://analytics.google.com/analytics/web/">google.analytics.com</a> <br/> If you have already setup an Google Account, you just have to set up a new account and give it a name.
2. Create a `property` <br/> Property is a way for Google to track your website. We need to create a new property for our website.
    * Go to your dashboard and find `Admin` -> `Create New Property`
    * Fill up the required name and other details and provide the URL of your website. <br/>
    [ Important ] <br/>
    Be sure to click on the Advanced Settings and turn on the Create Universal
   <img src="https://miro.medium.com/max/1400/1*cIfHIh_jnDAZdBZY5ZD2aQ.png" width="580" height="350"/>
    * Then Select a property and get the tracking id and save it somewhere.
   <img src="https://miro.medium.com/max/1400/1*Hj7AdusSGWj2152T2htKYQ.png" width="580" height="350"/>
3. Now you are done setting up your project in Google Analytics. If you have a live website you will start getting some insights about the visitors already.
4. [React] Install Dependencies: 
    * First, install react-ga package from npm. It’s the official npm package for React integration with Google analytics. <br />
      `yarn add react-ga`
      or
      `npm i react-ga -S`
5. Setup Google Analytics inside your React Project
    * Inside `App.js` or `index.js`, add the following code: <br/>
    `import ReactGA from 'react-ga';
      const TRACKING_ID = "UA-12341234-1"; // YOUR_OWN_TRACKING_ID
      ReactGA.initialize(TRACKING_ID);`
6. Integration with React Router <br/>
   We can create a RouteChangeTracker component to listen to the changes in route and send data back to Google Analytics <br/>
    ```import React from 'react'
   import { withRouter } from 'react-router-dom';
   import ReactGA from 'react-ga';
   const RouteChangeTracker = ({ history }) => {

   history.listen((location, action) => {
   ReactGA.set({ page: location.pathname });
   ReactGA.pageview(location.pathname);
   });

   return <div></div>;
   };
    export default withRouter(RouteChangeTracker);
    ```
7. Do not forget to add the RouteChangeTracker component inside your App.js file.

## Server Documentation ##
You can find the server documentation with the steps to setup and deploy the WebApp:
<a href="https://github.com/SilvinPradhan/eCommWeb/blob/gh-pages/docs/index.md">Server Documentation </a>

