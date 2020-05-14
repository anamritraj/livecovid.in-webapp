[![Netlify Status](https://api.netlify.com/api/v1/badges/fbdfd508-acd8-403a-b24a-209e1e7e9419/deploy-status)](https://app.netlify.com/sites/gallant-shirley-8651b6/deploys)

## livecovid.in 
> A live state-wise Covid-19 cases tracker for India.
<img width="1440" alt="Screenshot 2020-05-04 at 8 58 31 PM" src="https://user-images.githubusercontent.com/11889942/80983320-10467b00-8e4a-11ea-88fb-9092bc5c2b33.png">

## How to contribute?
- Fork this repository by clicking the fork button on the top right of this page.
- Clone that forked repository in your local, make changes, test and then push to your forked branch.
  - If you are making changes only in this Repo change your URL in the `.environment.development` to https://api.livecovid.in/api.
- If you want to setup the backend as well, see this repo: https://github.com/anamritraj/livecovind.in-api. Currently there is some sensetive information in the repo and hence it is not public. Planning to clean it but I procastinate a lot. :( [DM me](https://twitter.com/anamritraj) for access to this repo. 
- Now, create a pull request from your forked repo to this repo.

## Development

### :metal: [Join Telegram Development Group](https://t.me/livecovidin) :metal:

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Translation in new languages
The project has the internationlization set up properly and you can add any language you want. Although, since the data on this website is from India, adding Indian languages would make more sense.
#### Steps
1. Goto `/public/static/locales`
2. Add your language name and 2 character language code for your language. (As an example this is already done for Hindi and English) in `languages.json`.
3. Now, make a copy of `en` folder and name this to whatever language code you put in step 2.
4. Add your translations in all the json files. If you miss any translation, the text will be shown in English as default.

## Disclaimer

This is not an official government project. This is not associated in any way with my employer. I am not getting paid to do this. Also, I have no intentions of making money from this. This is created to keep people informed about the current state of Covid-19 in the country. If you need help, please call the emergency numbers listed on the [website here](https://www.mohfw.gov.in/) or call 100.

If you feel any information is missing or there is any error, please feel free to create [an issue](https://github.com/anamritraj/livecovid.in-webapp/issues/new) or reach out to me directly on [Twitter](https://twitter.com/anamritraj) and I would be happy to assist.

## Credits

This would not have been possible without the awesome guys at https://github.com/covid19india. I was initially scraping the MoHFW website, but then I got to know about them and since then this project internally calls their API. They are doing really awesome work maintaining a crowdsorced database of patients. Thanks to them for all the hard work!

## Meta

Anand – [@anamritraj](https://twitter.com/anamritraj) | [https://anandamritraj.in](anandamritraj.in) 

Distributed under the MIT license. See ``LICENSE`` for more information.
