import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    CacheType,
} from "discord.js";

interface commandI {
    name: string;
    description: string;
    permissions: bigint[];
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
    initOptions?: (slashCommandBuild: SlashCommandBuilder) => void;
}

interface optionsI {
    addUserOption?: Map<string, string>;
    addStringOption?: Map<string, string>;
    addIntegerOption?: Map<string, string>;
    addBooleanOption?: Map<string, string>;
    addChannelOption?: Map<string, string>;
    addMentionableOption?: Map<string, string>;
    addNumberOption?: Map<string, string>;
    addRoleOption?: Map<string, string>;
}

export { commandI, optionsI };
