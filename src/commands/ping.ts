/* eslint-disable import/no-import-module-exports */
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "ping",
    description: "Replies with Pong!",
    permissions: [PermissionFlagsBits.Administrator],
    execute: async (interaction) => {
        const userPing = interaction.options.getString("echo");
        if (userPing) {
            await interaction.reply({
                content: `Pong!\n${userPing}`,
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "Pong!",
                ephemeral: true,
            });
        }
    },
    initOptions: (slashCommandBuild: SlashCommandBuilder) => {
        slashCommandBuild.addStringOption((option) => {
            option.setName("echo");
            option.setDescription("Response the input.");

            return option;
        });
    },
};

const { name, description, permissions, execute, initOptions } = commandData;
export { name, description, permissions, execute, initOptions };
