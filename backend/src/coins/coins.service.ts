import {Injectable} from '@nestjs/common';
import {CoinsRepository} from './coins.repository';
import {CreateCoinDto} from './dto/create-coin.dto';
import {UpdateCoinDto} from './dto/update-coin.dto';
import { ExchageRateService } from './rate.service';

@Injectable()
export class CoinsService {

    constructor(private coinsRepository: CoinsRepository, private exchangeRateService: ExchageRateService) {
    }

    create(createCoinDto: CreateCoinDto) {
        return 'This action adds a new coin';
    }

    exchangeRate(pair: String) {
        return this.exchangeRateService.getExchangeRate(pair);
    }

    findAll() {
        return this.coinsRepository.getLatestQuotes();
    }

    findOne(id: number) {
        return `This action returns a #${id} coin`;
    }

    update(id: number, updateCoinDto: UpdateCoinDto) {
        return `This action updates a #${id} coin`;
    }

    remove(id: number) {
        return `This action removes a #${id} coin`;
    }
}
