//const fg = require('api-dylux')
const fetch = require ('node-fetch')
const { savefrom, facebookdl, facebookdlv2 } = require('@bochilteam/scraper')
const fbDownloader = require('fb-downloader-scrapper')
let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `Silahkan masukkan Urlnya, contoh .${command} https://fb.watch/azFEBmFRcy/`
if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `Silahkan masukkan Urlnya, contoh .${command} https://fb.watch/azFEBmFRcy/`
try {
await m.reply(`Silahkan Tunggu, sedang di proses`)
switch (command) {   
case "facebook": case "fb": case "facebookdl": case "fbdl":                                  
let res = await fbDownloader(args[0])
for (let result of res.download) {
let ur = result.url    
await conn.sendFile(m.chat, ur, 'error.mp4', wm, m)}
break           
case "facebook2": case "fb2": case "facebookdl2": case "fbdl2":           
//let ress = await fg.fbdl(args[0])
//let urll = await ress.data[0].url    
//await conn.sendFile(m.chat, urll, 'error.mp4', wm, m)
await await m.reply(`Hasil Error, Silahkan coba perintah yang lain (.fb, .fb2, .fb3, .fb4, .fb5)`)
break
case "facebook3": case "fb3": case "facebookdl3": case "fbdl3":        
let vio = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=beta&url=${args[0]}`)  
let vioo = await vio.json()
let videovio = `${vioo.result.hd.url || vioo.result.sd.url}`
await conn.sendFile(m.chat, videovio, `error.mp4`, wm, m)
break   
case "facebook4": case "fb4": case "facebookdl4": case "fbdl4":           
const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
for (const { url, isVideo } of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, wm, m)
break          
case "facebook5": case "fb5": case "facebookdl5": case "fbdl5":        
let res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=brunosobrino&q=${args[0]}`)  
let json = await res3.json()
let url3 = await json.video
await conn.sendFile(m.chat, url3, 'error.mp4', wm, m)     
break    
}} catch {
await await m.reply(`Hasil Error, Silahkan coba perintah yang lain (.fb, .fb2, .fb3, .fb4, .fb5)`)
}
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
module.exports = handler
handler.command = /^(fb|fb2|fb3|fb4|fb5)$/i
handler.group = true
handler.limit = false