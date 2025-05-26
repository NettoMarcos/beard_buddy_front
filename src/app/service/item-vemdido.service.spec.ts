import { TestBed } from '@angular/core/testing';

import { ItemVemdidoService } from './item-vemdido.service';

describe('ItemVemdidoService', () => {
  let service: ItemVemdidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemVemdidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
