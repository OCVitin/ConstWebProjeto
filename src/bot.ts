import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: String
        }
    }
}

interface Pessoa {
    nome: String,
    cpf: String,
    numero: Number,
}

const token = "YOUR_TELEGRAM_BOT_TOKEN";

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if(match){
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    }else{
        bot.sendMessage(chatId, "Ocorreu um erro na comunicação.")
    }
});

function sendWelcomeMessage(chatId: number) {
    bot.sendMessage(
        chatId,
        'Bem-vindo! Escolha uma opção:\n\n' +
            '1. Fazer cadastro\n' +
            '2. Editar cadastro\n' +
            '3. Deletar cadastro'
    );
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text && msg.text.startsWith('/')) {
        return;
    }

    if (msg.text === '/start') {
        sendWelcomeMessage(chatId);
        return;
    }

    switch (msg.text) {
        case '1':
            bot.sendMessage(chatId, 'Fazer cadastro.');
            sendWelcomeMessage(chatId);
            break;
        case '2':
            bot.sendMessage(chatId, 'Editar cadastro.');
            sendWelcomeMessage(chatId);
            break;
        case '3':
            bot.sendMessage(chatId, 'Deletar cadastro.');
            sendWelcomeMessage(chatId);
            break;
        default:
            bot.sendMessage(chatId, 'Opção inválida. Por favor, escolha uma opção válida.');
            sendWelcomeMessage(chatId);
    }
});

bot.on('polling_error', (error) => {
    console.log(error);
});