import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { formatEther } from "viem";

interface TokenBalanceProps {
    tokenName: string;
    tokenBalance: bigint;
}

// show balance and show a refresh icon button on the right side of the balance
export default function TokenBalance({ tokenName, tokenBalance }: TokenBalanceProps) {
    return (
        <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-end">
            <Typography variant="body2">{formatEther(tokenBalance)} {tokenName}</Typography>
            <Box>
                <Tooltip title="Refresh Balance">
                    <IconButton size="small">
                        <Refresh />
                    </IconButton>
                </Tooltip>
            </Box >
            <Box>
                <Tooltip title={`Mint 100 ${tokenName}`}>
                    <IconButton size="small">
                        <Add />
                    </IconButton>
                </Tooltip>
            </Box>
        </Stack>
    );
}