import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private transactionService: TransactionsService,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save({
      ...dto,
      transactionsAsSender: [],
      transactionsAsReceiver: [],
    });
  }

  async createTransaction(
    id: number,
    amount: number,
    type: string,
    receiverId?: number,
  ) {
    const tx = await this.transactionService.create({
      amount,
      type,
    });

    let user: UserEntity;

    if (receiverId) {
      user = await this.repository.findOne({
        where: { id: receiverId },
        relations: ['transactionsAsReceiver'],
      });
      console.log(user);
      user.transactionsAsReceiver.push(tx);
    } else {
      user = await this.repository.findOne({
        where: { id },
        relations: ['transactionsAsSender'],
      });
      user.transactionsAsSender.push(tx);
    }

    return this.repository.save(user);
  }

  getTx(id: number) {
    return this.transactionService.findByUserId(id);
  }

  findAll() {
    return this.repository.find({
      select: ['id', 'name', 'surname', 'email', 'city', 'country'],
    });
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne({ where: { ...cond } });
  }

  addToBalance(id: number, amount: number) {
    return this.repository.increment({ id }, 'balance', amount);
  }
}
