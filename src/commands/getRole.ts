/* eslint-disable import/no-import-module-exports */
import {
    ActionRowBuilder,
    PermissionFlagsBits,
    SelectMenuBuilder,
} from "discord.js";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "rolemenu",
    description: "Lets user choose a role.",
    permissions: [PermissionFlagsBits.Administrator],
    execute: async (interaction) => {
        const row: any = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                .addOptions(
                    {
                        label: "Select me",
                        description: "This is a description",
                        value: "first_option",
                    },
                    {
                        label: "You can select me too",
                        description: "This is also a description",
                        value: "second_option",
                    },
                ),
        );

        interaction.reply({
            content: "Choose a roll that you want to get.",
            components: [row],
            ephemeral: true,
        });
    },
};

const { name, description, permissions, execute } = commandData;
export { name, description, permissions, execute };
