import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl.ability.factory';
import { PoliciesGuard } from './policyGuard';

@Module({
  providers: [CaslAbilityFactory, PoliciesGuard],
  exports: [CaslAbilityFactory, ],
})
export class CaslModule {}