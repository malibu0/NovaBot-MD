import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.role, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
╭━─━─━─≪ *ɴɪᴠᴇʟ* ≫─━─━─━╮
│🔸ɴᴏᴍʙʀᴇ : *${name}*
│🔸ɴɪᴠᴇʟ : *${user.level}*
│🔸xᴘ : *${user.exp - min}/${xp}*
│🔸ʀᴀɴɢᴏ : *${user.role}*
╰━─━─━─≪🔆≫─━─━─━╯

ᴛᴇ ғᴀʟᴛᴀ *${max - user.exp}* ᴅᴇ *XP* ᴘᴀʀᴀ sᴜʙɪʀ ᴅᴇ ɴɪᴠᴇʟ
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `🎊 ғᴇʟɪᴄɪᴅᴀᴅᴇs ${conn.getName(m.sender)}  ʟʟᴇɢᴀsᴛᴇ ᴀ ᴜɴ ɴᴜᴇᴠᴏ ɴɪᴠᴇʟ:`
        let str = `
╭━─━─━─≪ *ʟᴇᴠᴇʟ ᴜᴘ* ≫─━─━─━╮
│🔸ɴɪᴠᴇʟ ᴀɴᴛᴇʀɪᴏʀ : *${before}*
│🔸ɴɪᴠᴇʟ ᴀᴄᴛᴜᴀʟ : *${user.level}*
│🔸Rango : *${user.role}*
╰━─━─━─≪🔆≫─━─━─━╯

*_ᴄᴜᴀɴᴛᴏ ᴍᴀs ɪɴᴛᴇʀᴀᴄᴛᴜᴇs ᴄᴏɴ ʟᴏs ʙᴏᴛs, ᴍᴀʏᴏʀ sᴇʀᴀ ᴛᴜ ɴɪᴠᴇʟ_*
`.trim()
        try {
            const img = await levelup(teks, user.level)
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['econ']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true

export default handler