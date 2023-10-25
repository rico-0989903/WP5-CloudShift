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
				default: 'getSourceCode' ,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'getSourceCode',
						],
					},
				},
				options: [
					{
						name: 'Get Source Code From Varified Contract',
						value: 'getSourceCode',
						action: 'Get source code',
						description: 'Returns the Solidity source code of a verified smart contract',
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getsourcecode&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey={{$node["Etherscan"].credentials.apiKey}}',
							},
						},
					},
				],
				default: 'getSourceCode',
			},
		]
	};
}
