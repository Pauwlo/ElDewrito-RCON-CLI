require('dotenv').config()
const WebSocket = require('ws')

const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD

const ws = new WebSocket(`ws://${HOSTNAME}:${PORT}`, 'dew-rcon')

function handleInitialMessage(message) {
	if (message.data !== 'accept') {
		console.log('Incorrect RCON password.')
		process.exit(1)
	}

	console.log(`Connected to ${HOSTNAME}:${PORT}!`)
	ws.onmessage = message => console.log(message.data)
}

ws.onopen = () => { ws.send(PASSWORD) }
ws.onmessage = handleInitialMessage
ws.onerror = console.error
