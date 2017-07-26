///<reference path="../../../typings/globals/jquery/index.d.ts" />
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-date',
    templateUrl: 'date.component.html'
})

export class DateComponent {
    daySelected;

    @Input() type;          // day, month, year or custom
    @Input() startDate;         // date from which reports are available
    @Input() endDate: string;

    @Input() defaultDate: string;
    @Input() disabledDate: string;

    @ViewChild('day') dayElement: ElementRef;
    @ViewChild('span') spanElement: ElementRef;
    @Output() dateChange = new EventEmitter();

    // minView = ;

    ngOnChanges() {
        if (this.defaultDate === '0000-00-00') {
            this.defaultDate = '';
        }

        (<any>$(this.dayElement.nativeElement))
            .datetimepicker({
                minView: this.type == 'day' ? 2 : 0,
                // startView: 2,
                format: this.type == 'day' ? 'yyyy-mm-dd' : 'yyyy-mm-dd hh:ii',
                allowInputToggle: true,
                autoclose: true,
                datesDisabled: [this.disabledDate],
            }).on('changeDate', selected => {
                this.daySelected = selected.date;
                (<any>$(this.dayElement.nativeElement)).datetimepicker('hide');

                let result;

                switch (this.type) {
                    case 'day':
                        result = this.daySelected.getFullYear() + '-' +
                            (('0' + (this.daySelected.getMonth() + 1)).slice(-2)) + '-' +
                            (('0' + this.daySelected.getDate()).slice(-2));
                        break;
                    case 'time':
                        result = this.daySelected.getFullYear() + '-' +
                            (('0' + (this.daySelected.getMonth() + 1)).slice(-2)) + '-' +
                            (('0' + this.daySelected.getDate()).slice(-2)) + ' ' +
                            (('0' + this.daySelected.getHours()).slice(-2)) + ':' +
                            (('0' + this.daySelected.getMinutes()).slice(-2));
                        break;
                }
                this.dateChange.emit(result);
            });


        (<any>$(this.spanElement.nativeElement))
            .datetimepicker({
                minView: this.type == 'day' ? 2 : 0,
                // startView: 2,
                format: this.type == 'day' ? 'yyyy-mm-dd' : 'yyyy-mm-dd hh:ii',
                allowInputToggle: true,
                autoclose: true,
                datesDisabled: [this.disabledDate],
            }).on('changeDate', selected => {
                var daySelected = selected.date;
                var result = '';
                (<any>$(this.spanElement.nativeElement))
                    .datetimepicker({
                        minView: this.type == 'day' ? 2 : 0,
                        // startView: 2,
                        format: this.type == 'day' ? 'yyyy-mm-dd' : 'yyyy-mm-dd hh:ii',
                        allowInputToggle: true,
                        autoclose: true,
                        datesDisabled: [this.disabledDate],
                    });

                result = daySelected.getFullYear() + '-' +
                    (('0' + (daySelected.getMonth() + 1)).slice(-2)) + '-' +
                    (('0' + daySelected.getDate()).slice(-2));


                (<any>$(this.dayElement.nativeElement)).val(result);
                // this.daySelected = selected.date;
                this.dateChange.emit(result);
            });

        // if (this.type == 'day') {
        //     (<any>$(this.dayElement.nativeElement)).datetimepicker('setMinViewMode', 2);
        //     (<any>$(this.spanElement.nativeElement)).datetimepicker('setDatesDisabled', [this.disabledDate]);
        // }

        if (this.disabledDate) {
            (<any>$(this.dayElement.nativeElement)).datetimepicker('setDatesDisabled', [this.disabledDate]);
            (<any>$(this.spanElement.nativeElement)).datetimepicker('setDatesDisabled', [this.disabledDate]);
        }

        if (this.startDate) {
            (<any>$(this.dayElement.nativeElement)).datetimepicker('setStartDate', new Date(this.startDate));
            (<any>$(this.spanElement.nativeElement)).datetimepicker('setStartDate', new Date(this.startDate));
        }

        if (this.defaultDate) {
            (<any>$(this.dayElement.nativeElement)).datetimepicker('update', new Date(this.defaultDate));
            (<any>$(this.spanElement.nativeElement)).datetimepicker('update', new Date(this.defaultDate));
        }

        if (this.endDate) {
            (<any>$(this.dayElement.nativeElement)).datetimepicker('setEndDate', new Date(this.endDate));
            (<any>$(this.spanElement.nativeElement)).datetimepicker('setEndDate', new Date(this.endDate));
        }


    }

}