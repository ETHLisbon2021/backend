require("dotenv").config();

const CRITERIA = {
    ERC20: "ERC20",
    ERC721: "ERC721",
    GOVERNANCE: "GOVERNANCE",
    AGE: "AGE",
    LIQUIDITY: "LIQUIDITY",
    TURNOVER: "TURNOVER",
    POAP: "POAP",
};

const GOVERNANCE_PROTOCOLS = {
    1: "AAVE",
    2: "COMPOUND",
    3: "UNISWAP",
    4: "RARIBLE"
};

const LIQUIDITY_PROTOCOLS = {
    1: "AAVE",
    2: "COMPOUND",
    3: "UNISWAP-V2",
    4: "UNISWAP-V3",
    5: "CURVE"
};

const POAP_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/poap-xyz/poap";

const AAVE_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";

const CURVE_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/sistemico/curve";

const UNISWAP_V2_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

const UNISWAP_V3_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const MAKER_SUBGRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/protofire/makerdao";

module.exports = {
    CRITERIA,
    GOVERNANCE_PROTOCOLS,
    LIQUIDITY_PROTOCOLS,
    POAP_SUBGRAPH_ENDPOINT,
    AAVE_SUBGRAPH_ENDPOINT,
    CURVE_SUBGRAPH_ENDPOINT,
    UNISWAP_V2_SUBGRAPH_ENDPOINT,
    UNISWAP_V3_SUBGRAPH_ENDPOINT,
    MAKER_SUBGRAPH_ENDPOINT
};