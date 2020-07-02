import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtAuthModule } from 'src/app/jwt-auth.module';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtAuthModule, HttpClientModule, RouterTestingModule],
      providers: [],
    });
  });

  it('should ...', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
