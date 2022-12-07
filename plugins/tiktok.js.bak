let axios = require('axios');
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Silahkan masukkan urlnya, Contoh:\n ${usedPrefix}${command} https://vt.tiktok.com/ZSRqLXGFo/`
    let res = (await axios.get(API('males', '/tiktok', { url: args[0] } ))).data;
    if (res.status != 200) throw `Maaf Fitur sedang error, silahkan coba lagi beberapa saat`;
    if (!res) throw `Maaf Fitur sedang error, silahkan coba lagi beberapa saat` ;
    conn.sendFile(m.chat, res.video, ' ', `
*Author*: ${res.author}
*Judul:* ${res.title}

${global.wm}
`.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt)$/i
handler.group = true

module.exports = handler