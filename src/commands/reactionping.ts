/* eslint-disable indent */
import {
    PermissionFlagsBits,
    SlashCommandBuilder,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";
import fs from "fs";
import { commandI } from "../interfaces";

const commandData: commandI = {
    name: "reactionping",
    description: "Allowes you to ping a user with a reaction.",
    permissions: [PermissionFlagsBits.SendMessages],
    execute: async (interaction) => {
        const userPing = interaction.options.getUser("ping");
        const reactionType = interaction.options.getString("reaction");
        const isGif: boolean | null = interaction.options.getBoolean("gif");

        async function interected(action: string, reactionFile: string) {
            function pickImg(imgOrGif: string) {
                const folderSize = fs.readdirSync(
                    `./public/${imgOrGif}/${reactionFile}`,
                ).length;
                const randomImg =
                    Math.floor(Math.random() * (folderSize - 1)) + 1;
                const randomImgPath = `./public/${imgOrGif}/${reactionFile}/${reactionFile}(${randomImg})`;
                return randomImgPath;
            }
            async function sendImg(imgType: string) {
                if (imgType !== "img" && imgType !== "gif") {
                    throw Error("imgType must be either img or gif");
                }
                try {
                    let sufix;
                    if (imgType === "img") {
                        sufix = "png";
                    } else if (imgType === "gif") {
                        sufix = "gif";
                    }
                    const attachment = new AttachmentBuilder(
                        `${pickImg(imgType)}.${sufix}`,
                        { name: `image.${sufix}` },
                    );
                    const embed = new EmbedBuilder()
                        .setColor(0x0099ff)
                        .setDescription(
                            `${interaction.user} ${action} ${userPing}!`,
                        )
                        .setImage(`attachment://image.${sufix}`);

                    await interaction.reply({
                        embeds: [embed],
                        files: [attachment],
                    });
                } catch (error) {
                    interaction.reply({
                        content:
                            "This image type is unavalivel for this reaction.",
                        ephemeral: true,
                    });
                }
            }
            try {
                switch (isGif) {
                    case true:
                        sendImg("gif");
                        break;
                    case false:
                        sendImg("img");
                        break;
                    case null:
                        try {
                            if (Math.random() > 0.5) {
                                sendImg("gif");
                            } else {
                                sendImg("img");
                            }
                        } catch (error) {
                            interaction.reply({
                                content: "This reaction is not yet avalible.",
                                ephemeral: true,
                            });
                        }
                        break;
                    default:
                        await interaction.reply({
                            content:
                                "Something went wrong! (probablt isGif var is undefined for some resson)",
                            ephemeral: true,
                        });
                        break;
                }
            } catch (error) {
                await interaction.reply({
                    content: `Error: ${error}`,
                    ephemeral: true,
                });
            }
        }

        if (reactionType === "hug") {
            interected("hugged", reactionType);
        } else if (reactionType === "kiss") {
            interected("kissed", reactionType);
        } else if (reactionType === "slap") {
            interected("slapped", reactionType);
        }
    },
    initOptions: (slashCommandBuild: SlashCommandBuilder) => {
        slashCommandBuild.addUserOption((option) => {
            option.setName("ping");
            option.setDescription("User that will be pinged.");
            option.setRequired(true);

            return option;
        });
        slashCommandBuild.addStringOption((option) => {
            option.setName("reaction");
            option.setDescription("Reaction that will be send to the user.");
            option.setRequired(true);
            option.addChoices(
                { name: "Hug", value: "hug" },
                { name: "Kiss", value: "kiss" },
                { name: "Slap", value: "slap" },
            );

            return option;
        });
        slashCommandBuild.addBooleanOption((option) => {
            option.setName("gif");
            option.setDescription("If the reaction should be a gif.");
            option.setRequired(false);

            return option;
        });
    },
};

const { name, description, permissions, execute, initOptions } = commandData;
export { name, description, permissions, execute, initOptions };
