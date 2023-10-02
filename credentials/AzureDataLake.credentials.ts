'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AzureDataLake = void 0;
class AzureDataLake {
	name: string;
	displayName: string;
	documentationUrl: string;
	properties: any;

	constructor() {
		this.name = 'AzureDataLakeApi';
		this.displayName = 'Azure Data Lake API';
		this.documentationUrl =
			'https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json&tabs=azure-portal#view-account-access-keys';
		this.properties = [
			{
				displayName: 'Connection string',
				name: 'connectionString',
				type: 'string',
				default: '',
			},
		];
	}
}
exports.AzureDataLake = AzureDataLake;
