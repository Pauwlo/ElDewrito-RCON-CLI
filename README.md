# RCON CLI for ElDewrito

A simple RCON client command-line interface for ElDewrito servers.

## Installation

0. Install Node.js
1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file: `cp .env.example .env`
4. Run with `node app.js`.

## Arguments

| Parameter    | Shortcut | Description                                    |
| ------------ | -------- | ---------------------------------------------- |
| `--hostname` | -s       | Set the server hostname to connect to.         |
| `--port`     | -p       | Set the RCON port.                             |
| `--password` | -P       | Set the RCON password.                         |
| `--commands` | -c       | Run commands on connect then exit (no output). |

These parameters will override values defined in `.env`.

### Examples

Connect to `localhost:11776` with password `myRconPassword`:

```bash
node app.js -P 'myRconPassword'
```

Connect to `12.34.56.78:1337` with password `myRconPassword`:

```bash
node app.js --hostname 12.34.56.78 --port 1337 -P 'myRconPassword' # or:
node app.js -h 12.34.56.78 -p 1337 -P 'myRconPassword'
```

Connect to server (with password specified in .env file):

```bash
node app.js
```

Connect to server, say "Hello world!" in chat and exit (with password defined in .env file)

```bash
node app.js --commands 'Server.Say Hello world!' # or:
node app.js -c 'Server.Say Hello world!'
```

*Known issue: Parsing multi-parameter commands doesn't work really well yet.*
