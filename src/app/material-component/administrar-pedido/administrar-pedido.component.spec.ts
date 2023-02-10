import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPedidoComponent } from './administrar-pedido.component';

describe('AdministrarPedidoComponent', () => {
  let component: AdministrarPedidoComponent;
  let fixture: ComponentFixture<AdministrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
