import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import fs from "fs";
import { commandsCode } from "./deploy-commands";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand()) {
            const { commandName } = interaction;

            for (const command of commandsCode) {
                if (commandName === command.name) {
                    command.execute(interaction);
                    break;
                }
            }
        } else if (interaction.isButton()) {
            const { customId } = interaction;
            for (let i = 0; i < fs.readdirSync("./src/events").length; i++) {
                const eventFile: string = fs.readdirSync("./src/events")[i];

                if (
                    `${customId}.ts` === eventFile ||
                    `${customId}.js` === eventFile
                ) {
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
                    const { execute } = require(`./events/${eventFile}`);
                    execute(interaction);
                }
            }
        }
    });
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);