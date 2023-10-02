import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class AzureDataLake implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Azure Data Lake',
		name: 'AzureDataLake',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:Microsoft_Azure.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Azure Data Lake API',
		defaults: {
			name: 'Azure Data Lake',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'AzureDataLakeApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://management.azure.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create',
						value: 'create',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
					{
						name: 'Get',
						value: 'get',
					},
					{
						name: 'List',
						value: 'list',
					},
					{
						name: 'Update',
						value: 'update',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['create'],
					},
				},
				options: [
					{
						name: 'Put',
						value: 'put',
						action: 'Creates the specified data lake store account',
						routing: {
							request: {
								method: 'PUT',
								url: 'subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.DataLakeStore/accounts/{{accountName}}',
							},
						},
					},
				],
				default: 'put',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['delete'],
					},
				},
				options: [
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletes the specified data lake store account',
						routing: {
							request: {
								method: 'DELETE',
								url: 'subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.DataLakeStore/accounts/{{accountName}}',
							},
						},
					},
				],
				default: 'delete',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['get'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Gets the specified data lake store account',
						routing: {
							request: {
								method: 'GET',
								url: 'subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.DataLakeStore/accounts/{{accountName}}',
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
						resource: ['list'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'Lists the data lake store accounts within the subscription',
						routing: {
							request: {
								method: 'GET',
								url: 'subscriptions/{{subscriptionId}}/providers/Microsoft.DataLakeStore/accounts',
							},
						},
					},
				],
				default: 'list',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['update'],
					},
				},
				options: [
					{
						name: 'Patch',
						value: 'patch',
						action: 'Updates the specified data lake store account information',
						routing: {
							request: {
								method: 'PATCH',
								url: 'subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.DataLakeStore/accounts/{{accountName}}',
							},
						},
					},
				],
				default: 'patch',
			},
		],
	};
}
