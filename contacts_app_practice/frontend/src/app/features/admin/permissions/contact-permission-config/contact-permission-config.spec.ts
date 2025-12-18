import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPermissionConfig } from './contact-permission-config';

describe('ContactPermissionConfig', () => {
  let component: ContactPermissionConfig;
  let fixture: ComponentFixture<ContactPermissionConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPermissionConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPermissionConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
