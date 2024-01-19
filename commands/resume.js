const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("retomar")
        .setDescription("Retoma a musica pausada"),
    execute: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue){
            await interaction.reply("Não há músicas tocando no momento");
            return;
        }

        const currentSong = queue.current;

        queue.setPause(false);

        await interaction.reply("A musica foi pausada");
    } 
}