import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, FormGroup, Slider, Switch } from '@mui/material';

interface SwapDialogProps {
    open: boolean;
    onClose: () => void;
    token0Name: string;
    token1Name: string;
    amountIn: number;
    isToken0Input: boolean;
}

export default function SwapDialog({ open, onClose, isToken0Input }: SwapDialogProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
        onClose();
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Swap</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Configure secret parameters for the swap
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <FormControlLabel control={<Switch checked={isToken0Input} disabled />} label="Is Token 0 Input" />
                        <FormGroup>
                            <Slider
                                sx={{ width: "300px", ml: 2 }}
                                aria-label="Amount In Modifier"
                                defaultValue={50}
                                step={null}
                                valueLabelDisplay="off"
                                marks={[
                                    {
                                        value: 0,
                                        label: "/100,000"
                                    },
                                    {
                                        value: 25,
                                        label: "/100"
                                    },
                                    {
                                        value: 50,
                                        label: "As Is"
                                    },
                                    {
                                        value: 75,
                                        label: "x100"
                                    },
                                    {
                                        value: 100,
                                        label: "x100,000"
                                    },
                                ]}
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="arbAuctionFee"
                                name="arbAuctionFee"
                                label="Arb Auction Fee"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Swap
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}