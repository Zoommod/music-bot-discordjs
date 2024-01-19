const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pausar")
        .setDescription("Pausa a musica que esta tocando"),
    execute: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue){
            await interaction.reply("Não há músicas tocando no momento");
            return;
        }

        const currentSong = queue.current;

        queue.setPause(true);

        await interaction.reply("A musica foi pausada");
    } 
}