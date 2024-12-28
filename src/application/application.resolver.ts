import { Resolver, Query } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';
import { PrivacyPolicy } from './dto/privacy-policy.dto';
import { privacyPlicyData } from './data/privacy-policy';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Query(()=>[PrivacyPolicy])
  privacyPolicy() {
    return privacyPlicyData
  }
  
}
