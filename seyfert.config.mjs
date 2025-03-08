import { config } from "seyfert";

export default config.bot({
    token: process.env.BOT_TOKEN ?? "",
    locations: {
        base: "dist", // replace with "src" if using bun
        commands: "commands"
    },
    intents: ["Guilds"],
    // This configuration is optional, in case you want to receive interactions via HTTP
    // This allows you to use both the gateway and the HTTP webhook
    publicKey: "...", // replace with your public key
    port: 4444, // replace with your application's port
});