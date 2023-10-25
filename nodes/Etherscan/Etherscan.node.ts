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
						value: 'getContractABI',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Contract ABI',
						description: 'Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract',
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey={{$node["Etherscan"].credentials.apiKey}}',
							},
						},
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
						value: 'getTxHash',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Get Tx Hash',
						description: "Returns a contract's deployer address and transaction hash it was created, up to 5 at a time",
						routing: {
							request: {
								method: 'GET',
								url: '?module=contract&action=getcontractcreation&contractaddresses=0xB83c27805aAcA5C7082eB45C868d955Cf04C337F,0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45,0xe4462eb568E2DFbb5b0cA2D3DbB1A35C9Aa98aad,0xdAC17F958D2ee523a2206206994597C13D831ec7,0xf5b969064b91869fBF676ecAbcCd1c5563F591d0&apikey={{$node["Etherscan"].credentials.apiKey}}',
							},
						},
					},
				],
				default: 'getTxHash',
			},
		]
	};
}
