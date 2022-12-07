let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|secret|Halo.`
    let [jid, name, pesan] = text.split('|')
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|secret|Halo.`
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let data = (await conn.onWhatsApp(jid))[0] || {}
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.'
    if (jid == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan Menfess nih.\n\nDari: *${name}*\n\nPesan: \n${pesan}\n\nMau balas pesan ini kak?\nKakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim()
        await conn.sendButton(data.jid, txt, author, null, [['Balas Pesan', '_menfess']], null, { mentions: conn.parseMention(txt) })
        .then(() => {
            m.reply('Berhasil mengirim pesan menfess.')
            conn.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        throw e 
    }
}


handler.tags = ['anonymous']
handler.help = ['menfess'].map(v => v + ' <nomor|nama pengirim|pesan>')
handler.command = /^(menfess|mf|confess|cf)$/i
handler.private = true

module.exports = handler

/*let handler = async(m, { conn, text, usedPrefix }) => {
let [number, pesan] = text.split `|`

    if (!number) return conn.reply(m.chat, 'Maaf Format Anda Salah\n\nContoh:\n.menfess 62××××|hallo sayang', m)
    if (!pesan) return conn.reply(m.chat, 'Maaf Format Anda Salah\n\nContoh:\n.menfess 62××××|hallo sayang', m)
    if (text > 500) return conn.reply(m.chat, 'Teks Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `Hi Saya Bot Ada Yang Kirim Pesan Ke Kamu
Seseorang Temanmu
(Pengirim Rahasia)
⬡──⬡─────────⬡──⬡
📫Pengirim : Someone

💌 Pesan : ${pesan}
⬡──⬡─────────⬡──⬡
Maaf Anda Belum Bisa Membalas ke Pengirim

------------------------------------------

▮PENGIRIM RAHASIA 」 
Anda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/
mantan?, tapi Tidak ingin tau siapa Pengirimnya?
Kamu bisa menggunakan Bot ini
Contoh Penggunaan: .menfess nomor|pesan untuknya
Contoh: .menfess 628xxxxxxxxxx|hai owner`

    conn.reply(korban + '@s.whatsapp.net', spam1, m)

    let logs = `Sukses Mengirim Pesan
👥 Dari : wa.me/${nomor.split("@s.whatsapp.net")[0]}
⬡──⬡─────────⬡──⬡
💌 Isi Pesan : ${pesan}
⬡──⬡─────────⬡──⬡`

    conn.reply(m.chat, logs, m)
}
handler.help = ['menfess nomor|pesan']
handler.tags = ['nocategory']

handler.command = /^(menfess|confess|menfes|confes)$/i

handler.private = true
module.exports = handler*/
