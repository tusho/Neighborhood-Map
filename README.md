# Neighborhood Map

## Setup Instructions

### Install the App

In your command line, type `npm install`.

### Start the App

Type `npm start` in order to run the app. This will open your browser, but in case it does not, open `http://localhost:3000` to view it manually.

### Service Worker

The service worker will only work in build mode. In order to run the service worker in build mode, type the following command: `npm run build`. If not yet installed on your local machine, run `npm install -g serve` followed by `serve -s build`. 

This will let you run the app in build mode and test the service worker. 

## App Information

### Framework

This app was built using ReactJS

### Api's

#### Google Maps API

The app initializes a map by fetching data from the Google Maps API. Markers on the map can be clicked which will show a window with information relevant to the corresponding marker. A sidebar will appear when clicking on the hamburger menu icon which will list all venues. These can be filtered by category and the relevant markers will apperear on the map. When clicking on a list item, the corresponding marker on the map will open an info window displaying the venue's information.

#### Foursquare API

The app fetches data for each venue through the Foursquare API. As a result, the venue's rating is displayed inside the corresponding window which pops up when clicking on a list item or marker. Should the Foursquare imposed limit of free daily requests be reached or the Foursquare servers not respond, the app will still work and an alternative text will be shown where the venue rating should be. The console will display a relevant error message.