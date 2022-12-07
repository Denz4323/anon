const axios = require('axios')
const cheerio = require('cheerio')

let handler = async (m, { text,usedPrefix,command }) => {
  if (!text) return m.reply('Cari apa?\nmisal\n'+usedPrefix+command+' coc')
var a = await happymodSearch(text)
var b = a.map((v, i) => `_*DATA KE ${i + 1}*_\n\n*📜 Title:* ${v.title}\n*⭐ Rating :* ${v.rating}\n*🌐 Link:* ${v.link}`).join('\n\n*_===================================_*\n\n')
  m.reply(b)
}
handler.help = ['happymod [text]']
handler.tags = ['internet']
handler.command = /^happymod$/i
handler.limit = true
handler.group = false
module.exports = handler

const baseUrl = 'https://www.happymod.com/'

function happymodSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get(baseUrl+'search.html?q='+query).then(async res => {
		var $ = cheerio.load(res.data)
		const hasil = []
		$("div.pdt-app-box").each(function(c, d) {
			var title = $(d).find("a").text().trim();
			var icon = $(d).find("img.lazy").attr('data-original');
			var rating = $(d).find("span").text();
			var link = baseUrl+$(d).find("a").attr('href');
			hasil.push({
				title,
				icon,
				link,
				rating
			})
	})
		resolve(hasil)
		console.log(hasil)
	}).catch(reject)
})
}