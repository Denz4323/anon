let fetch = require('node-fetch')
let winScore = 1000
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        conn.sendButton(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', wm, null, [['Menyerah', 'nyerah']], this.game[id].msg)
        throw false
    }
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
*Soal:* ${json.soal}

Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}

Setiap jawaban yang benar Coin ${winScore}
    `.trim()
    this.game[id] = {
        id,
        msg: await this.sendButton(m.chat, caption, wm, null, [['Menyerah', 'nyerah']], m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i
handler.limit = true
handler.group = false

module.exports = handler