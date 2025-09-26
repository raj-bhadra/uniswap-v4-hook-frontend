import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Web3Provider } from "@/provider/web3-provider";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/utils/theme";
import Header from "@/components/Header";
import "@fontsource/asimovian";
import "@fontsource/ibm-plex-sans";
import "@fontsource-variable/open-sans";
import "./globals.css";
import { Box } from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Juni",
  description: "Uniswap V4 Hook With FHE Based Encrypted Orders To Protect LPs & Traders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased selection:bg-white/70 selection:text-black`}
      >
        <ThemeProvider theme={darkTheme}>
          <Web3Provider>
            <Box sx={{ pt: 2, pl: 2, pr: 2 }}>
              <Header />
              {children}
            </Box>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}