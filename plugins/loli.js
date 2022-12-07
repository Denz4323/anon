let scrap = require("../lib/scraper_pinterest")
let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	scrap.pinterest("loli","loli kawaii","loli","anime loli","loli cantik").then(a => a[Math.floor(Math.random() * a.length)]).then(b => conn.sendButtonImg(m.chat, b, `Nih loli o▽o🌸`.trim(), wm, 'Loli', `.loli`, m))
   }
    
handler.help = ['loli']
handler.tags = ['internet']
handler.command = /^(loli)$/i
handler.limit = true

module.exports = handler