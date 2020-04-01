import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from './list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JsonService} from "./json.service";

describe('ListComponent', () => {

  let fixture: ComponentFixture<ListComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        ListComponent
      ],
      providers: [
        JsonService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    compiled = fixture.nativeElement;
  }));

  it('should create the list', () => {
    const list = fixture.componentInstance;
    expect(list).toBeTruthy();
  });

  it('should show buttons', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('input[type=radio]').length).toEqual(7);
  });

  it('should show 37 progresss bars', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.progress div').length).toEqual(37);
  });

  it('Should show Belbullab-22 starfighter starship', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.progress-name').textContent).toContain('Belbullab-22 starfighter');
  });

  it('Should show 6 like a value attribute', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain('6');
  });

  it('Should show 3 like a value attribute', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value')[3].textContent).toContain('3');
  });

  button = querySelector('.btn-secondary input')[1].nativeElement;
  it('Should show 3 like a value attribute', () => {
    button.click();
    fixture.detectChanges();
    expect(button.checked).toBeTruthy();
    expect(compiled.querySelector('.attribute-value')[3].textContent).toContain('3');
  });

});

