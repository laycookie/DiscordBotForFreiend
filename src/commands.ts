import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { commandsCode } from "./deploy-commands";

const commands: SlashCommandBuilder[] = [];

for (let i = 0; i < fs.readdirSync("./src/commands").length; i++) {
    const command: string = fs.readdirSync("./src/commands")[i];
    const {
        name,
        description,
        permissions,
        options,
        execute,
        // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    } = require(`./commands/${command}`);
    commandsCode.push({ name, execute });

    if (name === undefined || description === undefined) {
        throw new Error(
            `Please make sure that ${command} has a name and description.`,
        );
    }

    const slashCommandBuild = new SlashCommandBuilder()
        .setName(name)
        .setDescription(description);

    if (permissions) {
        slashCommandBuild.addPermission(permissions);
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
