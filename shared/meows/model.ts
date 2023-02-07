import { getContract, GetContractResult, Provider } from "@wagmi/core";
import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from "abitype";
import { BigNumber } from "ethers";

import { ABI } from "./abis";

export type Meow = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof ABI, "getAllMeows">["outputs"]
>[0][0];

type JsonMeow = Omit<Meow, "timestamp"> & {
  timestamp: string;
};

export class MeowsService {
  private listeners: Array<() => void> = [];
  private meowsCache: Meow[] = [
    {
      author: "0x0",
      message: "asdfasdfasdf",
      timestamp: BigNumber.from(0),
    },
  ];
  private contract: GetContractResult<typeof ABI>;

  constructor(provider: Provider) {
    this.contract = getContract({
      abi: ABI,
      address: "0xd054e5724d7D595B72AbbB0C460e0221cD859C8f",
      signerOrProvider: provider,
    });
  }

  static hydrate(provider: Provider, meows: JsonMeow[]) {
    const instance = new MeowsService(provider);

    instance.setCache(
      meows.map((a) => ({ ...a, timestamp: BigNumber.from(a.timestamp) }))
    );

    return instance;
  }

  async fetchMeows() {
    return this.contract
      .getAllMeows()
      .then((meows) => (this.meowsCache = meows.slice()))
      .then(() => this.notifyChange());
  }

  getMeows = () => this.meowsCache;

  async sayMeow(message: string) {
    await this.contract.sayMeow(message);
    await this.fetchMeows();
  }

  distillate(): JsonMeow[] {
    return this.meowsCache.map((a) => ({
      author: a.author,
      message: a.message,
      timestamp: String(a.timestamp),
    }));
  }

  subscribe = (listen: () => void) => {
    this.listeners.push(listen);
    return () => (this.listeners = this.listeners.filter((a) => a !== listen));
  };

  protected setCache(meows: Meow[]) {
    this.meowsCache = meows;
  }

  private notifyChange() {
    this.listeners.forEach((notify) => notify());
  }
}
