import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { commandsCode } from "./deploy-commands";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const prisma = new PrismaClient();

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");

    // This checks if all of the servers are in the database and if not it adds them there.
    client.guilds.cache.forEach(async (guild) => {
        const guildId = Number(guild.id);
        if (guildId === null || guildId === undefined) {
            throw Error("Something is wrong with the guild id.");
        } else if (
            await prisma.serverSetting
                .findUnique({ where: { serverId: guildId } })
                .then((server) => server === null)
        ) {
            console.log("Adding new server to database.", guildId);
            await prisma.serverSetting.create({
                data: { serverId: guildId },
            });
        }
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand()) {
            const { commandName } = interaction;

            for (const command of commandsCode) {
                if (commandName === command.name) {
                    command.execute(interaction);
                    break;
                }
            }
        } else if (interaction.isSelectMenu()) {
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

client.on("guildCreate", async (guild) => {
    const guildId = Number(guild.id);
    console.log(guildId);
    await prisma.serverSetting.create({
        data: { serverId: guildId },
    });
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
