import { TestBed } from '@angular/core/testing';

import { ExampleService } from './example.service';
import { JwtAuthModule } from 'src/app/jwt-auth.module';
import { HttpClientModule } from '@angular/common/http';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtAuthModule, HttpClientModule],
    });
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
