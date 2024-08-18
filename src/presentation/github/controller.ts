import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GithubController {

  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService(),
  ) {}

  webhookHandler = (req: Request, res: Response) => {

    const githubEvent = req.header('x-github-event') ?? 'unknown';
    // const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const payload = req.body;
    let message: string;

    // console.log({ githubEvent, signature });
    // console.log({ githubEvent });
    // console.log(JSON.stringify(payload));

    switch (githubEvent) {
      case 'star':
          message = this.githubService.onStar(payload);
        break;

      case 'issues':
        message = this.githubService.onIssue(payload);
        break;

      default:
        message = `Unknow event ${ githubEvent }`;
    }

    console.log({ message });

    this.discordService.notify(message)
        .then(() => res.status(202).json('Accepted'))
        .catch(() => res.status(500).json({ error: 'Internal Server Error' }));

  }

}