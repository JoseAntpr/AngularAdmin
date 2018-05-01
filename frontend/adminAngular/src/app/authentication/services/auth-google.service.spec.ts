import { TestBed, inject } from '@angular/core/testing';

import { AuthGoogleService } from './auth-google.service';

describe('AuthGoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGoogleService]
    });
  });

  it('should be created', inject([AuthGoogleService], (service: AuthGoogleService) => {
    expect(service).toBeTruthy();
  }));
});
