import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {EXCHANGE_RATE_ENDPOINT} from '../const';

@Injectable()
export class ExchageRateService {

    constructor() {
    }

    getExchangeRate(pair: String) {
        return axios.get(`${EXCHANGE_RATE_ENDPOINT}exchangeRate?pair=${pair}`)
            .then((resp) => {
                console.log(resp);
                return resp.data;
            })
    }
}