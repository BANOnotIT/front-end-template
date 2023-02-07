import { getContract } from "@wagmi/core";

export const ABI = [
  {
    inputs: [],
    name: "getAllMeows",
    outputs: [
      {
        components: [
          { internalType: "string", name: "message", type: "string" },
          { internalType: "address", name: "author", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct Cat.Meow[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_message", type: "string" }],
    name: "sayMeow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const contract = getContract({
  address: "0xd054e5724d7D595B72AbbB0C460e0221cD859C8f",
  abi: ABI,
});
