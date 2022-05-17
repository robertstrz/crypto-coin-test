import React, {createContext, useContext, FC} from "react";
import {Coin} from "./Coin.interface";

export const getURI = (endpoint: string) => `http://localhost:3000/${endpoint}`;

export interface CoinService {
    findAll: () => Promise<Coin[]>;
}

export const CoinContext = createContext<CoinService>({} as CoinService);

export const useCoins = () => {
    const coinService: CoinService = {
        findAll: function (): Promise<Coin[]> {
            return fetch(getURI('api/v1/coins'))
                .then((resp) => resp.json())
                .then((resp) => {
                    return resp;
                });
        }
    }
    return coinService;
};

type Props = {
    children: React.ReactNode;
};

export const CoinProvider: FC<Props> = (props: Props) => {
    return (
        <CoinContext.Provider value={useCoins()}>
            {props.children}
        </CoinContext.Provider>
    );
};
export const useCoinService = () => {
    return useContext(CoinContext);
};