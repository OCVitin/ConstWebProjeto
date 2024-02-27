const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7011088990:AAHL56XFN823kgipVlA9d5dX58ZUXI478K4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
function sendWelcomeMessage(chatId) {
    bot.sendMessage(
        chatId,
        'Bem-vindo! Escolha uma opção:\n\n' +
            '1. Fazer cadastro\n' +
            '2. Editar cadastro\n' +
            '3. Deletar cadastro'
    );
}

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Verifica se a mensagem é um comando
    if (msg.text && msg.text.startsWith('/')) {
        // Se for um comando, não faz nada por enquanto, mas você pode implementar lógicas adicionais aqui
        return;
    }

    // Envie a mensagem de boas-vindas se necessário
    if (msg.text === '/start') {
        sendWelcomeMessage(chatId);
        return;
    }

    // Lidar com a seleção de opções
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

// Lidar com erros
bot.on('polling_error', (error) => {
    console.log(error); // Registrar erro no console
});