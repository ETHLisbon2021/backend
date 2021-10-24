# Eligible Guardian Node

## API

This node exposes HTTP API. Methods are describied below

### List presets

Endpoint: `/presets`

Method: GET

Response: an array of preset objects, each object containing:
* `id` - preset ID, passed to `calculate` function
* `name` - name of the preset
* `description` - description of this preset's criteria

Example: 
```
[
    {
        "id": "61732004626df898fd895058",
        "name": "Liquidity Monster",
        "description": "This is a preset to filter out true liquidity monsters"
    }
]
```

### List sales

Endpoint: `/sales`

Method: GET

Response: an array of sales objects, each object containing: 
* `saleId` - sale ID (address of the sold token)

Example:
```
[
    {
        "saleId": "0xce84b4508cf63017c807c652ff05c6d944afa504"
    }
]
```

### Get sale

Endpoint: `/sale/:id` (e.g. `/sale/0xce84b4508cf63017c807c652ff05c6d944afa504`)

Method: GET

Response: an array of sales objects, each object containing:
* `saleId` - sale ID (address of the sold token)
* `preset` - ID of the analytics preset chosen for this sale
* `calculated` - boolean value if the allocations have been calculated already
* `ipfsHash` - IPFS hash of the folder with the documents containing allocations results
* `users` - list of user's allocation results, each object containing:
    * `address` - address of the user
    * `amount` - amount of tokens this user wants to buy
    * `score` - eligibility score for this user
    * `allocation` - allocation of tokens for this user
    
Example:
```
{
    "saleId": "0xce84b4508cf63017c807c652ff05c6d944afa504",
    "preset": "61732004626df898fd895058",
    "calculated": true,
    "ipfsHash": "bafybeib7pvbaufy7trmlgc655xluvcp4woznpphs4nhvgyncvvoi7pghsa",
    "users": [
        {
            "_id": "617442d3be1aa03f9aa5fc67",
            "address": "0xcd5f8fa45e0ca0937f86006b9ee8fe1eedee5fc4",
            "amount": "1000",
            "score": 18,
            "allocation": "1000"
        },
        {
            "address": "0xf6b6f07862a02c85628b3a9688beae07fea9c863",
            "amount": "50000",
            "_id": "6173d7ea425638782406c38e",
            "score": 12,
            "allocation": "50000"
        }
    ]
}
```

### Calculate sale

Endpoint: `/sale/calculate`

Method: POST

Request: request object with the following fields:
* `id` - ID of the sale being calculated
* `preset` - ID of the preset to calculate allocations with
* `signature` - Signature of the message `Sign this message to authorize to Eligible` by sale owner

Response: 200 response for successful request (if calculation was accepted, 
response should be obtained separately through `/sale/:id` endpoint`)

### Get score

Endpoint: `/score`

Method: GET

Request: following params are accepted:
* `preset` - ID of the preset to get score for
* `address` - address to get score for

Response: object with following fields:
* `score` - score of the given address for given preset

## Project Architecture

This project uses Express.js as web framework and Mongodb as database (via Mongoose).
Also ethers is used for interaction with smart contracts and async tasks queues for calculating allocations.

Project structure consists of following parts:
* `abi` - folder with smart contracts ABI
* `getters` - criteria and preset getters functions
* `handlers` - event and http request handlers
* `models` - mongoose models
* `app.js` - main express.js web app file
* `constant.js` - file with various constants
* `contracts.js` - file with provider and contract instances
* `ipfs.js` - file with IPFS storing function 
* `index.js` - application entry point file
