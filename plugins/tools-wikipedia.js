import axios from 'axios'
import cheerio from 'cheerio'


let handler = async (m, { text }) => {
	if (!text) throw `🔴ɪɴɢʀᴇsᴇ ʟᴏ ǫᴜᴇ ǫᴜɪᴇʀᴇ ʙᴜsᴄᴀʀ ᴇɴ ᴡɪᴋɪᴘᴇᴅɪᴀ` 
	
    try {
	const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
	const $ = cheerio.load(link.data)
	let wik = $('#firstHeading').text().trim()
	let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
	m.reply(`╭━─━─━─≪ ᴡɪᴋɪᴘᴇᴅɪᴀ ≫─━─━─━╮
│● ʙᴜsᴄᴀᴅᴏ : ${wik}
│${resulw}
╰━─━─━─≪🔴≫─━─━─━╯`)
} catch (e) {
  m.reply('⚠️ ɴᴏ sᴇ ʜᴀɴ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ʀᴇsᴜʟᴛᴀᴅᴏs')
}
}
handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki','wikipedia'] 
handler.register = true

export default handler
