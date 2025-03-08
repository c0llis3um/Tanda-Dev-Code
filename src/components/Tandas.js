import React, { useState } from "react";

const TandaCreation = () => {
    const [tandaName, setTandaName] = useState("");
    const [contributionAmount, setContributionAmount] = useState(0);
    const [frequency, setFrequency] = useState("weekly");
    const [walletLimit, setWalletLimit] = useState(1);
    const [invites, setInvites] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");

    const generatePayload = () => {
        const payload = {
            txjson: {
                TransactionType: "Payment",
                Destination: "rYourDestinationAddress", // Replace with your XRP address
                Amount: "5000000", // 5 XRP in drops
                Fee: "12", // Standard fee
            },
            options: {
                submit: true,
                return_url: {
                    app: window.location.href, // Redirect back to your app
                },
            },
        };

        const base64Payload = btoa(JSON.stringify(payload));
        return base64Payload;
    };

    const redirectToXumm = () => {
        const base64Payload = generatePayload();
        const xummUrl = `https://xumm.app/sign/${base64Payload}`;
        window.location.href = xummUrl; // Redirect the user to Xumm
    };

    const checkTransactionStatus = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const txHash = urlParams.get("txid"); // Transaction hash from Xumm

        if (txHash) {
            const client = new xrpl.Client("wss://xrplcluster.com");
            await client.connect();

            const txResponse = await client.request({
                command: "tx",
                transaction: txHash,
            });

            if (txResponse.result.validated) {
                alert("Payment successful! Tanda created.");
                // Proceed to create the Tanda
            } else {
                alert("Payment failed. Please try again.");
            }

            await client.disconnect();
        }
    };

    const handleCreateTanda = () => {
        if (!tandaName || contributionAmount <= 0 || walletLimit < 1) {
            alert("Please fill out all fields correctly.");
            return;
        }

        if (invites.length > walletLimit) {
            alert("Number of invites exceeds the wallet limit.");
            return;
        }

        // Redirect to Xumm for payment
        redirectToXumm();

        // Check transaction status when the user returns
        checkTransactionStatus();
    };

    return (
        <div>
            <h2>Create a New Tanda</h2>
            <div>
                <input
                    type="text"
                    placeholder="Tanda Name"
                    value={tandaName}
                    onChange={(e) => setTandaName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Contribution Amount"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(parseFloat(e.target.value))}
                />
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <input
                    type="number"
                    placeholder="Wallet Limit"
                    value={walletLimit}
                    onChange={(e) => setWalletLimit(parseInt(e.target.value))}
                    min="1"
                />
                <button onClick={handleCreateTanda}>Create Tanda</button>
            </div>
        </div>
    );
};


export default TandaCreation;