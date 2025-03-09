import { config } from "seyfert";
import "dotenv/config";

export default config.bot({
  token: process.env.BOT_TOKEN ?? "",
  locations: {
    base: "dist", // replace with "src" if using bun
    commands: "commands",
    middlewares: "middlewares",
    events: "events",
  },
  intents: ["Guilds"],
  publicKey: process.env.PUBLIC_KEY,
  port: process.env.PORT ?? 3000,
});
