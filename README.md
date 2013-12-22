Steps to run:

Clone repository into directory, suppose '/a'
cd /a/server
Switch to directory, and run command 'npm install', to install all dependencies. 
Then, do following things. 
1.) Replace the PICTURE_URL and OFFER_URL placeholders in index.html(client folder), with appropriate URLs according to you. 

2.) The web app is meant to function on Localhost, and hence, URLs have been hardcoded.

3.) In the server folder, in config/config_app.js, 
var fb_app_details = {      
    app_ID: 'Your_App_ID',                
    app_Secret: 'Your_App_Secret',
    yourCallbackURL: 'Your_Callback_URL'
}

Replace the three strings with appropriate values after creating your Facebook app, at www.developer.facebook.com

---

After this, switch to server folder.
Run command: 'node app'

Then, open browser and go to 'http://localhost:3000'
