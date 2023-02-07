import { getAddress } from "@ethersproject/address";

export const shortenAddress = (address: string) => {
  const formatted = getAddress(address);
  const head = formatted.substring(0, 6);
  const tail = formatted.substring(formatted.length - 4);
  return `${head}…${tail}`;
};
