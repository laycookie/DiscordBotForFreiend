/* eslint-disable import/no-import-module-exports */
import { PrismaClient } from "@prisma/client";
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
        const prisma = new PrismaClient();

        const DBserverData = await prisma.serverSetting.findFirst({
            where: { serverId: Number(interaction.guildId) },
        });

        if (DBserverData === null) {
            throw Error("Server data is null please investigate in getRole.ts");
        }
        const rolesAvalible = await prisma.roleToChoose.findMany({
            where: { serverId: DBserverData.id },
        });

        const options: RestOrArray<
            | SelectMenuOptionBuilder
            | SelectMenuComponentOptionData
            | APISelectMenuOption
        > = [];
        rolesAvalible.forEach((role: {name: string; description: string; roleId: string;}) => {
            options.push({
                label: role.name,
                description: role.description,
                value: role.roleId,
            });
        });
        if (options.length === 0) {
            await interaction.reply({
                content: "There are no roles you can choose.",
                ephemeral: true,
            });
            return;
        }

        // Add the options to the select menu

        const roleMenu: any = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId("getRole")
                .setPlaceholder("Nothing selected")
                .setMinValues(1)
                .setMaxValues(options.length)
                .addOptions(options),
        );

        // Send the select menu to the interaction
        interaction.reply({
            content: "Choose a roll that you want to get.",
            components: [roleMenu],
            ephemeral: true,
        });
    },
};

const { name, description, permissions, execute } = commandData;
export { name, description, permissions, execute };
