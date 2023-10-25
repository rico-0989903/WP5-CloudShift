import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EtherscanApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'EtherscanApi';
	displayName = 'Etherscan API';
	documentationUrl = 'https://docs.etherscan.io/api-endpoints/contracts#get-contract-source-code-for-verified-contract-source-codes';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};
}
