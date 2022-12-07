let { promisify } = require('util')
let _gis = require('g-i-s')
let gis = promisify(_gis)

let handler  = async (m, { conn, args, text }) => {
  if (!text) return m.reply('Cari apa?')
  let results = await gis(text) || []
  let { url, width, height } = pickRandom(results) || {}
  if (!url) return m.reply('Tidak ditemukan')
  conn.sendButtonImg(m.chat, url, `
  \t「𝐆𝐎𝐎𝐆𝐋𝐄 𝐈𝐌𝐀𝐆𝐄」\n
*Keyword*: ${text}\n
*Size*: ${width} x ${height}
`.trim(), wm, 'Gambar Selanjutnya', `.gimage ${text}`, m)
}
handler.help = ['image <query>', 'gimage <query>', 'googleimage <query>']
handler.tags = ['internet']
handler.command = /^(gimage|googleimage|image)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}