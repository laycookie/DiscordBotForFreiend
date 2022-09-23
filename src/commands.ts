import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { commandsCode } from "./deploy-commands";
import { commandI } from "./interfaces";

const commands: SlashCommandBuilder[] = [];

for (let i = 0; i < fs.readdirSync("./src/command").length; i++) {
    const commandFile: string = fs.readdirSync("./src/command")[i];
    const {
        name,
        description,
        permissions,
        options,
        execute,
    }: // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
    commandI = require(`./commands/${commandFile}`);

    commandsCode.push({ name, execute });

    if (name === undefined || description === undefined) {
        throw new Error(
            `Please make sure that ${commandFile} has a name and description.`,
        );
    }

    const slashCommandBuild = new SlashCommandBuilder()
        .setName(name)
        .setDescription(description);

    if (permissions) {
        slashCommandBuild.setDefaultMemberPermissions(
            new PermissionsBitField(permissions).bitfield,
        );
    }

    if (options) {
        for (const entrie of options.entries()) {
            slashCommandBuild.addUserOption((option) => {
                if (!entrie[0]) {
                    throw Error(
                        "Please make sure that the option name is set.",
                    );
                }
                option.setName(entrie[0]);

                if (entrie[1] === null) return option;
                option.setDescription(entrie[1]);

                return option;
            });
        }
    }

    commands.push(slashCommandBuild);
}

export { commands };
