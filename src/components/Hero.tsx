import { BaseLogo } from "./Logo";
import Image from "next/image";
import { UniswapLogo } from "./Logo";
import Link from "next/link";
import { Button } from "@mui/material";
import { LaunchOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center py-24 main-text text-blue">
            <Typography variant="h3" className="text-blue text-center">Uni V4 Hook With FHE Based <br /> LP & Trader Protection</Typography>
            <div className="flex items-center gap-4 mt-4 text-blue">
                <div className="pt-1">
                    <Image
                        src="https://cdn.prod.website-files.com/671156d33ac264346e223043/675a2a83d4ac40cf1352048c_logo%20(24).png"
                        alt="Wallet"
                        width={120}
                        height={120}
                    />
                </div>
                <UniswapLogo />
                <BaseLogo />
            </div>
            <div className="mb-8">
                <Link href="/swap">
                    <Button size="large" startIcon={<LaunchOutlined />} variant="outlined" color="primary">Launch App</Button>
                </Link>
            </div>
        </div>
    );
}