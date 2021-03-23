import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { calendarDayMock } from 'src/app/testing-mocks';
import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DayComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    component.weekDay = calendarDayMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnChange', () => {
    it('should set dayStyle to marked when isMarked value changes to true', () => {
      component.isToday = false;
      component.isMarked = true;
      component.ngOnChanges({ isMarked: new SimpleChange(false, true, false) });

      expect(component.dayStyle).toEqual('day__marked');
    });

    it('should set dayStyle to other when isMarked value changes to false and isToday false', () => {
      component.ngOnChanges({ isMarked: new SimpleChange(true, false, false) });

      expect(component.dayStyle).toEqual('day__other');
    });
  });

  describe('#ngOnInit', () => {
    it('should set dayStyle to today when isMarked value is false and isToday true', () => {
      component.isMarked = false;
      component.isToday = true;
      component.ngOnInit();

      expect(component.dayStyle).toEqual('day__today');
    });

    it('should set calendarItemWrapper to weekend when isWeekend true', () => {
      component.isWeekend = true;
      component.ngOnInit();

      expect(component.calendarItemWrapper).toEqual('weekend');
    });

    it('should set calendarItemWrapper to weekday when isWeekend false', () => {
      component.isWeekend = false;
      component.ngOnInit();

      expect(component.calendarItemWrapper).toEqual('weekday');
    });
  });

  describe('#onWeekDayMarked', () => {
    it('should emit event', () => {
      jest.spyOn(component.daySelected, 'emit');
      component.onWeekDayMarked(2);

      expect(component.daySelected.emit).toHaveBeenCalledWith(2);
    });
  });
});
