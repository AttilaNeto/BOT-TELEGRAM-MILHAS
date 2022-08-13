import { Markup, Scenes, Composer } from "telegraf"
import { CalcularMilhas } from "./calcular.js"

const WizardScene = Scenes.WizardScene
var totalVezesUsado = 0

//TECLADO BOT
const botoesProg = Markup.inlineKeyboard([
    Markup.button.callback('🟧 SMILES', 'smiles'),
    Markup.button.callback('🟪 LATAM PASS', 'latam'),
    Markup.button.callback('🟦 T AZUL', 'azul'),
    Markup.button.callback('SAIR','sair')
], { columns: 3 })

const botaoSair = Markup.inlineKeyboard([
    Markup.button.callback('SAIR','sair')
])

//CENA ESCOLHER PROGRAMA
const escolherPrograma = new Composer()
escolherPrograma.hears(/smile/i, ctx =>{
    ctx.session.programa = 1
    ctx.editMessageText(`✅ Programa escolhido: SMILES. 

Qual a quantidade de milhas para cotação ?
minimo 20mil | maximo 700 mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.hears(/latam/i, ctx =>{
    ctx.session.programa = 2
    ctx.editMessageText(`✅ Programa escolhido: LATAM PASS. 

Qual a quantidade de milhas para cotação ?
minimo 5mil | maximo 700mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.hears(/azul/i, ctx =>{
    ctx.session.programa = 3
    ctx.editMessageText(`✅ Programa escolhido: TUDO AZUL. 

Qual a quantidade de milhas para cotação ?
minimo 12mil | maximo 360mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.action('smiles', ctx => {
    ctx.session.programa = 1
    
    ctx.editMessageText(`✅ Programa escolhido: SMILES. 

Qual a quantidade de milhas para cotação ?
minimo 20mil | maximo 700 mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.action('azul', ctx => {
    ctx.session.programa = 3
    ctx.editMessageText(`✅ Programa escolhido: TUDO AZUL. 

Qual a quantidade de milhas para cotação ?
minimo 12mil | maximo 360mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.action('latam', ctx => {
    ctx.session.programa = 2
    ctx.editMessageText(`✅ Programa escolhido: LATAM PASS. 

Qual a quantidade de milhas para cotação ?
minimo 5mil | maximo 700mil`,botaoSair)
    ctx.wizard.next()
})
escolherPrograma.use(ctx => ctx.reply('Programa não encontrado.',botoesProg))

//CENA QUANTIDADE MILHAS
const quantidadeMilhas = new Composer()
quantidadeMilhas.hears(/(\d+)/, ctx => {
    ctx.session.totalMilhas = ctx.match[1]
    if (ctx.session.programa==1 && ctx.session.totalMilhas < 20000){
        ctx.reply('Numero de milhas muito baixo. O minimo é 20 mil milhas SMILES para realizar a cotação. Digite novamente.')
    }else if (ctx.session.programa==1 && ctx.session.totalMilhas > 700000){
        ctx.reply('Numero de milhas muito alto. O maximo é 700 mil milhas SMILES para realizar a cotação. Digite novamente.')
    }else if (ctx.session.programa==2 && ctx.session.totalMilhas < 5000){
        ctx.reply('Numero de milhas muito baixo. O minimo é 5 mil milhas LATAM PASS para realizar a cotação. Digite novamente.')
    }else if (ctx.session.programa==2 && ctx.session.totalMilhas > 700000){
        ctx.reply('Numero de milhas muito alto. O maximo é 700 mil milhas LATAM PASS para realizar a cotação. Digite novamente.')
    }else if (ctx.session.programa==3 && ctx.session.totalMilhas < 12000){
        ctx.reply('Numero de milhas muito baixo. O minimo é 12 mil milhas TUDO AZUL para realizar a cotação. Digite novamente.')
    }else if (ctx.session.programa==2 && ctx.session.totalMilhas > 360000){
        ctx.reply('Numero de milhas muito alto. O maximo é 360 mil milhas TUDO AZUL para realizar a cotação. Digite novamente.')
    }else{ 
        ctx.session.cotacao =  CalcularMilhas(ctx.session.totalMilhas,ctx.session.programa)
        ctx.reply(`
🌍   COTAÇÃO MILHAS   🌍

🔰 ${ctx.session.cotacao.milha} MIL  - ${ctx.session.cotacao.progm} 🔰

💰 RECEBIMENTO EM:
▫️ 01 DIA     -   R$ ${ctx.session.cotacao.dia01}
▫️ 30 DIAS  -   R$ ${ctx.session.cotacao.dia30}
▫️ 45 DIAS  -   R$ ${ctx.session.cotacao.dia45}
▫️ 60 DIAS  -   R$ ${ctx.session.cotacao.dia60}

Cotação finalizada.​
        
        `)
        totalVezesUsado += 1
        console.log(totalVezesUsado)
        ctx.scene.leave()
    }
    
})
quantidadeMilhas.use(ctx => ctx.reply('Apenas números são aceitos...'))

//CRIANDO WIZARDSCENE
export const wizardMilhas = new WizardScene('cotacao',
    ctx => {
        ctx.reply(`
        Qual programa de milhas deseja fazer a cotação ?`, botoesProg)
        ctx.wizard.next()
    },
    escolherPrograma,
    quantidadeMilhas
)
wizardMilhas.leave(ctx => ctx.reply(`Volte Sempre! 🦾🤖`))
wizardMilhas.action('sair', ctx => ctx.scene.leave())