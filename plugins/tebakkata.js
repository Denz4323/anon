let fetch = require('node-fetch')
let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
Soal: ${json.soal} \n\n
Waktu habis: *${(timeout / 1000).toFixed(2)} detik* \n\n
Ketik ${usedPrefix}teka untuk bantuan atau klik tombol Bantuan di bawah.\n\n
Hadiah: ${poin} Exp
`.trim()
    conn.tebakkata[id] = [
        await conn.sendBut(m.chat, caption, wm, 'Bantuan', '.teka', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakkata[id]) await conn.sendBut(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, wm, 'Tebak Kata', '.tebakkata', conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i
handler.group = false
module.exports = handler