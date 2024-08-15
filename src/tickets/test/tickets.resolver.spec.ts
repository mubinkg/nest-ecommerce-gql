import { Test, TestingModule } from '@nestjs/testing';
import { TicketsResolver } from '../resolvers/tickets.resolver';
import { TicketsService } from '../services/tickets.service';

describe('TicketsResolver', () => {
  let resolver: TicketsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsResolver, TicketsService],
    }).compile();

    resolver = module.get<TicketsResolver>(TicketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
