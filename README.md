# n8n-nodes-etherscan

This is an n8n community node. It lets you use Etherscan contracts in your n8n workflows.

The node allows you to retrieve the ABI for varified contracts, get the solidity Source Code of varified contracts and allows you to to retrieve the contract creator and the Tx Hash.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) 
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Retrieve ABI for Varified Contracts ###
Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract. 
This requires the address of the contract.

### Get Solidity Source Code for Varified Contract ###
Returns the Solidity source code of a verified smart contract.
This requires the address of the contract.

### Get Contract Creator and Creation Tx Hash ###
Returns a contract's deployer address and transaction hash it was created.
This requires up to five addresses.

## Credentials

To use these services an API key is required which requires an account on [Etherscan](etherscan.io).
On the [Etherscan website](etherscan.io) hover over your name and in the dropdown menu select "API Keys".
Here the API Key can be copied. __WARNING__ there is a limit on the amount of queries on the free version.
The allow for more queries per second you should upgrade your account.


## Compatibility

This node has been tested on version 1.7.1 and deemed functional

## Usage

### Retrieve ABI for Varified Contracts ###
This requires the address of the contract.

### Get Solidity Source Code for Varified Contract ###
This requires the address of the contract.

### Get Contract Creator and Creation Tx Hash ###
This requires at least one address and up to five addresses of contracts.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Etherscan API documatation on contracts](https://docs.etherscan.io/api-endpoints/contracts)



