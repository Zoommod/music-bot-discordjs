const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sair")
        .setDescription("Sai do canal de voz."),
    execute: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue){
            await interaction.reply("Não há músicas tocando no momento");
            return;
        }

        queue.destroy();

        await interaction.reply("Hora de sair");
    } 
}