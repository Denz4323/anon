let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    m.reply(` 💵 Coinmu di dompet tinggal ${global.db.data.users[who].money.toLocaleString().replace(/,/g, '.')}`)
}
handler.help = ['dompet [@user]']
handler.tags = ['Exp']
handler.command = /^(dompet)$/i
module.exports = handler