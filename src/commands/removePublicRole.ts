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
        const roletoAdd = interaction.options.getRole("chooserole");
        const prisma = new PrismaClient();
        console.log(roletoAdd);
        interaction.reply({
            content: `${roletoAdd} was added to public role list.`,
            ephemeral: true,
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
