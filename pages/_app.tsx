import "~/shared/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  darkTheme as rainbowDarkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { type AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { darkTheme as muiDarkTheme } from "~/shared/theme";
import { chains, wagmiClient } from "~/shared/wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiDarkTheme}>
      <CssBaseline />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={rainbowDarkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
