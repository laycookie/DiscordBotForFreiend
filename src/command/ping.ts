import {
    ChatInputCommandInteraction,
    CacheType,
    PermissionFlagsBits,
} from "discord.js";

const name = "ping";
const description = "Replies with Pong!";
const permissions: bigint[] = [PermissionFlagsBits.Administrator];

const options: Map<string, string> = new Map();
options.set("echo", "This will echo your message back to you.");

const execute = (interaction: ChatInputCommandInteraction<CacheType>): void => {
    interaction.reply({ content: "Pong!", ephemeral: true });
};

export { name, description, permissions, options, execute };
