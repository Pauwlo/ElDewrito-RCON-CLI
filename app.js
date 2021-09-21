require('dotenv').config()
const WebSocket = require('ws')

const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD

const ws = new WebSocket(`ws://${HOSTNAME}:${PORT}`, 'dew-rcon')

ws.onopen = () => { ws.send(PASSWORD) }
ws.onmessage = message => console.log(message.data)
ws.onerror = console.error
