import type { Snowflake } from "seyfert/lib/types";
import type { Ratelimit } from "src/config/types";

import { LimitedCollection } from "seyfert/lib/collection";
import { createMiddleware } from "seyfert";

const cooldowns = new LimitedCollection<Snowflake, Ratelimit>({});

export default createMiddleware<undefined>(async (middle) => {
  if (!middle.context.isChat()) {
    return;
  }

  const commandCooldown = middle.context.command.props.ratelimit;
  if (!commandCooldown) {
    middle.next();
    return;
  }

  const commandName = middle.context.resolver.fullCommandName;
  const t = middle.context.t.get(middle.context.author.locale) as any;

  const id =
    commandCooldown.type === "channel"
      ? middle.context.interaction.channel.id
      : middle.context.author.id;

  const key = `${id}:${commandName}`;
  const currentCooldown = cooldowns.raw(key);

  if (!currentCooldown) {
    cooldowns.set(key, commandCooldown, commandCooldown.time);
    middle.next();
    return;
  }

  const timeLeft = (currentCooldown.expireOn - Date.now()) / 1_000;

  const replyContent =
    commandCooldown.type === "user"
      ? t.middlewares.cooldown.user(timeLeft.toFixed(1))
      : t.middlewares.cooldown.channel(timeLeft.toFixed(1));

  await middle.context.interaction.editOrReply({
    content: replyContent,
    flags: 64,
  });

  middle.stop(`cooldown (${commandCooldown.type}: ${id})`);
});
