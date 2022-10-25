import {
    CacheType,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { commandI } from "./interfaces";

interface basicCommandInfo {
    name: string;
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
}
type InitCommandsResult = {
    commands: SlashCommandBuilder[];
    commandCodes: basicCommandInfo[];
};

const ROOT_DIR = `./dist/src/commands`;

export default async function initCommands(): Promise<InitCommandsResult> {
    const commands: SlashCommandBuilder[] = [];
    const commandCodes: basicCommandInfo[] = [];
    const cmdFiles = fs.readdirSync(ROOT_DIR);
    cmdFiles.forEach(async (cmdFile) => {
        const {
            name,
            description,
            permissions,
            execute,
            initOptions,
        }: // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
        commandI = await import(`${ROOT_DIR}/${cmdFile}`);

        if (name === undefined) {
            throw new Error(
                `Command ${cmdFile} does not have a name exported. Please add one.`,
            );
        } else if (description === undefined) {
            throw new Error(
                `Command ${cmdFile} does not have a description exported. Please add one.`,
            );
        } else if (execute === undefined) {
            throw new Error(
                `Command ${cmdFile} does not have an execute function exported. Please add one.`,
            );
        }

        commandCodes.push({ name, execute });

        if (name === undefined || description === undefined) {
            throw new Error(
                `Please make sure that ${cmdFile} has a name and description.`,
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

        if (initOptions !== undefined && initOptions !== null) {
            initOptions(slashCommandBuild);
        }

        commands.push(slashCommandBuild);
    });
    return { commands, commandCodes };
}
