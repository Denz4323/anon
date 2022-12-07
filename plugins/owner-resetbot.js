let { spawn }  = require('child_process');
let handler  = async (m, { conn }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Bot berhasil direset ✅\ntunggu beberapa detik ⏱️')
    await global.db.write()
    process.send('reset')
  } else throw 'wait'
}
handler.help = ['resetbot' + (process.send ? '' : ' (Not working)')]
handler.tags = ['owner']
handler.command = /^resetbot$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler