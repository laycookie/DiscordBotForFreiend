import { ChatInputCommandInteraction, CacheType } from "discord.js";

interface commandI {
    name: string;
    description: string;
    permissions: bigint[];
    options: Map<string, string>;
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
}

export { commandI };
