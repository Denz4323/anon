let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return

let ass = /(assalamualaikum|assallamualaikum|assalamu\'alaikum|as\'salamualaikum)/i
    let isCintaKamu = ass.exec(m.text)
    if (isCintaKamu) {
    conn.sendMessage(m.chat, {
        react: {
          text: ``,
          key: m.key,
        }})
   setTimeout(() => {
        conn.reply(m.chat, `وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ`, m)
    }, 1000)
    }

}

handler.limit = true
module.exports = handler