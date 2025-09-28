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

            {/* Flow Section */}
            <div className="w-full max-w-4xl mx-auto mt-16 px-4">
                <Typography variant="h4" className="text-blue text-center mb-16">
                    System Flow
                </Typography>

                {/* Flow Image */}
                <div className="flex justify-center mb-12">
                    <Image
                        src="/Flow.png"
                        alt="System Flow Diagram"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Block Secret Packing Section */}
            <div className="w-full max-w-4xl mx-auto mt-16 px-4">
                <Typography variant="h4" className="text-blue text-center mb-16">
                    Block Secret Packing
                </Typography>

                {/* Packing Image */}
                <div className="flex justify-center mb-12">
                    <Image
                        src="/packing.png"
                        alt="Block Secret Packing Diagram"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Packing Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                    <Typography variant="h5" className="text-blue mb-4">
                        Packing Process
                    </Typography>
                    <Typography variant="body1" className="text-blue/90 leading-relaxed">
                        Zero for one is generated from the encrypted input, order validity is determined using encrypted comparisons with CERC20 balances.
                        Arb auction winner index is determined by keeping a current max value of secret arb auction fee and winner index.
                        In subsequent blocks, it is batched for decryption where it is packed by combining these values and using shift left operator.
                    </Typography>
                </div>

                {/* Unpacking Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-16">
                    <Typography variant="h5" className="text-blue mb-4">
                        Unpacking Process
                    </Typography>
                    <Typography variant="body1" className="text-blue/90 leading-relaxed">
                        Unpacking happens where each section is extracted using a mask and the number is right shifted.
                        This allows for efficient retrieval and processing of the packed secret data in subsequent operations.
                    </Typography>
                </div>

                {/* Deployments Table */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <Typography variant="h5" className="text-blue mb-6 text-center">
                        Base Sepolia Deployments
                    </Typography>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-blue/30">
                                    <th className="text-left py-3 px-4 text-blue font-semibold">Contract</th>
                                    <th className="text-left py-3 px-4 text-blue font-semibold">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-blue/20">
                                    <td className="py-3 px-4 text-blue/90 font-medium">Hook Address</td>
                                    <td className="py-3 px-4 text-blue/80 font-mono text-sm">0x0846529ebe8527d587e0760ecc66d4f5429a60c0</td>
                                </tr>
                                <tr className="border-b border-blue/20">
                                    <td className="py-3 px-4 text-blue/90 font-medium">Token 0 Address</td>
                                    <td className="py-3 px-4 text-blue/80 font-mono text-sm">0x076f2eb7455aff23d0a536Ac4D49E128D03fcEc2</td>
                                </tr>
                                <tr className="border-b border-blue/20">
                                    <td className="py-3 px-4 text-blue/90 font-medium">Token 1 Address</td>
                                    <td className="py-3 px-4 text-blue/80 font-mono text-sm">0xF14171b1d1e0E3B1663094c40aC7f2B5e2B60683</td>
                                </tr>
                                <tr className="border-b border-blue/20">
                                    <td className="py-3 px-4 text-blue/90 font-medium">CERC Wrapper for Token 0</td>
                                    <td className="py-3 px-4 text-blue/80 font-mono text-sm">0x004b59d8f6d83f96D3133F17d9dcDddAA7678313</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-blue/90 font-medium">CERC Wrapper for Token 1</td>
                                    <td className="py-3 px-4 text-blue/80 font-mono text-sm">0xd3F47E77353e5b49a69eaBe4c3f05aa207Aec923</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}