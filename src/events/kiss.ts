import { ChatInputCommandInteraction, CacheType } from "discord.js";

function execute(interaction: ChatInputCommandInteraction<CacheType>) {
    interaction.reply("Yay!");
}

export { execute };
