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

  it('first crew number should be 6', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.progress-name').textContent).toContain('Belbullab-22 starfighter');
  });

});
//
// document.querySelectorAll('.progress-name')[2]
