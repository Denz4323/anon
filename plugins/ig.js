const { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Silahkan masukkan urlnya, contoh ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
    const results = await instagramdl(args[0])
        .catch(async _ => await instagramdlv2(args[0]))
        .catch(async _ => await instagramdlv3(args[0]))
        .catch(async _ => await instagramdlv4(args[0]))
    for (const { url } of results) await conn.sendFile(m.chat, url, 'instagram.mp4', wm, m)
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.error = null
handler.command = /^(ig(dl)?)$/i
handler.group = false
module.exports = handler