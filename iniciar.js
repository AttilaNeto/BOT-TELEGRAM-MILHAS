import { Telegraf, Markup, Scenes } from "telegraf"

BOT_TOKEN = ''
const bot = new Telegraf(BOT_TOKEN)
let totalVezesUsado = 0


//TECLADO BOT
const botoesProg = Markup.inlineKeyboard([
    Markup.button.callback ('🟧 SMILES', 'smiles'),
    Markup.button.callback('🟪 LATAM PASS', 'latam'),
    Markup.button.callback('🟦 T AZUL', 'azul')   
],{columns:3})

//COMANDOS TECLADO 
bot.action('smiles', ctx => {
    
    ctx.editMessageText(`✅ Programa escolhido: SMILES. 

Qual a quantidade de milhas para cotação ?
minimo 20mil | maximo 700 mil`)
    
})
bot.action('azul', ctx => {

    ctx.editMessageText(`✅ Programa escolhido: TUDO AZUL. 

Qual a quantidade de milhas para cotação ?
minimo 12mil | maximo 360mil`)
    
})
bot.action('latam', ctx => {

    ctx.editMessageText(`✅ Programa escolhido: LATAM PASS. 

Qual a quantidade de milhas para cotação ?
minimo 5mil | maximo 700mil`)
    
})


//COMANDOS INICIAL BOT
bot.start(async ctx =>{
    let mensagem = `Seja bem-vindo ${ctx.from.first_name}, meu nome é Josh🤖!

    No momento estou em fase de desenvolvimento. Peço que tenha paciência e reporte ao meu criador caso apresentar algum erro. 😉
    
    Sugestões de melhorias são sempre bem-vindas. 
    
    Este é o chat do meu criador 😁 -  (link do meu chat).
    
    💡 No momento tenho os seguintes comandos disponíveis:
    
    🔸 /cotar — Realizar cotação de milhas na HOTMILHAS
    
    Em breve mais novidades!`

    await ctx.reply(mensagem,botoesProg)
})


bot.command('cotar', (ctx) => ctx.reply('Cotação'))

bot.launch()