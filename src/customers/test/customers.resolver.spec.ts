import { Test, TestingModule } from '@nestjs/testing';
import { CustomersResolver } from '../resolvers/customers.resolver';
import { CustomersService } from '../services/customers.service';

describe('CustomersResolver', () => {
  let resolver: CustomersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersResolver, CustomersService],
    }).compile();

    resolver = module.get<CustomersResolver>(CustomersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
