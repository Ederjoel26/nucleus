import { type CommandContext, Middlewares, Declare, Command } from "seyfert";

@Declare({
  name: "shitpost",
  description: "Shitpost",
  props: {
    ratelimit: {
      type: "user",
      time: 5_000,
    },
  },
})
@Middlewares(["Cooldown"])
export class ShitpostCommand extends Command {
  async run(ctx: CommandContext) {
    await ctx.deferReply();
    // await ctx.editOrReply({
    //   content:
    // });
  }
}
