import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardGendersComponent } from './card-genders.component';

describe('CardGendersComponent', () => {
  let component: CardGendersComponent;
  let fixture: ComponentFixture<CardGendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGendersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardGendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
