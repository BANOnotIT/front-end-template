import { getContract, GetContractResult, Provider, Signer } from "@wagmi/core";
import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from "abitype";

import { ABI } from "./abis";

type AbiMeow = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof ABI, "getAllMeows">["outputs"]
>[0][0];
export type Meow = Omit<AbiMeow, "timestamp"> & { timestamp: Date };

type JsonMeow = Omit<Meow, "timestamp"> & {
  timestamp: number;
};

export class MeowsService {
  private listeners: Array<() => void> = [];
  private meowsCache: Meow[] = [];
  private contract: GetContractResult<typeof ABI>;

  constructor(provider: Provider | Signer) {
    this.contract = getContract({
      abi: ABI,
      address: "0xd054e5724d7D595B72AbbB0C460e0221cD859C8f",
      signerOrProvider: provider,
    });
  }

  static hydrate(provider: Provider | Signer, meows: JsonMeow[]) {
    const instance = new MeowsService(provider);

    instance.setCache(
      meows.map((a) => ({ ...a, timestamp: new Date(a.timestamp * 1000) }))
    );

    return instance;
  }

  async fetchMeows() {
    return this.contract
      .getAllMeows()
      .then(
        (meows) =>
          (this.meowsCache = meows.map((a) => ({
            ...a,
            timestamp: new Date(a.timestamp.toNumber() * 1000),
          })))
      )
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
      timestamp: Number(a.timestamp),
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
