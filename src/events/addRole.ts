import { ChatInputCommandInteraction, CacheType } from "discord.js";

function execute(interaction: ChatInputCommandInteraction<CacheType>) {
    console.log(interaction);
}

export { execute };
