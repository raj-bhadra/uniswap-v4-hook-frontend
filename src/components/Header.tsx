"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo, HamburgerIcon } from "./Logo";
import { Box, Button, Container } from "@mui/material";

export default function Header() {
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();
    const { open } = useWeb3Modal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const handleDisconnect = async () => {
        try {
            await disconnectAsync();
            setMobileMenuOpen(false);
        } catch (error) {
            console.error("Disconnect error:", error);
        }
    };

    const handleConnect = () => {
        try {
            open();
            setMobileMenuOpen(false);
        } catch (error) {
            console.error("Connect error:", error);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white/60">Loading...</div>
            </div>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ pt: 2, pl: 2, pr: 2 }}>
                <header className="hidden sm:flex items-center justify-between mb-16">
                    <Link href="/">
                        <div className="flex items-center gap-2 ml-2">
                            <>
                                <Logo />
                                <h1 className="text-4xl font-medium font-mono main-text">Juni</h1>
                            </>
                        </div>
                    </Link>

                    {isConnected ? (
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                            <span className="text-sm font-mono">
                                {address?.slice(0, 6)}...{address?.slice(-4)}
                            </span>
                            <Button
                                variant="contained"
                                onClick={handleDisconnect}
                                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm transition-colors"
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleConnect}
                            className="px-6 py-2.5 bg-inco-blue text-white hover:bg-inco-blue/90 transition-colors"
                        >
                            Connect Wallet
                        </Button>
                    )}
                </header>
                {/* Mobile Header */}
                <header className="sm:hidden mb-16">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="flex items-center gap-2">
                                <Logo />
                                <h1 className="text-xl font-medium font-mono">Juni</h1>
                            </div>
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <HamburgerIcon isOpen={mobileMenuOpen} />
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                            <div className="space-y-3">
                                <div className="text-sm font-mono text-white/80 pb-2 border-b border-white/10">
                                    <Link href="/swap">Launch App</Link>
                                </div>
                            </div>
                            {isConnected ? (
                                <div className="space-y-3 pt-2">
                                    <div className="text-sm font-mono text-white/80 pb-2 border-b border-white/10">
                                        Connected Wallet
                                    </div>
                                    <div className="text-xs font-mono break-all text-white/60">
                                        {address}
                                    </div>
                                    <Button
                                        variant="contained"
                                        onClick={handleDisconnect}
                                        className="w-full px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm transition-colors rounded"
                                    >
                                        Disconnect Wallet
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-2">
                                    <div className="text-sm font-mono text-white/80 pb-2 border-b border-white/10">
                                        Wallet Connection
                                    </div>
                                    <Button
                                        variant="contained"
                                        onClick={handleConnect}
                                        className="w-full px-4 py-2.5 bg-inco-blue text-white hover:bg-inco-blue/90 transition-colors rounded"
                                    >
                                        Connect Wallet
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </header>
            </Box>
        </Container>
    );
}