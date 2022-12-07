const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()

let handler = async (m, { conn, text, command, usedPrefix }) => {
if (!text) throw `Example :\n${usedPrefix + command} 628123456789`
let nomor = text.replace(/[^0-9]/gi, '').slice(2)
if (!nomor.startsWith('8')) throw `Contoh Penggunaan\n${usedPrefix + command} 628123456789`
let anu = await primbon.nomer_hoki(nomor)
let teks = `\`\`\`NOMOR HOKI\`\`\`

*Nomor HP :* 0${anu.message.nomer_hp}
*Angka Shuzi :* ${anu.message.angka_shuzi}

*Energi Positif :*
Kekayaan : ${anu.message.energi_positif.kekayaan}
Kesehatan : ${anu.message.energi_positif.kesehatan}
Cinta : ${anu.message.energi_positif.cinta}
Kestabilan : ${anu.message.energi_positif.kestabilan}
Persentase : ${anu.message.energi_positif.persentase}

*Energi Negatif :*
Perselisihan : ${anu.message.energi_negatif.perselisihan}
Kehilangan : ${anu.message.energi_negatif.kehilangan}
Malapetaka : ${anu.message.energi_negatif.malapetaka}
Kehancuran : ${anu.message.energi_negatif.kehancuran}
Persentase : ${anu.message.energi_negatif.persentase}
`.trim()
conn.reply(m.chat, teks, m)

}
handler.help = ['nomorhoki']
handler.tags = ['fun']
handler.command = /^nomorhoki$/i

handler.limit = true

module.exports = handler