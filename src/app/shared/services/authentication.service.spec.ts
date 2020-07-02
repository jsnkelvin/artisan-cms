import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { JwtAuthModule } from 'src/app/jwt-auth.module';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtAuthModule, HttpClientModule],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
