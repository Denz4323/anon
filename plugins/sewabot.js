let handler = async m => m.reply(`Silahkan hubungi Owner untuk menyewa Bot ini..
`.trim())
handler.help = ['sewabot']
handler.tags = ['info']
handler.command = /^(sewabot)$/i

module.exports = handler