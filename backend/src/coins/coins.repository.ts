import {
    BehaviorSubject, empty, interval, map, Observable, of, scan, shareReplay,
    startWith, switchMap, timer, withLatestFrom
} from "rxjs";
import {GetCoinDto} from "./dto/get-coin.dto";

export class CoinsRepository {
    readonly coins$: Observable<Array<GetCoinDto>> = new BehaviorSubject([]);

    constructor() {
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
        return this.coins$;
    }
}