# WeatherDataViewer
Displays weather data collected in a weewx sqlite database in a nice web interface. This application also provides a REST api for data contained in the weewx sqlite database.

# Prerequisites
Make sure that ```weewx``` is set up and running: http://www.weewx.com/.
We assume that it is set up such that all data is stored in a sqlite database (```weewx.db```).

# Installation
You need to install gulp and bower once globally like this:
```npm install -g gulp bower```

Then, you simply do the following:

1. ```npm install```
2. ```bower install```
3. ```gulp```

Run the application simply as 
```
node server.js <prefix path where weewx's sqlite database resides>
```
Finally, open ```http://localhost:8080/wd``` in a browser. It also runs nicely on a Raspberry Pi.
