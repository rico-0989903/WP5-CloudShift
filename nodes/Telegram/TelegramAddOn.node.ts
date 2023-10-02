// eslint-disable-next-line n8n-nodes-base/node-filename-against-convention
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class TelegramAddOn implements INodeType {
	description: INodeTypeDescription ={
		displayName: "Telegram Add Ons",
		name: "telegramAddOns",
		group: ['transform'],
		version: 1,
		description: "Extra Telegram Add Ons",
		defaults: {
			name: "Telegram Add Ons"
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: "Channel",
				name: "channel",
				type: 'string',
				default: '',
				placeholder: "Chat-ID",
				description: 'Geef een chatID op'
			},
			{
				displayName: "Filter",
				name: "filter",
				type: 'string',
				required: true,
				default: '',
				placeholder: "Filter",
				description: 'Which participant types to fetch'
			},
			{
				displayName: "Offset",
				name: "offset",
				type: 'number',
				default: '',
				placeholder: "Offset",
				description: 'Set the filter offset'
			},
			{
				displayName: "Limit",
				name: "limit",
				type: 'string',
				default: '',
				placeholder: "Limit",
				description: 'Set the filter limit'
			},
			{
				displayName: "Hash",
				name: "hash",
				type: 'string',
				default: '',
				placeholder: "Hash",
				description: 'Set the filter hash'
			},
		],
	};
}
