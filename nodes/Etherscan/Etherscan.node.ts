import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Etherscan implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Etherscan",
		name: "Etherscan",
		icon: "file:etherscan-logo.svg",
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + \": \" + $parameter["operation"]}}',
		description: "Query the Etherscan API",
		defaults: {
			name: "Etherscan",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				name: 'EtherscanApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: "https://api.etherscan.io/api",
			headers: {
				Accept: "application/json",
				'Content-Type': 'application/json',
			}
		},
		properties: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				placeholder: 'Adress',
				description: 'Address of the contract',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'getContractABI',
							'getSourceCode',
							'getTxHash',
						],
					},
				},
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'ABI for Varified Contract',
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
				default: 'getContractABI',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'getContractABI',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Contract ABI',
						description: 'Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract',
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getabi&address={{$parameter["address"]}}&apikey=1ZSSHEN7FPA9IKCUGEGKMAHVMTFYPGMUN5',
							},
						},
					},
				],
				default: 'get',
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
						name: 'Get',
						value: 'get',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Source Code',
						description: 'Returns the Solidity source code of a verified smart contract',
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getsourcecode&address={{$parameter["address"]}}&apikey=1ZSSHEN7FPA9IKCUGEGKMAHVMTFYPGMUN5',
							},
						},
					},
				],
				default: 'get',
		  },
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'getTxHash',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Tx Hash',
						description: "Returns a contract's deployer address and transaction hash it was created, up to 5 at a time",
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getcontractcreation&contractaddresses={{$parameter["address"]}}&apikey=1ZSSHEN7FPA9IKCUGEGKMAHVMTFYPGMUN5',
							},
						},
					},
				],
				default: 'get',
			},
		]
	};
}
