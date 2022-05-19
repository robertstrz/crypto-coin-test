import {Injectable} from "@nestjs/common";
import {
    BehaviorSubject, empty, interval, map, Observable, of, scan, shareReplay,
    startWith, switchMap, timer, withLatestFrom
} from "rxjs";
import {GetCoinDto} from "./dto/get-coin.dto";
import {ExchageRateService} from "./rate.service";

@Injectable()
export class CoinsRepository {
    readonly coins$: Observable<Array<GetCoinDto>> = new BehaviorSubject([]);

    constructor(private exchangeRateService: ExchageRateService) {
        const coinQuotes$ = interval(5000).pipe(
            startWith([]),
            scan((acc, _) => {
                acc.forEach((cointDtoItem) => {
                    cointDtoItem.prices.push(`${Math.floor(Math.random() * 100000)}$`)
                })
                return acc;
            }, [
                {
                    name: 'BTC',
                    prices: ['1000$']
                },
                {
                    name: 'LTC',
                    prices: ['10$']
                },
                {
                    name: 'ETH',
                    prices: ['2001$']
                },
            ] as Array<GetCoinDto>),
            shareReplay(1)
        )

        this.coins$ = empty().pipe(
            startWith([]),
            withLatestFrom(coinQuotes$),
            map(([one, two]) => {
                return two;
            }),
        );
    }

    getLatestQuotes() {
        return Promise.all([
            this.exchangeRateService.getExchangeRate('EUR%2FBTC'),
            this.exchangeRateService.getExchangeRate('EUR%2FLTC'),
            this.exchangeRateService.getExchangeRate('EUR%2FETH')]
        ).then((results) => {
            const coinsDto = results.map((exchangeItem) => {
                const { pair, rate } = exchangeItem;
                const coinDto: GetCoinDto = {
                    name: pair.slice(pair.indexOf('/') + 1, pair.length),
                    prices: [`${(1/rate)}`]
                }
                return coinDto;
            });
            return coinsDto;
        })
    }
}
