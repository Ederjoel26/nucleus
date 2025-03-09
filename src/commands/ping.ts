import { type CommandContext, Middlewares, Declare, Command } from "seyfert";

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

    await ctx.editOrReply({
      content: "Pong! Latency: **" + ping + "ms**",
    });
  }
}
