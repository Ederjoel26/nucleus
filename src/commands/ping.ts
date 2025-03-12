import {
  type CommandContext,
  Middlewares,
  Declare,
  Command,
  Embed,
} from "seyfert";

@Declare({
  name: "ping",
  description: "Show latency with Discord",
  props: {
    ratelimit: {
      type: "user",
      time: 5_000,
    },
  },
})
@Middlewares(["Cooldown"])
export default class PingCommand extends Command {
  async run(ctx: CommandContext) {
    await ctx.deferReply();
    const ping = ctx.client.gateway.latency;
    const emoji = this.selectImage(ping);
    const embed = new Embed()
      .setTitle("🏓 Pong!")
      .setDescription("Here's the bot's current latency:")
      .setColor("#5865F2")
      .addFields(
        { name: "📡 Latency", value: `**${ping}ms**`, inline: true },
        {
          name: "⏳ API Latency",
          value: `**${ping}ms**`,
          inline: true,
        }
      )
      .setThumbnail(emoji)
      .setFooter({ text: "Stay fast! 🚀", iconUrl: ctx.author.avatarURL() })
      .setTimestamp();

    await ctx.editOrReply({
      embeds: [embed],
    });
  }

  private selectImage(ping: number) {
    const pingu = "https://cdn3.emoji.gg/emojis/38417-scarypingu.png";
    const questionEmoji = "https://cdn3.emoji.gg/emojis/41003-thinking.png";
    const frog = "https://cdn3.emoji.gg/emojis/81973-pepegoodlook.png";
    const mewing = "https://cdn3.emoji.gg/emojis/34171-mewing-2.png";
    if (ping > 200) return pingu;
    if (ping > 100 && ping < 200) return questionEmoji;
    if (ping > 50 && ping < 100) return frog;
    if (ping > 0 && ping < 50) return mewing;
    return pingu;
  }
}
