import { TestBed } from '@angular/core/testing';

import { CorrespondenciaService } from './correspondencia.service';

describe('CorrespondenciaService', () => {
  let service: CorrespondenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrespondenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
