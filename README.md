# myInvoice App
This project was created because I needed new app for my invoices and on the other side was this a perfekt oportunity to start learning Angular. Goal was to create an app with a simple interface and a few basic functionalities.

Here you'll find a [DEMO]<br />
Demo login data<br />
U: some.fake@email.com<br />
P: tester

## Functionality overview
As already said I wanted something with simple interface and only basic functions to create an invoice that I can edit or newly create if I needed something to change, after it was already send.

The general page breakdown and functionalities looks like this:

##### Home page
- Authentication (Login, auto-logout)

##### Invoice Page
- Create invoice
- Add invoice positions
- Edit invoice positions
- Delete invoice positions

##### Customers page
- Add customer data
- Edit customer data
- Delete customer

I'm stationed in Europe so I've inserted an option to choose if invoice is for home or foreign country. That is because of tax calculation. Please update this function accordingly to your needs and your country regulations.


## Getting started

You will need Angular CLI and Node JS installed globally. Otherwise you will also need gmail account as I use Firebase for Back-End.

##### Firebase
- Log into firebase and create a new project.
- Inside project under Authentication add first new sign-in metod (email/password) and then create a new user
- Create new Realtime Database
- Change rules under database setting to

```
{
  "rules": {
    ".read": "auth != null && auth.uid === 'change to your user ID number'",
    ".write": "auth != null && auth.uid === 'change to your user ID number'"
  }
}
```

You can remove auth.uid part but in this case you will permanently receive e-mails from Firebase that your DB isn't save, although auth do cover basic security measures.

##### App
Copy your Web Api Key from project settings and insert it at ``firebaseAPIKey`` param in environment files. You'll find API Key in your Firebase project settings in general tab.

Copy your DB Url from Realtime Database tab and insert it at ``firebaseUrl`` param in environment files. IMPORTANT: remove slash at the end!

Insert your company address in ``invoice-overview.component.html``. In same file you can also change currency (currently EUR) and all other texts for your invoice. To change logo simply replace ``src/assets/img/your-logo.png`` file.

In ``app.module.ts`` you'll also find localisation. Currently "en-EN". Change it to your needs. It only effects date format.

Use ``npm install`` to install all dependecies and then run ``ng serve`` for a dev server. Navigate to ``http://localhost:4200/``. The app will automatically reload if you change any of the source files.

To log into the app enter your login credentials that you entered when created a user in Firebase Back-End. If everything was correctly configured you should be able to fully use the app functions. If not, check the steps one more time.

Building the project

Run ``ng build`` to build the project. The build artifacts will be stored in the ``dist/ directory``. Use the ``-prod`` flag for a production build. To deploy the app you'll need static website hosting. There a lot of options and Firebase is also one of them. [Here you'll find more information about it.]

## What's next
Probably some code optimization would be good ecspecially as it is a beginner project. But it probably won't happen in this version as I am planning to rebuild all from start with nodejs and mongoDB. I will also add some further functionalies like saving invoices and dashboard for outcome analysis.

## Conclusion
If you like this app you can use it for non- or commercial purposes. You can use it as a playground for learning new skills or change it on your own free will. I would appreciate a star click.

[DEMO]: <https://invoiceappdemo.web.app>
[Here you'll find more information about it.]: <https://firebase.google.com/docs/hosting>
