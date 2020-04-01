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
            name: 'Starship 1',
            crew: 2,
            hyperdriveRating: 100,
            costInCredits: 65,
            cargoCapacity: 7,
            length: 54,
            maxAtmospheringSpeed: 66,
            passengers: 2
          } as Starship,
          {
            id: 'id2',
            name: 'Starship 2',
            crew: 3,
            hyperdriveRating: 1000,
            costInCredits: 45,
            cargoCapacity: 3,
            length: 74,
            maxAtmospheringSpeed: 68,
            passengers: 6
          } as Starship,
          {
            id: 'id3',
            name: 'Starship 3',
            crew: 5,
            hyperdriveRating: 10,
            costInCredits: 35,
            cargoCapacity: 17,
            length: 80,
            maxAtmospheringSpeed: 57,
            passengers: 8
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

  it('should show 3 progresss bars', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.progress div').length).toEqual(3);
  });


  it('Should show Starship 1 and it value for Crew is 6', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.progress-name').textContent).toContain('Starship 1');
    expect(compiled.querySelector('.attribute-value').textContent).toContain('100');
  });


  it('should get three objects as response', () => {
    listComponent.ngOnInit();
    const expectedStarshipData = [{name: 'Starship 1', attributeValue: 100, percentage: (2 / 3) * 100},
      {name: 'Starship 2', attributeValue: 1000, percentage: 100},
      {name: 'Starship 3', attributeValue: 10, percentage: (1 / 3) * 100},
    ] as Array<StarshipData>;
    expect(listComponent.ships).toEqual(expectedStarshipData);
  });

  it('Should show the first value with button 2 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option2');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(65);
  });

  it('Should show the first value with button 3 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option3');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(2);
  });

  it('Should show the first value with button 1 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option1');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(7);
  });

  it('Should show the first value with button 5 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option5');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(54);
  });

  it('Should show the first value with button 6 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option6');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(66);
  });

  it('Should show the first value with button 7 cliked', () => {
    fixture.detectChanges();
    const button = compiled.querySelector('#option7');
    button.click();
    expect(button.checked).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('.attribute-value').textContent).toContain(2);
  });

});

