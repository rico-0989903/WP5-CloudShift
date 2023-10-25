import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Etherscan implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Etherscan API",
		name: "Etherscan",
		description: "Query the Etherscan API",
		group: ["transform"],
		version: 1,
		defaults: {
			name: "Etherscan",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				// eslint-disable-next-line n8n-nodes-base/node-class-description-credentials-name-unsuffixed
				name: "Etherscan",
				required: true,
			},
		],
		requestDefaults: {
			baseURL: "https://api.etherscan.io/api",
			headers: {
				Accept: "application/json",
				'Content-Type': 'application/json'
			}
		},
		properties: [
			{
				displayName: 'Contract Actions',
				name: 'Actions',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'ABI for Varified Contracts',
						value: 'getContractABI',
					},
					{
						name: 'Get Source Code From Varified Contract',
						value: 'getSourceCode',
					},
					{
						name: 'Get Contract Creator and Creation Tx Hash',
						value: 'getTxHash',
					},
				],
				default: 'getContractABI' ,
			}
		]
	};
}
