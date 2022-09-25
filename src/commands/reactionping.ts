/* eslint-disable import/no-import-module-exports */
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "reactionping",
    description: "Allowes you to ping a user with a reaction.",
    permissions: [PermissionFlagsBits.SendMessages],
    execute: async (interaction) => {
        const userPing = interaction.options.getUser("ping");

        const buttons: any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                // customId has too much file in event folder
                .setCustomId("hug")
                .setLabel("Hug!")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("kiss")
                .setLabel("Kiss!")
                .setStyle(ButtonStyle.Primary),
        );

        await interaction.reply({
            content: `What reaction do you want to attach when pinging ${userPing}?`,
            components: [buttons],
            ephemeral: true,
        });
    },
    initOptions: (slashCommandBuild: SlashCommandBuilder) => {
        slashCommandBuild.addUserOption((option) => {
            option.setName("ping");
            option.setDescription("User that will be pinged.");
            option.setRequired(true);

            return option;
        });
    },
};

const { name, description, permissions, execute, initOptions } = commandData;
export { name, description, permissions, execute, initOptions };
