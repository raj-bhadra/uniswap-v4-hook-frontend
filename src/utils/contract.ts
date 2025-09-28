export const ENCRYPTED_ERC20_CONTRACT_ADDRESS =
  "0xA449bc031fA0b815cA14fAFD0c5EdB75ccD9c80f";

// TODO: SET CORRECT HOOK ADDRESS
export const HOOK_ADDRESS = "0x0846529ebe8527d587e0760ecc66d4f5429a60c0";

export const TOKEN_0_ADDRESS = "0x076f2eb7455aff23d0a536Ac4D49E128D03fcEc2";

export const TOKEN_1_ADDRESS = "0xF14171b1d1e0E3B1663094c40aC7f2B5e2B60683";

export const CERC_WRAPPER_0_ADDRESS = "0x004b59d8f6d83f96D3133F17d9dcDddAA7678313";

export const CERC_WRAPPER_1_ADDRESS = "0xd3F47E77353e5b49a69eaBe4c3f05aa207Aec923";

// Hook contract ABI for addESwapEOA function
export const HOOK_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "eZeroForOneInput",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "eArbAuctionFeeInput",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "eAmountInTransform",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct ESwapInputParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "processPrev",
        type: "bool",
      },
    ],
    name: "addESwapEOA",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];