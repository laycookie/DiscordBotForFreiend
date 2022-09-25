import {
    CacheType,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { commandI } from "./interfaces";
// import { initOptions } from "./commandOptionsInit";

interface basicCommandInfo {
    name: string;
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
}

const commands: SlashCommandBuilder[] = [];
const commandsCode: basicCommandInfo[] = [];

for (let i = 0; i < fs.readdirSync("./src/commands").length; i++) {
    const commandFile: string = fs.readdirSync("./src/commands")[i];
    const {
        name,
        description,
        permissions,
        execute,
        initCommandOptions,
    }: // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
    commandI = require(`./commands/${commandFile}`);

    if (name === undefined) {
        throw new Error(
            `Command ${commandFile} does not have a name exported. Please add one.`,
        );
    } else if (description === undefined) {
        throw new Error(
            `Command ${commandFile} does not have a description exported. Please add one.`,
        );
    } else if (execute === undefined) {
        throw new Error(
            `Command ${commandFile} does not have an execute function exported. Please add one.`,
        );
    }

    commandsCode.push({ name, execute });

    if (name === undefined || description === undefined) {
        throw new Error(
            `Please make sure that ${commandFile} has a name and description.`,
        );
    }

    const slashCommandBuild = new SlashCommandBuilder()
        .setName(name)
        .setDescription(description);

    if (permissions.length > 0) {
        slashCommandBuild.setDefaultMemberPermissions(
            new PermissionsBitField(permissions).bitfield,
        );
    }

    if (initCommandOptions !== undefined && initCommandOptions !== null) {
        initCommandOptions(slashCommandBuild);
    }

    commands.push(slashCommandBuild);
}

export { commands, commandsCode };
