import {Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useCoinService} from "../services/CoinsService";

type Coin = {
    name: string;
    prices: string[];
};

export function CoinList() {
    const [coinResp, setCoinResp] = useState<Coin[][]>([]);
    const {findAll} = useCoinService();

    const fetchCoins = () => {
        findAll()
            .then((coinListResp) => {
                setCoinResp([...coinResp, [...coinListResp]]);
                console.log(coinResp);
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCoins();
        }, 5000);
        return () => clearInterval(interval);
    });

    const getAvgPrice = (coinName: string) => {
        return coinResp.map((coinsList) => {
            const res = coinsList.find((item) => item.name === coinName);
            return res!.prices[0];
        }).reduce((acc, prevValue) => acc += parseFloat(prevValue), 0) / coinResp.length;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" component="div">
                Coins
            </Typography>
            {coinResp ? <List sx={{bgcolor: 'background.paper'}}>
                <ListItem divider>
                    <ListItemText
                        primary='BTC'
                        secondary={`AVG: ${getAvgPrice('BTC')}`}
                    />
                    <ListItemText
                        primary='LTC'
                        secondary={`AVG: ${getAvgPrice('LTC')}`}
                    />
                    <ListItemText
                        primary='ETH'
                        secondary={`AVG: ${getAvgPrice('ETH')}`}
                    />
                </ListItem>
                {coinResp.map((coinsResp) => {
                    return <ListItem divider>
                        {coinsResp.map((coinsPrices) => (<ListItemText
                            primary={coinsPrices.prices[0]}
                        />))}
                    </ListItem>
                })
                }
            </List> : 'Loading...'}
        </Container>
    );
};