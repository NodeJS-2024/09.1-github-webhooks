import { envs } from '../../config';

export class DiscordService {

  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {

    const body = {
      content: message,
      embeds: [
        {
          image: {
            url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2h1OGF1dDNyd25jNzBxZmNvY2N6cDBpc3FxaGF4bDJiMWRxeHU1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZqlvCTNHpqrio/giphy.gif'
          }
        },
      ],
    }

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;

  }

}