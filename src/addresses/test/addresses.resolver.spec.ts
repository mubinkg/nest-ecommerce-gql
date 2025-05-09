import { Test, TestingModule } from '@nestjs/testing';
import { AddressesResolver } from '../resolvers/addresses.resolver';
import { AddressesService } from '../services/addresses.service';

describe('AddressesResolver', () => {
  let resolver: AddressesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesResolver, AddressesService],
    }).compile();

    resolver = module.get<AddressesResolver>(AddressesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
