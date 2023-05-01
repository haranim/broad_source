import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTestOneComponent } from './code-test-one.component';

describe('CodeTestOneComponent', () => {
  let component: CodeTestOneComponent;
  let fixture: ComponentFixture<CodeTestOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTestOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTestOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
