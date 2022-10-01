/* eslint-disable import/no-import-module-exports */
import {
    ActionRowBuilder,
    APISelectMenuOption,
    PermissionFlagsBits,
    RestOrArray,
    SelectMenuBuilder,
    SelectMenuComponentOptionData,
    SelectMenuOptionBuilder,
} from "discord.js";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "rolemenu",
    description: "Lets user choose a role.",
    permissions: [PermissionFlagsBits.SendMessages],
    execute: async (interaction) => {
        const options: RestOrArray<
            | SelectMenuOptionBuilder
            | SelectMenuComponentOptionData
            | APISelectMenuOption
        > = [
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
        ];
        if (options.length === 0) {
            await interaction.reply({
                content: "There are no roles you can choose.",
                ephemeral: true,
            });
            return;
        }
        const roleMenu: any = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                .setMinValues(1)
                .setMaxValues(2)
                .addOptions(options),
        );

        interaction.reply({
            content: "Choose a roll that you want to get.",
            components: [roleMenu],
            ephemeral: true,
        });
    },
};

const { name, description, permissions, execute } = commandData;
export { name, description, permissions, execute };
