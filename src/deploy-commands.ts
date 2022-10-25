import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import initCommands from "./commandsInit";
import "dotenv/config";

// check that dotenv vals are set
if (
    process.env.TOKEN === undefined ||
    process.env.clientId === undefined ||
    process.env.guildId === undefined ||
    process.env.removeCommands === undefined ||
    process.env.removeCommandsPublic === undefined
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
// ===REMOVING ALL COMMANDS===
if (process.env.removeCommands.toLowerCase() === "true") {
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
if (process.env.removeCommandsPublic.toLowerCase() === "true") {
    rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
        .then(() => {
            console.log("Successfully deleted all application commands.");
        })
        .catch(console.error);
}

// ===ADDING A NEW COMMAND===
const { commands, commandCodes } = await initCommands();
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
            console.log("Successfully registered guild commands.");
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

export { commandCodes };
