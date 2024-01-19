const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Toca a música.")
        .addSubcommand(subcommand => 
            subcommand
                .setName("procurar")
                .setDescription("Procura pela música.")
                .addStringOption(option => 
                    option
                        .setName("procuratermos")
                        .setDescription("Procura palavras-chave")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("playlist")
                .setDescription("Toca uma playlist do YT")
                .addStringOption(option => 
                    option
                        .setName("url")
                        .setDescription("url da playlist")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("musica")
                .setDescription("Toca a musica do YT")
                .addStringOption(option => 
                    option
                        .setName("url")
                        .setDescription("Url da musica")
                        .setRequired(true)
                )
        ),
    execute: async ({client, interaction}) => {
        if(!interaction.member.voice.channel){
            await interaction.reply("Você deve estar em um canal de voz para usar esse comando.");
            return;
        }

        const queue = await client.player.createQueue(interaction.guild);
        
        if(!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed();
        if(interaction.options.getSubcommand() === "song"){
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,

            });

            if(result.tracks.length === 0){
                await interaction.reply("Nenhum resultado encontrado")
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed
                .setDescription(`Adicionado **[${song.title}](${song.url})** a fila.`)
                .setThumbnail(song.thumbnail)
    
        }
        else if(interaction.options.getSubcommand() === "playlist"){
            let url = interaction.options.getString("url")

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,

            });

            if(result.tracks.length === 0){
                await interaction.reply("Nenhum resultado encontrado")
                return
            }

            const playlist = result.playlist
            await queue.addTracks(playlist)

            embed
                .setDescription(`Adicionado **[${playlist.title}](${playlist.url})** a fila.`)
                .setThumbnail(playlist.thumbnail)
        }

        else if(interaction.options.getSubcommand() === "procurar"){
            let url = interaction.options.getString("procuratermos")

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,

            })

            if(result.tracks.length === 0)
                return interaction.editReply("Sem resultados.")
            

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`Adicionado **[${song.title}](${song.url})** a fila.`)
                .setThumbnail(song.thumbnail)
        }

        if (!queue.playing) await queue.play()
        
        // Respond with the embed containing information about the player
        await interaction.reply({
            embeds: [embed]
        })
	}

}
    
