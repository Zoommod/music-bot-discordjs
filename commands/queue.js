const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fila")
        .setDescription("Mostra as 10 primeiras musicas da fila"),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue || !queue.playing){
            await interaction.reply("Nao ha musicas tocando");
            return;
        }

        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `${i + 1}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`;
        }).join("\n");

        const currentSong = queue.current

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**Currently Playing**\n` + 
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}   