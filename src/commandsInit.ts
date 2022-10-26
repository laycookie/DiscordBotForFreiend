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

const ROOT_DIR = "./src/commands";

export default function initCommands(): Promise<InitCommandsResult> {
    let commands: SlashCommandBuilder[];
    let commandCodes: basicCommandInfo[];
    const cmdFiles = fs.readdirSync(ROOT_DIR);
    const commandDataArr = Promise.all(
        cmdFiles.map(async (cmdFile) => {
            let commandData: commandI;
            try {
                commandData = await import(`./commands/${cmdFile}`);
            } catch {
                // eslint-disable-next-line no-param-reassign
                cmdFile = cmdFile.replace(".ts", ".js");
                commandData = await import(`./commands/${cmdFile}`);
            }
            const { name, description, permissions, execute, initOptions } =
                commandData;

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

            const commandSimple = { name, execute };
            // commandCodes.push({ name, execute });

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

            // commands.push(slashCommandBuild);
            return { slashCommandBuild, commandSimple };
        }),
    );
    return commandDataArr.then((commandData) => {
        commands = commandData.map((data) => data.slashCommandBuild);
        commandCodes = commandData.map((data) => data.commandSimple);
        return { commands, commandCodes };
    });
}
