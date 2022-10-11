import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "addpublicrole",
    description:
        "Allows you to add a role to the public roles list, So users can choose it with rolemenu.",
    permissions: [PermissionFlagsBits.Administrator],
    execute: async (interaction) => {
        const roletoAdd = interaction.options.getRole("chooserole");
        const prisma = new PrismaClient();
        interaction.reply({
            content: `${roletoAdd} was added to public role list.`,
            ephemeral: true,
        });

        // === Database manipulations ===

        const DBserverData = await prisma.serverSetting.findFirst({
            where: { serverId: Number(interaction.guildId) },
        });

        if (DBserverData === null) {
            throw Error("Server data is null please investigate.");
        }

        if (roletoAdd?.name === undefined || roletoAdd?.id === undefined) {
            interaction.reply({
                content: "Role is undefined, please try again.",
                ephemeral: true,
            });
            return;
        }

        await prisma.roleToChoose.create({
            data: {
                serverId: Number(DBserverData.id),
                name: roletoAdd.name,
                roleId: roletoAdd.id,
            },
        });
    },
    initOptions: (slashCommandBuild: SlashCommandBuilder) => {
        slashCommandBuild.addRoleOption((option) => {
            option.setName("chooserole");
            option.setDescription(
                "Role that be added to the public roles list.",
            );

            return option;
        });
    },
};

const { name, description, permissions, execute, initOptions } = commandData;
export { name, description, permissions, execute, initOptions };
