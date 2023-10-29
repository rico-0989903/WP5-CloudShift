import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: path.join('C:\\Users\\benar\\.n8n\\logs', 'Etherscan.node.log') }),
	],
});

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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Contract ABI for Verified Contract',
						value: 'getContractABI',
					},
					{
						name: 'Get Source Code for Verified Contract',
						value: 'getSourceCode',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'Get Contract Creator and create Tx Hash',
						value: 'getTxHash',
					},
				],
				default: 'getContractABI' ,
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				required: true,
				description: 'Address for the contract, seperate with commas for multiple',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'getContractABI',
							'getSourceCode',
						],
					},
				},
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				displayName: 'Address(es)',
				name: 'contractaddresses',
				type: 'string',
				required: true,
				description: 'Address for the contract, seperate with commas for multiple addresses',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'getTxHash',
						],
					},
				},
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
								url: '=?module=contract&action=getabi&address={{$parameter["address"]}}&apikey={{$credentials.apiKey}}',
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
								url: '=?module=contract&action=getsourcecode&address={{$parameter["address"]}}&apikey={{$credentials.apiKey}}',
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
						description: "Returns a contract's deployer address and transaction hash it was created to, up to 5 at a time",
						routing: {
							request: {
								method: 'GET',
								url: '=?module=contract&action=getcontractcreation&contractaddresses={{$parameter["contractaddresses"]}}&apikey={{$credentials.apiKey}}',
							},
						},
					},
				],
				default: 'get',
			},
		]
	};

	async execute() {
		logger.info('Etherscan node executed');
		try {
			return await this.query();
		} catch (error) {
			logger.error('error occured: ', error);
			throw error;
		}
	}
}

