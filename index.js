const { makeWASocket, useMultiFileAuthState, } = require('@whiskeysockets/baileys')
const pino = require('pino')

ansync function connectWhatsapp() {
    const auth = await useMultiFileAuthState("sessions");
    const socket = makeWASocket({
        printQRInTerminal: true,
        browser: [ "QinaaBot","","" ],
        auth: auth.state,
        logger: pino({ level: "silent"}),
    });

    socket.ev.on("creds.update", auth.saveCreds);
    socket.ev.on("connection.update", async ({ connection }) => {
        if (connection === "open") {
            console.log(" BOT READY");
        } else if (connection === "close") {
            await connectWhatsapp();
    )}
