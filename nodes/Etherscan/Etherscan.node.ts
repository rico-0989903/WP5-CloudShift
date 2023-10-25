import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeExecutionWithMetadata, NodeOperationError } from 'n8n-workflow';

export class Etherscan implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Etherscan",
		name: "Etherscan",
		icon: "file:Etherscan-logo.svg",
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
				default: 'getContractABI' ,
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				required: true,
				description: 'Address for the contract, seperate with commas for multiple',
				default: '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',
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
								url: '=?module=contract&action=getabi&address={{$address}}&apikey=ZFWG3B37BSXCIP6T6M9TTKJTA3RZJWAJP2',
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
								url: '=?module=contract&action=getsourcecode&address={{$address.value}}&apikey=ZFWG3B37BSXCIP6T6M9TTKJTA3RZJWAJP2',
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
								url: `=?module=contract&action=getcontractcreation&contractaddresses={{$addressvalue}}&apikey={{$credentials.authenticatie.properties.qs.api_key]}`,
							},
						},
					},
				],
				default: 'get',
			},
		]
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let addressvalue: string;

		for (let index = 0; index < items.length; index++) {
			try {
				addressvalue = this.getNodeParameter("address", index, '') as string;
				item = items[index];

				item.json['addressvalue'] = addressvalue
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({json: this.getInputData(index)[0].json, error, pairedItemd: index});
				} else {
					if (error.context) {
						error.context.index = index;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error);

				}
			}

		}

	};
}
