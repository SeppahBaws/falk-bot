# How to run the bot

Important: make sure to enable the "message content intent" in your bot's privileged gateway intents.

prerequisites:
- [nodejs](https://nodejs.org/en/)

Once node is installed, make sure you both have node and npm:

```
node -v
npm -v
```

Then run the following command in this directory:

```
npm install
```

This will install all the required dependencies.

After that's done, you can start the bot by invoking the following command:

```
node index.js
```

If you have the `config.json` set up correctly, the bot should now be working fine. A message will be logged to the console communicating that the bot has successfully logged in.
