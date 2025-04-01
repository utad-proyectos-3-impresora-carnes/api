import { IncomingWebhook } from "@slack/webhook";
import morganBody from 'morgan-body';
import { Express } from 'express';

/**
 * Genera el objeto que manda logs a slack.
 */
function loggerStream(): any {
	const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
	return {
		write: (message: string): any => {
			webHook.send({
				text: message
			})
		}
	}

}

/**
 * 
 * @param server El servidor que se escuchará.
 */
export function sendLogs(server: Express): void {
	morganBody(server, {
		noColors: true,
		skip: function (req, res) {
			return res.statusCode < 400;
		},
		stream: loggerStream()
	})
}