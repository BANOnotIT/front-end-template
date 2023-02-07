import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useProvider, useSigner } from "wagmi";

import { MeowCreate } from "~/feature/meow-create";
import { MeowList } from "~/feature/meow-list";
import { MeowsService } from "~/shared/meows";
import { DFAULT_CHAIN_ID, provider } from "~/shared/wagmi";

import styles from "../styles/Home.module.css";

const VALIDATION_TIME_MS = 20_000;

export async function getStaticProps() {
  const service = new MeowsService(provider({ chainId: DFAULT_CHAIN_ID }));

  await service.fetchMeows();

  return {
    props: {
      meows: service.distillate(),
    },
    revalidate: Math.round(VALIDATION_TIME_MS / 1000), // In seconds
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meows,
}) => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const service = useMemo(
    () => MeowsService.hydrate(signer ?? provider, meows),
    [meows, provider, signer]
  );

  useEffect(() => {
    void service.fetchMeows();
    const interval = setInterval(
      () => service.fetchMeows(),
      VALIDATION_TIME_MS
    );
    return () => clearInterval(interval);
  }, [service]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meow App</title>
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <MeowCreate service={service} />

        <MeowList service={service} />
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
