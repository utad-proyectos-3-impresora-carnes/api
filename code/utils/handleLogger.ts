import { IncomingWebhook } from "@slack/webhook";

/**
 * Genera el objeto que manda logs a slack.
 */
export function loggerStream(): any {
	const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
	return {
		write: (message: string): any => {
			webHook.send({
				text: message
			})
		}
	}

}