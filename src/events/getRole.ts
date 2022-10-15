import { GuildMember, Role } from "discord.js";

function execute(interaction: any) {
    const user: GuildMember = interaction.guild.members.cache.get(
        interaction.user.id,
    );
    // eslint-disable-next-line array-callback-return
    interaction.guild.roles.cache.find((r: Role) => {
        if (interaction.values.includes(r.id)) {
            if (user.roles.cache.some((role) => role.id === r.id)) {
                user.roles.remove(r);
            } else {
                user.roles.add(r);
            }
        }
    });
}

export { execute };
