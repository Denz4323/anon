const fs = require('fs')
const remobg = require('remove.bg')
let handler = async (m, { conn, text, args,usedPrefix, command }) => {
if (!m.quoted) throw `Kirim/Reply Image Dengan Caption ${usedPrefix + command}`
if(!text) throw 'masukkan warna nya'
  let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
	    if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${usedPrefix + command}`
	    if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${usedPrefix + command}`
	    m.reply('Sedang diproses..')
	    let apirnobg = ['jhbA4XDVqg3iAtkLvEGZE1Uc','FHgytFnHCCdGu2p7LacHM12c','oTNPTmxMvLTK6RNLqBZW5Xph','7CZTX4TPaRJMqtsWvCknxPjr','kZBgT1RJog2VoDUNtWtwX5NA','N2E4cPPk9aSfvdnZCsZovK3J','CfokWte2G3MA8VhSbbVNFrcM','autPZ5MDDz8FiXHx48AXFt6w','eFLczbFsCP9TdzrHKkVQjsbj','H9cB4Xi6wTWUvFr4XMbLCnKb','kqAQdGcH41MPPb4NBXme7MVX','9cA8Di2SbZE625LTDKxNKgVk','KZsBhhSMfGkhVhi6quNHk61y','EEtwbupiFLDZuHqeFUDfZcyX','3fUasRGXzzQf9hiLqyJfXZVs','9DHMHnTjnVBC9sVMnEX3AvjY','YjTWziFkV1ttTHmKnwZHpvFi','RLUmMzmyUBUyLmsdLbPjjEaB','uVhRB1iiDqMHifx8Yzp89aHv','xvfUwmL4ep65pBUvkKvMEC75','D2pZpta1AaQ9GNYq6Z1gZNnT','gMRAeseciTiakfLA78mHTPC1','Drj6QAYjEKEowJT8FBWYREKk','swKk5tn1QJVeVwbFT16iYBXA','G87W68UcyhKvmFcTmg9by5FW','xnhu8uE2WcMg1MTNnC2C41n9','s39hWHhJ9751zQNWao3BLxDh','U8JuTym5bajbKZ7xVFwXFtiv','KMokWsYUpiG1ufuUmATpPy9H']
	    let randomapi = apirnobg[Math.floor(Math.random() * apirnobg.length)]
	    let hmm = await './src/remobg-'+getRandom('')
	    let localFile = await conn.downloadAndSaveMediaMessage(m.quoted, hmm)
	    let outputFile = await './src/hremo-'+getRandom('.png')
	    remobg.removeBackgroundFromImageFile({
	      path: localFile,
	      apiKey: randomapi,
	      size: "regular",
	      type: "auto",
	      scale: "100%",
	      bg_color : text,
	      outputFile 
	    }).then(async result => {
	   await conn.sendMessage(m.chat, {image: fs.readFileSync(outputFile), caption: "berhasil"}, {quoted:m})
	    await fs.unlinkSync(localFile)
	    await fs.unlinkSync(outputFile)
	    })
	}
handler.help = ["bg (color)"];
handler.tags = ["tools"];
handler.command = /^(bg|background)$/i


handler.limit = true
handler.group = false
module.exports = handler

 async function getRandom(ext){
    return `${Math.floor(Math.random() * 10000)}${ext}`
}