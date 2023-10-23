'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AzureDataLake = void 0;

class Etherscan {
	name: string;
	displayName: string;
	documentationUrl: string;
	properties: any;

	constructor() {
		this.name = 'Etherscan'
		this.displayName = 'Etherscan API'
		this.documentationUrl =
			'https://docs.etherscan.io/api-endpoints/contracts#get-contract-source-code-for-verified-contract-source-codes'
		this.properties = [
			{
				displayName: 'API Key',
				name: 'apiKey',
				// eslint-disable-next-line n8n-nodes-base/cred-class-field-unobscured-sensitive-input
				type: 'string',
				default: '',
			}
		]
	}

}

exports.Etherscan = Etherscan;
