import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ListComponent, StarshipData} from './list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JsonService, SearchResponse, Starship, StarshipsList} from './json.service';
import {Observable, of} from "rxjs";

describe('ListComponent', () => {

  let fixture: ComponentFixture<ListComponent>;
  let compiled;
  let listComponent: ListComponent;
  let jsonService: JsonService;
  let apiResponse: SearchResponse;

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

    jsonService = TestBed.get(JsonService);
    listComponent = new ListComponent(jsonService);

    apiResponse = {
      data: {
        allStarships: [
          {
            id: 'id1',
            name: 'Nave 1',
            crew: 2,
            hyperdriveRating: 100
          } as Starship,
          {
            id: 'id2',
            name: 'Nave 2',
            crew: 3,
            hyperdriveRating: 1000
          } as Starship,
          {
            id: 'id3',
            name: 'Nave 3',
            crew: 5,
            hyperdriveRating: 10
          } as Starship
        ] as Array<Starship>
      } as StarshipsList
    } as SearchResponse;

    spyOn(jsonService, 'getJson').and.returnValue(of(apiResponse));
    listComponent.ngOnInit();
  }));

  it('should create the list', () => {
    const list = fixture.componentInstance;
    expect(list).toBeTruthy();
  });

  it('should show buttons', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('input[type=radio]').length).toEqual(7);
  });


  it('Should show Nave 1 starship and it value for Crew is 6', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.progress-name').textContent).toContain('Nave 1');
    expect(compiled.querySelector('.attribute-value').textContent).toContain('100');
  });


  it('should get three objects as response', () => {
    listComponent.ngOnInit();
    const expectedStarshipData = [{name: 'Nave 1', attributeValue: 100, percentage: (2 / 3) * 100},
      {name: 'Nave 2', attributeValue: 1000, percentage: 100},
      {name: 'Nave 3', attributeValue: 10, percentage: (1 / 3) * 100},
    ] as Array<StarshipData>;
    expect(listComponent.ships).toEqual(expectedStarshipData);
  });

  it('should show 3 progresss bars', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.progress div').length).toEqual(3);
  });

  it('Should show 100 like a value attribute', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain('100');
  });

  it('Should show Nave 3 starship in the first position', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option3');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(2);
  });

});

