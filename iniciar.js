import { Telegraf, Scenes, session } from "telegraf"
import {wizardMilhas} from "./modules/cotacao.js"

const BOT_TOKEN = '5513566279:AAEJ8HgHsXwAvjSUHvJEoSmW2NcKjkZVLjg'
const bot = new Telegraf(BOT_TOKEN)
const Stage = Scenes.Stage

//COMANDO INICIAL BOT
bot.start(async ctx => {
    let mensagem = `Seja bem-vindo ${ctx.from.first_name}, meu nome é Josh🤖!

    No momento estou em fase de desenvolvimento. Peço que tenha paciência e reporte ao meu criador caso apresentar algum erro. 😉
    
    Sugestões de melhorias são sempre bem-vindas. 
    
    Este é o chat do meu criador 😁 -  (link do meu chat).
    
    💡 No momento tenho os seguintes comandos disponíveis:
    
    🔸 /cotar — Realizar cotação de milhas na HOTMILHAS
    
    Em breve mais novidades!`

    await ctx.reply(mensagem)
})

const stage = new Stage([wizardMilhas])
bot.use(session())
bot.use(stage.middleware())
bot.command('cotar', Stage.enter('cotacao'));
bot.launch()