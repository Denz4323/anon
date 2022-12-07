let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return

   let rega = /(ผิดุท้เึางืผิดุท้เึางื)/i
   let isVertexThai = rega.exec(m.text)
   if (isVertexThai && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }
   
   let regb = /(♚㜸ཽཽࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ͢͢㜺ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ㜸ཽཽཽ͢͢͢♚)/i
   let isVertexSymbol = regb.exec(m.text)
   if (isVertexThai && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }
   
   let regc = /(๒๒)/i
   let isVertexsThai= regc.exec(m.text)
   if (isVertexsThai && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }

   let regd = /(☛͜⧼🥊⃟✪.IՏᗩᒪ ᘔᘔ Oᒪᗪ.✪⧽͜💞͜✞‍️)/i
   let isVertexsThaia= regd.exec(m.text)
   if (isVertexsThaia && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }

   let rege = /(༒⃪᪼⃟```99999*```⛤༒⃢)/i
   let isVertexsThaib= rege.exec(m.text)
   if (isVertexsThaib && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }

   let regf = /(𝘿𝙤𝙬𝙣 𝙎𝙮𝙨𝙩𝙚𝙢⃢☙)/i
   let isVertexsThaic= regf.exec(m.text)
   if (isVertexsThaic && !m.fromMe) {
   conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
   }
   
   // tambahin sendiri code virus WhatsApp..
}

handler.botAdmin = true
handler.group = true
module.exports = handler
