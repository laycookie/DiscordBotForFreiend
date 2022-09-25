import { ChatInputCommandInteraction, CacheType } from "discord.js";

function execute(interaction: ChatInputCommandInteraction<CacheType>) {
    interaction.reply("Pong!");
}

export { execute };
