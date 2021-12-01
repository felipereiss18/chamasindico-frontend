import { TestBed } from '@angular/core/testing';

import { AgendaService } from './agemda.service';

describe('AgemdaService', () => {
  let service: AgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
