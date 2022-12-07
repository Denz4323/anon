# Anon-MD

Whatsapp BOT MultiDevice with NodeJS.
Recode from Aine-MD

Original Source By

[![Aiinne](https://github.com/Aiinne.png?size=35)](https://github.com/Aiinne)
 [`Aine-MD`](https://github.com/Aiinne/Aine-MD)
* My WhatsApp [`Click Here`](https://wa.me/60142871298)
* My Ig [`Click Here`](http://instagram.com/hilmi_faturahman)

## Heroku Buildpack
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hilmifaturahman/Anon-MD)

| BuildPack | LINK |
|--------|--------|
| **FFMPEG** |[here](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [here](https://github.com/DuckyTeam/heroku-buildpack-imagemagick) |

---------

## HOW TO CONNECT TO MONGODB WHEN RUN IN HEROKU

* Create account and database in mongodb atlas [`watch here`](https://youtu.be/rPqRyYJmx2g)
* when you already have a database, you just need to take mongourl
* Put mongourl in Procfile `web: node . --db 'mongourl'`
* Example `web: node . -- db 'Your Mongo URI'`

---------

## HOW TO INSTALL ON TERMUX

```bash
pkg update && pkg upgrade
pkg install git -y
pkg install python3 -y
pkg install nodejs -y
pkg install ffmpeg -y
pkg install imagemagick -y
git clone https://github.com/hilmifaturahman/Anon-MD
cd Anon-MD
pkg install yarn
yarn install
yarn update

```
---------

## HOW TO INSTALL ON UBUNTU

```bash
sudo apt-get update && apt-get upgrade
sudo apt-get install git -y
sudo apt-get install python3 -y
sudo apt-get install nodejs -y
sudo apt-get install ffmpeg -y
sudo apt-get install imagemagick -y
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs gcc g++ make
git clone https://github.com/hilmifaturahman/Anon-MD
cd Anon-MD
npm install
npm update

```
---------

## HOW TO INSTALL ON WINDOWS/RDP/VPS

* Download And Install Git [`Click Here`](https://git-scm.com/downloads) (**Don't Forget Add GIT to PATH enviroment variables**)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)
* Download And Install Python [` Click Here` ](https://www.python.org/downloads/) (**Don't Forget Add Python to PATH enviroment variables**)

```bash
git clone https://github.com/hilmifaturahman/Anon-MD
cd Anon-MD
npm install
npm update
```
---------

## PANEL/RDP/VPS

* Amiruldev [`Click Here`](https://www.amiruldev.my.id)

---------


## CHANGE THE OWNER NUMBER
edit on config.js

---------

## HOW TO RUN

```bash
npm start
```

---------


## IF YOU WANT TO RUN MANUAL

``` bash
node .
```

## Arguments `node . [--options] [<session name>]`

### `--session <file name>`

Use another session with another name, default is ```session.data.json```

### `--prefix <prefixes>`

* `prefixes` are seperated by each character
Set prefix

### `--server`

Used for [heroku](https://heroku.com/) or scan through website

### `--db <json-server-url>`

#### GET

```http
GET /
Accept: application/json
```

#### POST

```http
POST /
Content-Type: application/json

{
 data: {}
}
```

### `--big-qr`

If small qr unicode doesn't support

### `--img`

Enable image inspector through terminal

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```

## Settings

Now set using switch [enable.js](https://github.com/Aiinne/Aine-MD/blob/master/plugins/enable.js), among others are

```js
autoread: false, // If true all chats are automatically read
nyimak: false, // No bot, just print received messages and add users to database
restrict: false, // Enables restricted plugins (which can lead your number to be banned if used too often)
self: false, // Activate self mode (Ignores other)
pconly: false, // If that chat not from private bot, bot will ignore
gconly: false, // If that chat not from group, bot will ignore
```

---------

#### Thank's To
Allah SWT

My support system :)

#### Special Thank's To

[![Aiinne](https://github.com/Aiinne.png?size=100)](https://github.com/Aiinne)
[![adiwajshing](https://github.com/adiwajshing.png?size=100)](https://github.com/adiwajshing/)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)



