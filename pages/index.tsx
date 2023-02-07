import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useProvider, useSigner } from "wagmi";

import { MeowCreate } from "~/feature/meow-create";
import { MeowList } from "~/feature/meow-list";
import { MeowsService } from "~/shared/meows";
import { DEFAULT_CHAIN_ID, provider } from "~/shared/wagmi";

const VALIDATION_TIME_MS = 20_000;

export async function getStaticProps() {
  const service = new MeowsService(provider({ chainId: DEFAULT_CHAIN_ID }));

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
    <Box p={2} display="flex" justifyContent="center">
      <Head>
        <title>Meow App</title>
      </Head>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <ConnectButton />
        <Box width="60ch">
          <MeowCreate service={service} />
        </Box>

        <Box width="60ch">
          <MeowList service={service} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
