/* eslint-disable import/no-import-module-exports */
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "removepublicrole",
    description:
        "Allows you to add a role to the public roles list, So users can choose it with rolemenu.",
    permissions: [PermissionFlagsBits.Administrator],
    execute: async (interaction) => {
        const roletoRemove = interaction.options.getRole("roletoremove");
        const prisma = new PrismaClient();
        await interaction.reply({
            content: `${roletoRemove} was removed from public role list.`,
            ephemeral: true,
        });

        // === Database manipulations ===

        const DBserverData = await prisma.serverSetting.findFirst({
            where: { serverId: Number(interaction.guildId) },
        });

        if (DBserverData === null) {
            throw Error("Server data is null please investigate.");
        }

        if (
            roletoRemove?.name === undefined ||
            roletoRemove?.id === undefined
        ) {
            await interaction.editReply({
                content: "Role is undefined, please try again.",
            });
            // eslint-disable-next-line no-useless-return
            return;
        }

        const role = await prisma.roleToChoose.findFirst({
            where: {
                serverId: Number(DBserverData.id),
                name: roletoRemove.name,
                roleId: roletoRemove.id,
            },
        });

        if (role === null) {
            interaction.editReply("Role is not in the list.");
            return;
        }

        await prisma.roleToChoose.deleteMany({
            where: role,
        });
    },
    initOptions: (slashCommandBuild: SlashCommandBuilder) => {
        slashCommandBuild.addRoleOption((option) => {
            option.setName("roletoremove");
            option.setDescription(
                "Role that be added to the public roles list.",
            );
            option.setRequired(true);

            return option;
        });
    },
};

const { name, description, permissions, execute, initOptions } = commandData;
export { name, description, permissions, execute, initOptions };
