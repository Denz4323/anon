let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 ANTI LINK 」*\n\nTelah terdeteksi *${await conn.getName(m.sender)}* Kamu telah mengirimkan link grup!\n\nMaaf kamu akan dikeluarkan dari grup ini, byee!`)
    if (isAdmin) return m.reply('*Eh maaf kamu admin, kamu tidak akan di keluarkan. hehe..*')
    if (!isBotAdmin) return m.reply('*Bot bukan Admin, Bagaimana bisa mengeluarkan anggota kalau bukan Admin -_-*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*「 ANTI LINK 」*\n\nIni adalah link grup ini, bot tidak akan mengeluarkanmu.\nKarena itu adalah link grup ini')
    await conn.sendMessage(m.chat, { delete: m.key })
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


