require('dotenv').config()
const readline = require('readline')
const WebSocket = require('ws')

const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
const SHOULD_LOG_CHAT = process.env.ENABLE_CHAT_LOGGING === 'true'

const ws = new WebSocket(`ws://${HOSTNAME}:${PORT}`, 'dew-rcon')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let shouldIgnoreNextMessage = false

function readInput() {
	rl.question('> ', input => {
		ws.send(input)
	})
}

function handleInitialMessage(message) {
	if (message.data !== 'accept') {
		console.log('Incorrect RCON password.')
		process.exit(1)
	}

	console.log(`Connected to ${HOSTNAME}:${PORT}!`)

	shouldIgnoreNextMessage = true
	const sendChatToRconClients = SHOULD_LOG_CHAT ? 1 : 0
	ws.send(`Server.SendChatToRconClients ${sendChatToRconClients}`)

	ws.onmessage = handleMessage
	readInput()
}

function handleMessage(message) {
	if (shouldIgnoreNextMessage) {
		shouldIgnoreNextMessage = false
		return
	}

	message = message.data.trim()

	if (message.length === 0) {
		readInput()
		return
	}

	process.stdout.cursorTo(0)
	console.log(message)

	readInput()
}

ws.onopen = () => { ws.send(PASSWORD) }
ws.onmessage = handleInitialMessage
ws.onerror = console.error
