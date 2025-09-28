import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Divider, FormControlLabel, FormGroup, IconButton, Select, Slider, Stack, Switch, Tooltip, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { HOOK_ADDRESS, HOOK_ABI } from '@/utils/contract';
import { encryptBoolean, encryptValue } from '@/utils/inco-lite';
import { useAccount, useWriteContract, usePublicClient } from 'wagmi';
import { encrypt } from '@inco/js/lite';
import { parseEther } from 'viem';

interface SwapDialogProps {
    open: boolean;
    onClose: () => void;
    token0Name: string;
    token1Name: string;
    amountIn: number;
    isToken0Input: boolean;
}

export default function SwapDialog({ open, onClose, isToken0Input, amountIn }: SwapDialogProps) {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();
    const [amountInModifier, setAmountInModifier] = useState(0);
    const [arbAuctionFee, setArbAuctionFee] = useState(0);
    const [encryptedIsZeroForOneInput, setEncryptedIsZeroForOneInput] = useState("");
    const [encryptedAmountInModifierInput, setEncryptedAmountInModifierInput] = useState("");
    const [encryptedArbAuctionFeeInput, setEncryptedArbAuctionFeeInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onGenerateIsZeroForOneInput = async () => {
        if (address) {
            const encryptedData = await encryptValue({
                value: isToken0Input ? 0n : 1n,
                address: address as `0x${string}`,
                contractAddress: HOOK_ADDRESS,
            });
            setEncryptedIsZeroForOneInput(encryptedData);
        }
    }

    const onGenerateAmountInModifierInput = async () => {
        if (address) {
            const encryptedData = await encryptValue({
                value: BigInt(amountInModifier),
                address: address as `0x${string}`,
                contractAddress: HOOK_ADDRESS,
            });
            setEncryptedAmountInModifierInput(encryptedData);

        }
    }

    const onGenerateArbAuctionFeeInput = async () => {
        if (address) {
            const encryptedData = await encryptValue({
                value: BigInt(arbAuctionFee),
                address: address as `0x${string}`,
                contractAddress: HOOK_ADDRESS,
            });
            setEncryptedArbAuctionFeeInput(encryptedData);
        }
    }

    useEffect(() => {
        onGenerateIsZeroForOneInput();
    }, [isToken0Input, address]);

    useEffect(() => {
        onGenerateAmountInModifierInput();
    }, [amountInModifier, address]);

    useEffect(() => {
        onGenerateArbAuctionFeeInput();
    }, [arbAuctionFee, address]);

    useEffect(() => {
        onGenerateIsZeroForOneInput();
        onGenerateAmountInModifierInput();
    }, []);

    const addESwapEOA = async () => {
        if (!address || !writeContractAsync || !publicClient) {
            console.error('Missing required parameters for addESwapEOA');
            return;
        }

        try {
            setIsLoading(true);

            // Create the ESwapInputParams struct
            const params = {
                creator: address as `0x${string}`,
                receiver: address as `0x${string}`, // Using same address for now
                eZeroForOneInput: encryptedIsZeroForOneInput,
                eArbAuctionFeeInput: encryptedArbAuctionFeeInput,
                eAmountInTransform: encryptedAmountInModifierInput,
                amountIn: parseEther(amountIn.toString()),
                sqrtPriceLimitX96: 0n, // Set to 0 for no price limit
                deadline: BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 hour from now
            };

            // Call addESwapEOA with processPrev set to true
            const hash = await writeContractAsync({
                address: HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: "addESwapEOA",
                args: [params, false], // processPrev = true
            });

            // Wait for transaction confirmation
            const transaction = await publicClient.waitForTransactionReceipt({
                hash: hash,
            });

            if (transaction.status === 'success') {
                console.log('addESwapEOA transaction successful:', hash);
                onClose();
            } else {
                throw new Error('Transaction failed');
            }
        } catch (error) {
            console.error('Error calling addESwapEOA:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addESwapEOA();
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Configure Swap</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }} alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={0} alignItems="center">
                                <Tooltip title="Is Zero For One Is Encrypted">
                                    <IconButton>
                                        <Lock />
                                    </IconButton>
                                </Tooltip>
                                <Stack direction="column" spacing={0} maxWidth="350px">
                                    <Typography variant="body1">Is Zero For One</Typography>
                                    <Typography variant="caption">Zero for one is not known during tx inclusion in block. This prevents searchers from sandwiching the tx.</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant="body1">{isToken0Input ? "Yes" : "No"}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <Typography variant="body1">Encrypted Value: {encryptedIsZeroForOneInput.slice(0, 15)}...{encryptedIsZeroForOneInput.slice(-15)}</Typography>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }} alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={0} alignItems="center">
                                <Tooltip title="Amount In Modifier Is Encrypted">
                                    <IconButton>
                                        <Lock />
                                    </IconButton>
                                </Tooltip>
                                <Stack direction="column" spacing={0} maxWidth="300px">
                                    <Typography variant="body1">Amount In Modifier</Typography>
                                    <Typography variant="caption">Reverse operation is applied to plaintext amount in. The modifier is applied during actual execution post decryption. This helps when the price is too high or too low to mask the actual input.</Typography>
                                </Stack>
                            </Stack>
                            <Select size='small' id="amount-in-modifier" value={amountInModifier} onChange={(e) => setAmountInModifier(Number(e.target.value))}>
                                <MenuItem value={0}>As Is</MenuItem>
                                <MenuItem value={1}>Multiply By 100</MenuItem>
                                <MenuItem value={2}>Multiply By 100,000</MenuItem>
                                <MenuItem value={3}>Divide By 100</MenuItem>
                                <MenuItem value={4}>Divide By 100,000</MenuItem>
                            </Select>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <Typography variant="body1">Encrypted Value: {encryptedAmountInModifierInput.slice(0, 15)}...{encryptedAmountInModifierInput.slice(-15)}</Typography>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }} alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={0} alignItems="center">
                                <Tooltip title="Arb Auction Fee Is Encrypted">
                                    <IconButton>
                                        <Lock />
                                    </IconButton>
                                </Tooltip>
                                <Stack direction="column" spacing={0} maxWidth="300px">
                                    <Typography variant="body1">Arb Auction Fee</Typography>
                                    <Typography variant="caption">Tx with highest arb auction fee is executed first in the block post decryption. This fee is paid in amount in and is distributed to LPs.</Typography>
                                </Stack>
                            </Stack>
                            <TextField value={arbAuctionFee} onChange={(e) => setArbAuctionFee(Number(e.target.value))} variant="outlined" size='small' id="arb-auction-fee" name="arb-auction-fee" label="Arb Auction Fee" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <Typography variant="body1">Encrypted Value: {encryptedArbAuctionFeeInput.slice(0, 15)}...{encryptedArbAuctionFeeInput.slice(-15)}</Typography>
                        </Stack>
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <FormGroup>
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
                    <Button type="submit" form="subscription-form" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Swap'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}