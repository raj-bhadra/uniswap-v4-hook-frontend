import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { formatEther, WalletClient, parseEther, maxUint256 } from "viem";
import { reEncryptValue } from "@/utils/inco-lite";
import { CERC_WRAPPER_0_ADDRESS, CERC_WRAPPER_1_ADDRESS, TOKEN_0_ADDRESS, TOKEN_1_ADDRESS, HOOK_ADDRESS } from "@/utils/contract";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { token0Name } from "@/utils/tokenInfo";

interface TokenBalanceProps {
    tokenName: string,
    tokenBalance: bigint,
}

// show balance and show a refresh icon button on the right side of the balance
export default function TokenBalance({ tokenName, tokenBalance }: TokenBalanceProps) {
    const [balance, setTokenBalance] = useState(tokenBalance);
    const [isEncryptedLoading, setIsEncryptedLoading] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [error, setError] = useState("");

    const publicClient = usePublicClient();
    const walletClient = useWalletClient();
    const { address } = useAccount();
    console.log("Pass ing address", address);

    const refreshBalance = async () => {
        console.log('Refresh balance called');
        try {
            setIsEncryptedLoading(true);
            setError("");
            console.log('Token name:', tokenName);
            console.log('Token address:', tokenName === token0Name ? CERC_WRAPPER_0_ADDRESS : CERC_WRAPPER_1_ADDRESS);
            const balanceHandle = await publicClient?.readContract({
                address: tokenName === token0Name ? CERC_WRAPPER_0_ADDRESS : CERC_WRAPPER_1_ADDRESS,
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "wallet",
                                type: "address",
                            },
                        ],
                        name: "balanceOf",
                        outputs: [
                            {
                                internalType: "euint256",
                                name: "",
                                type: "bytes32",
                            },
                        ],
                        stateMutability: "view",
                        type: "function",
                    },
                ],
                functionName: "balanceOf",
                args: [address as `0x${string}`],
            });
            console.log(balanceHandle, " is ");
            // if (
            //     balanceHandle?.toString() === "0x0000000000000000000000000000000000000000000000000000000000000000"
            // ) {
            //     console.log('balance handle is 0');
            //     setTokenBalance(0);
            //     return;
            // }
            const decrypted = await reEncryptValue({
                walletClient: walletClient.data as WalletClient,
                handle: balanceHandle?.toString() as string,
            });
            const formattedDecrypted = formatEther(decrypted as bigint);
            setTokenBalance(formattedDecrypted as unknown as bigint);
        } catch (err) {
            console.error("Error refreshing balance:", err);
            setError("Failed to refresh balance");
        } finally {
            setIsEncryptedLoading(false);
        }
    };

    const handleMintClick = async () => {
        if (!walletClient.data || !publicClient || !address) {
            console.error('Missing wallet client, public client, or address');
            return;
        }

        setIsMinting(true);
        setError("");

        try {
            const isToken0 = tokenName === token0Name;
            const baseTokenAddress = isToken0 ? TOKEN_0_ADDRESS : TOKEN_1_ADDRESS;
            const cercWrapperAddress = isToken0 ? CERC_WRAPPER_0_ADDRESS : CERC_WRAPPER_1_ADDRESS;
            const mintAmount = parseEther("100");

            // Step 1: Mint 100 base tokens
            console.log('Step 1: Minting 100 base tokens...');
            const mintHash = await walletClient.data.writeContract({
                address: baseTokenAddress,
                abi: [
                    {
                        inputs: [
                            { internalType: "address", name: "to", type: "address" },
                            { internalType: "uint256", name: "amount", type: "uint256" },
                        ],
                        name: "mint",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                functionName: "mint",
                args: [address as `0x${string}`, mintAmount],
            });
            await publicClient.waitForTransactionReceipt({ hash: mintHash });
            console.log('Step 1 completed: Tokens minted');

            // Step 2: Set allowance to uint256 max for hook contract
            console.log('Step 2: Setting allowance to hook contract...');
            const approveHash = await walletClient.data.writeContract({
                address: baseTokenAddress,
                abi: [
                    {
                        inputs: [
                            { internalType: "address", name: "spender", type: "address" },
                            { internalType: "uint256", name: "amount", type: "uint256" },
                        ],
                        name: "approve",
                        outputs: [{ internalType: "bool", name: "", type: "bool" }],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                functionName: "approve",
                args: [HOOK_ADDRESS, maxUint256],
            });
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            console.log('Step 2 completed: Allowance set');

            // Step 3: Wrap 100 tokens in CERC
            console.log('Step 3: Wrapping tokens in CERC...');
            const wrapHash = await walletClient.data.writeContract({
                address: cercWrapperAddress,
                abi: [
                    {
                        inputs: [
                            { internalType: "uint256", name: "wrappedAmount", type: "uint256" },
                        ],
                        name: "wrap",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                functionName: "wrap",
                args: [mintAmount],
            });
            await publicClient.waitForTransactionReceipt({ hash: wrapHash });
            console.log('Step 3 completed: Tokens wrapped');

            // Refresh balance after successful minting
            await refreshBalance();
            console.log('Mint process completed successfully');

        } catch (error) {
            console.error('Error during mint process:', error);
            setError('Failed to mint tokens');
        } finally {
            setIsMinting(false);
        }
    };


    return (
        <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-end">
            <Typography variant="body2">{formatEther(balance)} {tokenName}</Typography>
            <Box>
                <Tooltip title="Refresh Balance">
                    <IconButton size="small" onClick={refreshBalance} disabled={isEncryptedLoading}>
                        {isEncryptedLoading ? <CircularProgress size={20} /> : <Refresh />}
                    </IconButton>
                </Tooltip>
            </Box >
            <Box>
                <Tooltip title={`Mint 100 ${tokenName}`}>
                    <IconButton size="small" onClick={handleMintClick} disabled={isMinting}>
                        {isMinting ? <CircularProgress size={20} /> : <Add />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Stack>
    );
}