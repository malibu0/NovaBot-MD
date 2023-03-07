let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('.... ')
  }
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
  try {
    console.log(val)
    let result = (new Function('return ' + val))()
    if (!result) throw result
    m.reply(`*${format}* = _${result}_`)
  } catch (e) {
    if (e == undefined) throw '🔸️𝙸𝚗𝚐𝚛𝚎𝚜𝚎 𝚕𝚊 𝚎𝚍𝚞𝚊𝚌𝚒𝚘𝚗\n\n𝚜𝚒𝚖𝚋𝚘𝚕𝚘𝚜 𝚌𝚘𝚖𝚙𝚊𝚝𝚒𝚋𝚕𝚎 -, +, *, /, ×, ÷, π, e, (, )'
    throw '𝙵𝚘𝚛𝚖𝚊𝚝𝚘 𝚒𝚗𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘, 𝚜𝚘𝚕𝚘 0-9 𝚢 𝚜𝚒𝚖𝚋𝚘𝚕𝚘 -, +, *, /, ×, ÷, π, e, (, ) 𝚚𝚞𝚎 𝚙𝚞𝚎𝚍𝚎𝚜 𝚞𝚜𝚊𝚛'
  }
}
handler.help = ['cal <ecuacion>']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calcular', 'calculadora'] 
handler.exp = 5
handler.register = true
export default handler
