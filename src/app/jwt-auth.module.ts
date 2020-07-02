import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CacheService } from './shared/services';

export function jwtOptionsFactory(cache) {
  return {
    tokenGetter: () => {
      return cache.getToken();
    },
    whitelistedDomains: [environment.api_url],
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CacheService],
      },
    }),
  ],
  providers: [CacheService],
})
export class JwtAuthModule {}
