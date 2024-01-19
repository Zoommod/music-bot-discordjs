const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fila")
        .setDescription("Mostra as 10 primeiras musicas da fila"),
    execute: async ({client, interaction}) => {
        
    }
}   