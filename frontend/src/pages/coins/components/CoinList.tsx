import {Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import { useCoinService } from "../services/CoinsService";

type Coin = {
    name: string;
    prices: string[];
};

export function CoinList() {
    const [coinList, setCoinList] = useState<Array<Coin>>([]);
    const { findAll } = useCoinService();
    useEffect(() => {
        findAll()
            .then((coinList) => {
                setCoinList(coinList);
            })
    }, []);
    return (
        <Container maxWidth="sm">
            <Typography variant="h6" component="div">
               Coins
            </Typography>
            {coinList ? <List sx={{ bgcolor: 'background.paper' }}>
                {coinList.map((coinItem) =>
                    <ListItem divider>
                        <ListItemAvatar>
                            <Avatar>
                                {/*<FolderIcon/>*/}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={coinItem.name}
                        />
                        <ListItemText
                            primary={coinItem.prices[coinItem.prices.length - 1]}
                        />
                    </ListItem>
                )}
            </List> : 'Loading...'}
        </Container>
    );
};
