import fs from "fs";
import { Routes, ChatInputCommandInteraction, CacheType } from "discord.js";
import { REST } from "@discordjs/rest";
import { commands } from "./commands";
import "dotenv/config";

// check that dotenv vals are set
if (
    process.env.TOKEN === undefined ||
    process.env.clientId === undefined ||
    process.env.guildId === undefined
) {
    throw new Error("Please set the TOKEN, guildId, and prefix in .env");
}
if (process.env.buildCommands === undefined) {
    throw new Error("Please make buildCommands is set in .env");
}
if (process.env.buildCommandsPublic === undefined) {
    throw new Error("Please make buildCommandsPublic is set in .env");
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

if (process.env.buildCommands.toLowerCase() === "true") {
    // ===REMOVING ALL COMMANDS===
    // for guild-based commands
    rest.put(
        Routes.applicationGuildCommands(
            process.env.clientId,
            process.env.guildId,
        ),
        { body: [] },
    )
        .then(() => console.log("Successfully deleted all guild commands."))
        .catch(console.error);
}
// for global commands
if (process.env.buildCommandsPublic.toLowerCase() === "true") {
    rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
        .then(() => {
            console.log("Successfully deleted all application commands.");
        })
        .catch(console.error);
}

// ===prep to export basic command info to index===
interface basicCommandInfo {
    name: string;
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
}
const commandsCode: basicCommandInfo[] = [];

// ===ADDING A NEW COMMAND===
if (
    process.env.buildCommands.toLowerCase() === "true" &&
    process.env.buildCommandsPublic.toLowerCase() === "false"
) {
    // Creates guild commands
    rest.put(
        Routes.applicationGuildCommands(
            process.env.clientId,
            process.env.guildId,
        ),
        { body: commands },
    )
        .then(() => {
            console.log("Successfully registered application commands.");
        })
        .catch(console.error);
}
if (process.env.buildCommandsPublic.toLowerCase() === "true") {
    // Creates global commands
    rest.put(Routes.applicationCommands(process.env.clientId), {
        body: commands,
    })
        .then(() => {
            console.log(
                "Successfully registered application commands IN PUBLIC SERVERS.",
            );
        })
        .catch(console.error);
}

// Exporting names and code of commands for use in index.ts
export { commandsCode };
