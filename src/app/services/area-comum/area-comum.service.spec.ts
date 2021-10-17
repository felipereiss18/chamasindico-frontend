import { TestBed } from '@angular/core/testing';

import { AreaComumService } from './area-comum.service';

describe('AreaComumService', () => {
  let service: AreaComumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaComumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
