import { InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import TokenBalance from "./TokenBalance";

interface TokenInputProps {
    tokenName: string;
    input: boolean;
    value: number | string;
    setValue?: (value: number) => void;
    tokenImage: string;
    tokenBalance: bigint;
    setTokenBalance: (balance: bigint) => void;
}

export default function TokenInput({ tokenName, input, value, setValue, tokenImage, tokenBalance, setTokenBalance }: TokenInputProps) {
    return (
        <Paper variant="outlined">
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    sx={{ height: "100%", "& .MuiInputBase-root": { height: "120px" } }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">
                                <Stack direction="column" spacing={2} alignItems="center">
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 4 }}>
                                        <Image src={tokenImage} alt={tokenName} width={24} height={24} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{tokenName}</Typography>
                                    </Stack>
                                    <TokenBalance tokenName={tokenName} tokenBalance={tokenBalance} />
                                </Stack>
                            </InputAdornment>,
                            startAdornment: <InputAdornment position="start">
                                {input ? "Sell" : "Buy"}
                            </InputAdornment>,
                        },
                    }}
                    disabled={!input} fullWidth
                    value={value}
                    onChange={(e) => setValue?.(Number(e.target.value))} />
            </Stack>
        </Paper>
    );
}