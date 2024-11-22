import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosServicosComponent } from './produtos-servicos.component';

describe('ProdutosServicosComponent', () => {
  let component: ProdutosServicosComponent;
  let fixture: ComponentFixture<ProdutosServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
