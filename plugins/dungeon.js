async function handler(m, { conn, usedPrefix, command, text }) {
    let user = global.db.data.users[m.sender]
    let SWORD = user.sword < 1
    let ARMOR = user.armor < 1
    let HEALTH = user.health < 90
    let prefix = usedPrefix
    if (SWORD || ARMOR || HEALTH) {
        const buttons = []

        console.log({SWORD, ARMOR, HEALTH})
        if (SWORD) buttons.push({buttonId: `${prefix}meracik sword`, buttonText: {displayText: 'Meracik Sword'}, type: 1})
        if (SWORD) buttons.push({buttonId: `${prefix}shop buy sword`, buttonText: {displayText: 'Beli Sword'}, type: 1})
        if (ARMOR) buttons.push({buttonId: `${prefix}shop buy armor`, buttonText: {displayText: 'Beli Armor'}, type: 1})
        if (HEALTH) buttons.push({buttonId: `${prefix}heal`, buttonText: {displayText: 'Healing'}, type: 1})
        
        let lmao = item(user.sword * 1, user.armor * 1, user.health * 1, usedPrefix)
        if (buttons.length == 0) return m.reply(lmao)   
        const buttonMessage = {
            text: lmao,
            footer: wm,
            buttons: buttons,
            headerType: 1
        }
        return conn.sendMessage(m.chat, buttonMessage, { quoted: m }) // nak durung menuhi syarat
    }
    global.dungeon = global.dungeon ? global.dungeon : {}
    if (Object.values(global.dungeon).find(room => room.id.startsWith('dungeon') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender))) return m.reply('Kamu masih di dalam Dungeon') // nek iseh neng njero dungeon
    let timing = (new Date - (user.lastdungeon * 1)) * 1
    if (timing < 600000) return m.reply(`Silahkan tunggu ${clockString(600000 - timing)} untuk bisa ke Dungeon`) // Cooldown
    let room = Object.values(global.dungeon).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    if (room) {

      // Biar simple :v
      let p1 = room.game.player1 || ''
      let p2 = room.game.player2 || ''
      let p3 = room.game.player3 || ''
      let p4 = room.game.player4 || ''
      let c1 = room.player1 || ''
      let c2 = room.player2 || ''
      let c3 = room.player3 || ''
      let c4 = room.player4 || ''

      if (!p2) {
        room.player2 = m.chat
        room.game.player2 = m.sender
      } else if (!p3) {
        room.player3 = m.chat
        room.game.player3 = m.sender
      } else if (!p4) {
        room.player4 = m.chat
        room.game.player4 = m.sender
        room.state = 'PLAYING'
      }
        
       const buttons = [
           {buttonId: 'Siap', buttonText: {displayText: 'Siap'}, type: 1}
       ]
        
        let lmao = `${!room.game.player4 ? `Menunggu ${!room.game.player3 && !room.game.player4 ? '2' : '1'} Partner lagi... ${room.name ? `mengetik command dibawah ini *${usedPrefix}${command} ${room.name}*` : ''}` : 'Semua partner telah lengkap...'}`
        const buttonMessage = {
            text: lmao,
            footer: wm,
            buttons: buttons,
            headerType: 1
        }
        conn.sendMessage(m.chat, buttonMessage, { quoted: m })
        
        if (room.game.player1 && room.game.player2 && room.game.player3 && room.game.player4) {

        // Hadiah ben do seneng :v
        room.price.money += (Math.floor(Math.random() * 1000001)) * 1
        room.price.exp += (Math.floor(Math.random() * 500001)) * 1
        room.price.iron += (pickRandom([0, 0, 0, 0, 1, 0, 0, 0])) * 1
        room.game.diamond += (pickRandom([0, 2, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 2, 0, 0])) * 1
        room.game.sampah += (Math.floor(Math.random() * 101)) * 1
        room.price.string += (Math.floor(Math.random() * 2)) * 1
        room.price.kayu += (Math.floor(Math.random() * 100)) * 1
        room.price.batu += (Math.floor(Math.random() * 10)) * 1
        room.game.makananPet += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0])) * 1
        room.game.common += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.game.uncommon += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1

        let str = `
Room ID: ${room.id}

${M(p1)}, ${M(p2)}, ${M(p3)} dan ${M(p4)}

Sedang berperang di dungeon...
`.trim()

        await m.reply(str, c1, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        })
        if (![c1, c3, c4].includes(c2)) m.reply(str, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str)
            }
        })
        if (![c1, c2, c4].includes(c3)) m.reply(str, c3, {
          contextInfo: {
              mentionedJid: conn.parseMention(str)
            }
        })
        if (![c1, c2, c3].includes(c4)) m.reply(str, c4, {
          contextInfo: {
              mentionedJid: conn.parseMention(str)
          }
        })

        setTimeout(async () => {
          let users = global.db.data.users[m.sender]
          let player  = [p1, p2, p3, p4]
          let { health, sword } = room.less
          let { exp, money, tiketcoin, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, makananPet } = room.price  
          let str2 = `
❤️kesehatan *${M(p1)}*, *${M(p2)}*, *${M(p3)}* dan *${M(p4)}* masing masing berkurang *-${health * 1}*, dan durability ⚔️Sword kalian masing masing berkurang *-${sword * 1}* karena kalian telah membunuh *${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing dan Semut', 'PP Mikey', 'Orang', 'Kecoa', 'Semut', 'Siput', '....🗿', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Tidak Ada', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])}* dan mendapatkan total
*✉️Exp:* ${exp * 4}
*💵Coin:* ${money * 4} Coin
*🎫Tiketcoin:* ${tiketcoin * 1}
*🗑️Sampah:* ${sampah  * 4}${potion == 0 ? '' : '\n*🧪Potion:* ' + potion * 4}${makananPet == 0 ? '' : '\n*🍖Makanan Pet* ' + makananPet * 4}${kayu == 0 ? '' : '\n*🪵Kayu:* ' + kayu * 4}${batu == 0 ? '' : '\n*🪨Batu:* ' + batu * 4}${string == 0 ? '' : '\n*🕸️String:* ' + string * 4}${iron == 0 ? '' : '\n*⛓️Iron:* ' + iron * 4}${diamond == 0 ? '' : '\n*💎diamond:* ' + diamond * 4}${common == 0 ? '' : '\n*📦common crate:* ' + common * 4}${uncommon == 0 ? '' : '\n*📦uncommon crate:* ' + uncommon * 4}
             `.trim()
          for (let i = 0; i < player.length; i++) {
            let p = player[i]
            setTimeout(() => {
              users[p].health -= health * 1
              users[p].sworddurability -= sword * 1
              users[p].money += money * 1
              users[p].exp += exp * 1
              users[p].tiketcoin += tiketcoin * 1
              users[p].sampah += sampah * 1
              users[p].potion += potion * 1
              users[p].diamond += diamond * 1
              users[p].iron += iron * 1
              users[p].kayu += kayu * 1
              users[p].batu += batu * 1
              users[p].string += string * 1
              users[p].common += common * 1
              users[p].uncommon += uncommon * 1
              users[p].mythic += mythic * 1
              users[p].legendary += legendary * 1
              users[p].pet += pet * 1
              users[p].makananpet += makananPet * 1
              users[p].lastdungeon = new Date * 1

              if ((users[p].health * 1) < 1) users[p].health = 0
              if ((users[p].sworddurability * 1) < 1) {
                users[p].sword -= 1
                users[p].sworddurability = (users[p].sword * 1) * 50
              }
            }, (i * 1) * 1500)
          }
            
          await m.reply(str2, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          })
          if (![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          })
          if (![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          })
          if (![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(st2)
            }
          })

          if (mythic > 0) {
            let str3 = 'Selamat ' + M(p1) + ', ' + M(p2) + ', ' + M(p3) + ' dan ' + M(p4) +' kalian mendapatkan item Rare Total *' + mythic * 4 + '* 📦Mythic Crate'
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          if (legendary > 0 || pet > 0) {
            let str3 = (mythic > 0 ? 'Dan juga' : 'Selamat ' + M(p1) + ', ' + M(p2) + ', ' + M(p3) + ' dan ' + M(p4) + ' kalian') + ' mendapatkan item Epic Total ' + (pet > 0 && legendary > 0 ? `*${legendary * 4}* 🎁Legendary Crate dan *${pet * 4}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet * 4}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary * 4}* 🎁Legendary Crate` : '')
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          // Biar lebih simple
          let _1 = users[p1]
          let _2 = users[p2]
          let _3 = users[p3]
          let _4 = users[p4]
          let _H1 = (_1.health * 1)
          let _H2 = (_2.health * 1)
          let _H3 = (_3.health * 1)
          let _H4 = (_4.health * 1)

          // sd = SwordDurability :v
          let _sd1 = (_1.sworddurability * 1)
          let _sd2 = (_2.sworddurability * 1)
          let _sd3 = (_3.sworddurability * 1)
          let _sd4 = (_4.sworddurability * 1)

          //Peringatan kalau health nya 0 ataupun sword durabilitynya 0
          if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

            //Sama kek atas biar simple aja :v 
            let s1 = (_sd1 * 1) < 1
            let s2 = (_sd2 * 1) < 1
            let s3 = (_sd3 * 1) < 1
            let s4 = (_sd4 * 1) < 1

            //Buat nyimpen data sementara :v
            let HEALTH = [], SDH = [], SDM1L = []
            for (let siapa in player) {
              if ((users[siapa].health * 1) < 1) HEALTH.push(siapa)
              if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
              if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
            }

            let sI = data(SDH)
            let sH = data(SDM1L)
            let H = data(HEALTH)

            let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, silahkan meracik ⚔️Sword kembali dengan mengetik *' + usedPrefix + 'meracik sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ' : '') + sH + ' Hancur, dan Menurun *1* Level' : ''))}` : ''}${HEALTH || HEALTH.length > 0 ? `❤️Kesehatan ${H} habis, silahkan pulihkan ❤️Kesehatanmu dengan mengetik ${usedPrefix}heal` : ''}`
            await m.reply(str3, c1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            })
          }

          //Hapus annunya biar bisa main dungeon lagi :V
          delete global.dungeon[room.id]

        }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
        if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id] //Pastiin lagi kalau masih ada bakal ilang :v
      }
    } else {
        room = {
            id: 'dungeon-' + (+ new Date),
            player1: m.chat,
            player2: '',
            player3: '',
            player4: '',
            state: 'WAITING',
            game: {
                player1: m.sender,
                player2: '',
                player3: '',
                player4: '',
            },
            price: {
                money: (Math.floor(Math.random() * 500001)) * 1,
                exp: (Math.floor(Math.random() * 100001)) * 1,
                sampah: (Math.floor(Math.random() * 201)) * 1,
                potion: (Math.floor(Math.random() * 2)) * 1,
                diamond: (pickRandom([0, 0, 0, 0, 1, 0, 0])) * 1,
                iron: (Math.floor(Math.random() * 2)) * 1,
                kayu: (Math.floor(Math.random() * 100)) * 1,
                batu: (Math.floor(Math.random() * 2)) * 1,
                string: (Math.floor(Math.random() * 2)) * 1,
                common: (pickRandom([0, 0, 0, 1, 0, 0])) * 1,
                uncommon: (pickRandom([0, 0, 0, 1, 0, 0, 0])) * 1,
                mythic: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0])) * 1,
                legendary: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0])) * 1,
                pet: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1,
                tiketcoin: (pickRandom([0, 0, 2, 0, 0, 1, 0, 0, 0, 0])) * 1,
                makananPet: (pickRandom([0, 0, 0, 1, 0, 0, 0, 0])) * 1,
            },
            less: {
                health: (Math.floor(Math.random() * 101)) * 1,
                sword: (Math.floor(Math.random() * 50)) * 1,
            }
        }
        if (text) room.name = text
        const buttons = [
            {buttonId: 'sendiri', buttonText: {displayText: 'sendiri'}, type: 1}
        ]
        
        let lmao = 'Menunggu partner ' + (text ? `mengetik command dibawah ini
${usedPrefix}${command} ${text}` : '') + '\natau ketik *sendiri* untuk bermain sendiri'
        const buttonMessage = {
            text: lmao,
            footer: wm,
            buttons: buttons,
            headerType: 1
        }
        conn.sendMessage(m.chat, buttonMessage, { quoted: m })
        global.dungeon[room.id] = room
      }
}

handler.before = function (m) {
  global.dungeon = global.dungeon ? global.dungeon : {}
  let room = Object.values(global.dungeon).find(room => room.id.startsWith('dungeon-') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender) && room.state == 'WAITING')
  if (room) {

    let p1 = room.game.player1 || ''
    let p2 = room.game.player2 || ''
    let p3 = room.game.player3 || ''
    let p4 = room.game.player4 || ''
    let c1 = room.player1 || ''
    let c2 = room.player2 || ''
    let c3 = room.player3 || ''
    let c4 = room.player4 || '' 

    let PLAYER = [room.game.player1]
    if (room.game.player2) PLAYER.push(room.game.player2)
    if (room.game.player3) PLAYER.push(room.game.player3)
    if (room.game.player4) PLAYER.push(room.game.player4)
    let P = data(PLAYER)
    if (/^(sendiri|dewean|solo)$/i.test(m.text.toLowerCase())) {
        const buttons = [
            {buttonId: 'Siap', buttonText: {displayText: 'Siap'}, type: 1}
        ]
        
        let lmao = 'Kamu tidak bisa bermain sendiri karena memiliki partner. Silahkan ketik *siap* untuk bermain dengan partner lainnya...'
        const buttonMessage = {
          text: lmao,
          footer: wm,
          buttons: buttons,
          headerType: 1
      }
  
      if (room.player2 || room.player3 || room.player4) return this.sendMessage(m.chat, buttonMessage, { quoted: m })
      room.state = 'PLAYING'
      let str = `
Room ID: ${room.id}

${P}

Sedang berperang di dungeon...
`.trim()
      m.reply(str, room.player1, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })

      setTimeout(async () => {
        let users = global.db.data.users[p1]
        let { health, sword } = room.less
        let { exp, money, tiketcoin, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, makananPet } = room.price  
        let str2 = `
❤️Kesehatanmu berkurang -${health * 1}, dan durability ⚔️Sword Kamu -${sword * 1} karena kamu telah Membunuh ${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing dan Semut', 'PP Mikey', 'Orang', 'Kecoa', 'Semut', 'Siput', '....🗿', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Tidak Ada', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])} dan mendapatkan
*✉️Exp:* ${exp}
*💵Coin:* ${money} Coin
*🎫Tiketcoin:* ${tiketcoin * 1}
*🗑️sampah:* ${sampah}${potion == 0 ? '' : '\n*🥤Potion:* ' + potion}${makananPet == 0 ? '' : '\n*🍖Makanan Pet* ' + makananPet * 1}${kayu == 0 ? '' : '\n*🪵Kayu:* ' + kayu}${batu == 0 ? '' : '\n*🪨Batu:* ' + batu}${string == 0 ? '' : '\n*🕸️String:* ' + string}${iron == 0 ? '' : '\n*⛓️Iron:* ' + iron}${diamond == 0 ? '' : '\n*💎diamond:* ' + diamond}${common == 0 ? '' : '\n*📦common crate:* ' + common}${uncommon == 0 ? '' : '\n*📦uncommon crate:* ' + uncommon}
`.trim()
        users.health -= health * 1
        users.sworddurability -= sword * 1
        users.money += money * 1
        users.exp += exp * 1
        users.tiketcoin += tiketcoin * 1
        users.sampah += sampah * 1
        users.potion += potion * 1
        users.diamond += diamond * 1
        users.iron += iron * 1
        users.kayu += kayu * 1
        users.batu += batu * 1
        users.string += string * 1
        users.common += common * 1
        users.uncommon += uncommon * 1
        users.mythic += mythic * 1
        users.legendary += legendary * 1
        users.pet += pet * 1
        users.makananpet += makananPet * 1
        users.lastdungeon = new Date * 1
        await m.reply(str2, room.player1)
        if (mythic > 0) {
          let str3 = 'Selamat Kamu Mendapatkan item Rare yaitu *' + mythic + '* 📦Mythic Crate'
          m.reply(str3, room.player1)
        }
        if (legendary > 0 || pet > 0) {
          let str3 = (mythic > 0 ? 'Dan juga' : 'Selamat Kamu') + ' mendapatkan item Epic yaitu ' + (pet > 0 && legendary > 0 ? `*${legendary}* 🎁Legendary Crate dan *${pet}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary}* 🎁Legendary Crate` : '')
          m.reply(str3, room.player1)
        }
        if ((users.health * 1) < 1 || (users.sworddurability * 1) < 1) {
          let sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) == 1
          let _sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 1
          let __sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 0
          let health1 = (users.health * 1) < 1
          if (__sword1) {
            users[p1].sword -= 1
            users[p1].sworddurability = 0
          }
          let str3 = `${__sword1 ? `⚔️Sword Kamu ${_sword1 ? ` Level nya berkurang 1 karena hancur` : ` Hancur, dan silahkan meracik ⚔️Sword kembali dengan mengetik ${usedPrefix}`}meracik sword` : ''} ${health1 ? `${__sword1 ? 'Dan ' : ''}❤️Kesehatanmu habis, silahkan gunakan potion ketik ${usedPrefix}heal` : ''}`
          m.reply(str3, room.player1, {
            contextInfo: {
              mentionedJid: this.parseMention(str3)
            }
          })
        }
        delete global.dungeon[room.id]
      }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
      if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id]

    } else if (/^(siap?.?.?.?|mulai|los?s?s?.?.?.?)$/i.test(m.text.toLowerCase())) {
        let str = `
Room ID: ${room.id}

${P}

Sedang berperang di dungeon...
`.trim()
      m.reply(str, c1, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str, c2, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str, c3, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
      if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str, c4, {
        contextInfo: {
          mentionedJid: this.parseMention(str)
        }
      })
        
      for (let _p of PLAYER) {
        room.price.money += (Math.floor(Math.random() * 500001)) * 1
        room.price.exp += (Math.floor(Math.random() * 100001)) * 1
        room.game.sampah += (Math.floor(Math.random() * 16)) * 1
        room.price.string += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.price.kayu += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.price.batu += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
        room.game.common += (pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
      }

      let users = global.db.data.users[m.sender]
      let orang = PLAYER.length
      let { health, sword } = room.less
      let { exp, money, tiketcoin, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, makananPet } = room.price

      setTimeout(async () => {
        let str2 =`
❤️Kesehatan ${P} masing masing berkurang *-${health * 1}*, dan durability ⚔️Sword kalian masing masing berkurang *-${sword * 1}* karena kalian telah membunuh *${pickRandom(['Ender Dragon', 'Baby Dragon', 'Titan', 'Cacing dan Semut', 'PP Mikey', 'Orang', 'Kecoa', 'Semut', 'Siput', '....🗿', 'Wither', 'Sekeleton', 'Ayam Emas', 'Temenmu', 'Sapi', 'Tidak Ada', 'Creeper', 'Zombie', 'Hewan Pelihraanmu','Diri Sendiri'])}* dan mendapatkan total
*✉️exp:* ${exp * orang}
*💵Coin:* ${money * orang} Coin
*🎫tiketcoin:* ${tiketcoin * 1}
*🗑️sampah:* ${sampah  * orang}${potion == 0 ? '' : '\n*🥤Potion:* ' + potion * orang}${makananPet == 0 ? '' : '\n*🍖Makanan Pet* ' + makananPet * orang}${kayu == 0 ? '' : '\n*🪵Kayu:* ' + kayu * orang}${batu == 0 ? '' : '\n*🪨Batu:* ' + batu * orang}${string == 0 ? '' : '\n*🕸️String:* ' + string * orang}${iron == 0 ? '' : '\n*⛓️Iron:* ' + iron * orang}${diamond == 0 ? '' : '\n*💎diamond:* ' + diamond * orang}${common == 0 ? '' : '\n*📦common crate:* ' + common * orang}${uncommon == 0 ? '' : '\n*📦uncommon crate:* ' + uncommon * orang}
`.trim()
        await m.reply(str2, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str2)
          }
        })
      }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
      for (let i = 0; i < PLAYER.length; i++) {
        let p = PLAYER[i]
        setTimeout(() => {
          users[p].health -= health * 1
          users[p].sworddurability -= sword * 1
          users[p].money += money * 1
          users[p].exp += exp * 1
          users[p].tiketcoin += tiketcoin * 1
          users[p].sampah += sampah * 1
          users[p].potion += potion * 1
          users[p].diamond += diamond * 1
          users[p].iron += iron * 1
          users[p].kayu += kayu * 1
          users[p].batu += batu * 1
          users[p].string += string * 1
          users[p].common += common * 1
          users[p].uncommon += uncommon * 1
          users[p].mythic += mythic * 1
          users[p].legendary += legendary * 1
          users[p].pet += pet * 1
          users[p].makananpet += makananPet * 1
          users[p].lastdungeon = new Date * 1

          if ((users[p].health * 1) < 1) users[p].health = 0
          if ((users[p].sworddurability * 1) < 1) {
            users[p].sword -= 1
            users[p].sworddurability = (users[p].sword * 1) * 50
          }
        }, i * 1500)
      }

      // Nak entok item Rare
      if (mythic > 0) {
        let str3 = 'Selamat ' + P + ' kalian mendapatkan item Rare Total *' + mythic * orang + '* 📦Mythic Crate'
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }

      // Nak entok item Epic
      if (legendary > 0 || pet > 0) {
        let str3 = (mythic > 0 ? 'Dan juga' : 'Selamat ' + P + ' kalian') + ' mendapatkan item Epic Total ' + (pet > 0 && legendary > 0 ? `*${legendary * orang}* 🎁Legendary Crate dan *${pet * orang}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet * orang}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary * orang}* 🎁Legendary Crate` : '')
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }

      // Biar lebih simple
      let _1 = users && p1 && users[p1] ? users[p1] : {}
      let _2 = users && p2 && users[p2] ? users[p2] : {}
      let _3 = users && p3 && users[p3] ? users[p3] : {}
      let _4 = users && p4 && users[p4] ? users[p4] : {}
      let _H1 = _1 && _1.health ? (_1.health * 1) : 100
      let _H2 = _2 && _2.health ? (_2.health * 1) : 100
      let _H3 = _3 && _3.health ? (_3.health * 1) : 100
      let _H4 = _4 && _4.health ? (_4.health * 1) : 100

      // sd = SwordDurability :v
      let _sd1 = _1 && _1.sworddurability ? (_1.sworddurability * 1) : 100
      let _sd2 = _2 && _2.sworddurability ? (_2.sworddurability * 1) : 100
      let _sd3 = _3 && _3.sworddurability ? (_3.sworddurability * 1) : 100
      let _sd4 = _4 && _4.sworddurability ? (_4.sworddurability * 1) : 100

      //Peringatan kalau health nya 0 ataupun sword durabilitynya 0
      if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

        //Sama kek atas biar simple aja :v 
        let s1 = _sd1 ? (_sd1 * 1) < 1 : false
        let s2 = _sd2 ? (_sd2 * 1) < 1 : false
        let s3 = _sd3 ? (_sd3 * 1) < 1 : false
        let s4 = _sd4 ? (_sd4 * 1) < 1 : false

        //Buat nyimpen data sementara :v
        let HEALTH = [], SDH = [], SDM1L = []
        for (let siapa in PLAYER) {
          if ((users[siapa].health * 1) < 1) HEALTH.push(siapa)
          if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
          if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
        }

        // Convert Array to String
        let sI = data(SDH)
        let sH = data(SDM1L)
        let H = data(HEALTH)

        let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, silahkan meracik ⚔️Sword kembali dengan mengetik *' + usedPrefix + 'meracik sword*' : '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ' : '') + sH + ' Hancur, dan Menurun *1* Level' : ''))}` : ''}${HEALTH || HEALTH.length > 0 ? `❤️Kesehatan ${H} habis, silahkan pulihkan ❤️kesehatanmu dengan mengetik ${usedPrefix}heal` : ''}`
        m.reply(str3, c1, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
        if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
          contextInfo: {
            mentionedJid: this.parseMention(str3)
          }
        })
      }
      delete global.dungeon[room.id]
    } 
    if (global.dungeon && room.state == 'PLAYING') delete global.dungeon[room.id] // Hapuss nek iseh ono neng dungeon
  }

  return 
}

handler.help = ['dungeon'].map(v => v + ' [nama room]')
handler.tags = ['game']
handler.command = /^(du?n?g?e?o?n?)$/i

handler.mods = false
handler.group = false
module.exports = handler

/**
 * pickRandom from array
 * @param {Array} list 
 * @returns *
 */
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

/**
 * Message if the conditions are not met
 * @param {Number} sword 
 * @param {Number} armor 
 * @param {Number} health 
 * @param {String} usedPrefix 
 * @returns String
 */
function item(sword, armor, health, usedPrefix) {
  let sw = (sword * 1) < 1
  let a = (armor * 1) < 1
  let h = (health * 1) < 90
  let str = `
${sw ? 'Kamu belum memiliki ⚔️Sword' : ''}${sw && a && h ? ',' : sw && a ? ' dan ' : ''} ${a ? '🛡️Armor' : ''}${sw && a && h ? ' dan Minimal 90 ❤Health' : h ? 'Minimal 90 ❤Health' : ''}${sw ? `\n\nUntuk mendapatkan ⚔Sword ketik *${usedPrefix}meracik sword* atau *${usedPrefix}shop buy sword*` : ''}${a ? `\n\nUntuk mendapatkan 🛡️Armor ketik *${usedPrefix}shop buy armor*` : ''}${h ? `\n\nUntuk menambah ❤Kesehatanmu ketik *${usedPrefix}heal*` : ''}
  `.trim()
  return str
}

/**
 * To split jid
 * @param {String} jid 
 * @returns String
 */
function M(jid) {
  return '@' + jid.split('@')[0]
}

/**
 * To clock
 * @param {Number} ms 
 * @returns String
 */
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

/**
 * Get data in Array
 * @param {Array} DATA ( avaible array length is 4)
 * @returns String
 */
function data(DATA) {
  let panjang = DATA.length * 1
  let msg = ''
  DATA.forEach(player => {
    if (panjang == 1) msg += `*${M(player)}*` 
    else {
      if (DATA.indexOf(player) !== (panjang - 1)) msg += `*${M(player)}*, ` 
      else msg += `dan *${M(player)}*`
    }
  })
  return msg
}