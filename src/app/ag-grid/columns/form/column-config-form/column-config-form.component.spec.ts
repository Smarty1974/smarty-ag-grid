import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnConfigFormComponent } from './column-config-form.component';

describe('ColumnConfigFormComponent', () => {
  let component: ColumnConfigFormComponent;
  let fixture: ComponentFixture<ColumnConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
