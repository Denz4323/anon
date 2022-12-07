let scrap = require("../lib/scraper_pinterest")
let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	  if (!text) throw `Contoh: ${usedPrefix + command} cewe cantik`
	  scrap.pinterest(text)
      .then(a => a[Math.floor(Math.random() * a.length)])
       .then(b => conn.sendButtonImg(m.chat, b,`🅿🅸🅽🆃🅴🆁🅴🆂🆃
\n\n*Keyword*: ${text}\n
`.trim(), wm, 'Gambar Selanjutnya', `.pinterest ${text}`, m)
    )}  
handler.help = ['pinterest <text>']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i
handler.limit = true
handler.group = false
module.exports = handler