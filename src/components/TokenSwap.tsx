import { Box, Button, Container, IconButton, Stack, Tooltip } from "@mui/material";
import TokenInput from "@/components/TokenInput";
import { useState } from "react";
import { SwapVert } from "@mui/icons-material";
import { token0Name, token1Name, token0Image, token1Image } from "@/utils/tokenInfo";
import SwapDialog from "@/components/SwapDialog";

export default function TokenSwap() {
    const [open, setOpen] = useState(false);
    const [isToken0Input, setIsToken0Input] = useState(true);
    const [amountIn, setAmountIn] = useState(0.0);
    const [amountOut, setAmountOut] = useState("");
    const [token0Balance, setToken0Balance] = useState(0n);
    const [token1Balance, setToken1Balance] = useState(0n);
    const tokenInputName = isToken0Input ? token0Name : token1Name;
    const tokenOutputName = isToken0Input ? token1Name : token0Name;
    const tokenInputImage = isToken0Input ? token0Image : token1Image;
    const tokenOutputImage = isToken0Input ? token1Image : token0Image;
    const switchTokens = () => {
        setIsToken0Input(!isToken0Input);
        setAmountIn(0);
        setAmountOut("");
    };
    const closeSwapDialog = () => {
        setOpen(false);
    };
    const swapEnabled = amountIn > 0;
    return (
        <Container maxWidth="xs">
            <Stack direction="column" spacing={0}>
                <TokenInput tokenName={tokenInputName} input={true} value={amountIn} setValue={setAmountIn} tokenImage={tokenInputImage} tokenBalance={token0Balance} />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton onClick={switchTokens} sx={{ width: "32px", height: "32px" }}>
                        <Tooltip title={"Switch Input Token"} placement="top">
                            <SwapVert />
                        </Tooltip>
                    </IconButton>
                </Box>
                <TokenInput tokenName={tokenOutputName} input={false} value={amountOut} tokenImage={tokenOutputImage} tokenBalance={token1Balance} />
                <Button variant="contained" color="primary" disabled={!swapEnabled} sx={{ mt: 2 }} onClick={() => setOpen(true)}>Swap</Button>
                <SwapDialog open={open} onClose={closeSwapDialog} token0Name={token0Name} token1Name={token1Name} amountIn={amountIn} isToken0Input={isToken0Input} />
            </Stack>
        </Container>
    );
}