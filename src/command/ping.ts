/* eslint-disable import/no-import-module-exports */
import { PermissionFlagsBits } from "discord.js";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "ping",
    description: "Replies with Pong!",
    permissions: [PermissionFlagsBits.Administrator],
    options: new Map(),
    execute: (interaction) => {
        interaction.reply({ content: "Pong!", ephemeral: true });
    },
};
// create options for the command here
commandData.options.set("echo", "This will echo your message back to you.");

const { name, description, permissions, options, execute } = commandData;
export default { name, description, permissions, options, execute };
