import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxDynamicTableComponent } from '../../../ngx-dynamic-table/src/lib/ngx-dynamic-table.component';
import { Observable, Subject, of, timeout } from 'rxjs';
import { Tableoptions } from '../../../ngx-dynamic-table/src/lib/models/tableoptions.model';
import { TableActionReturn } from '../../../ngx-dynamic-table/src/lib/models/tableaction.model';
import { TableActionEnum } from '../../../ngx-dynamic-table/src/lib/models/tableaction.enum';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgxDynamicTableComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy {
  isVisible: boolean = false
  isSpinnerVisible: boolean = true;

  data$: Observable<any[]>

  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor() {
    this.data$ = of([
      { id: '1', name: 'Tim', date: '01.01.2024 00:00:59', ort: 'Berlin' },
      { id: '2', name: 'Tom', date: '01.01.2023 00:00:59', ort: 'Hamburg' }
    ])
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true
    },2000)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  table: Tableoptions = {
    actions: [
      { name: 'delete', icon: 'trash', action: 1 },
      { name: 'edit', icon: 'edit', action: 2 }
    ],
    columns: [
      { id: '1', name: 'id', header: 'ID', cell: 'id', hidden: true, sortable: true },
      { id: '2', name: 'name', header: 'Name', cell: 'name', hidden: false, sortable: true },
      { id: '3', name: 'date', header: 'Datum/Zeit', cell: 'date', pipe: { name: DatePipe, args: 'dd.MM.YYYY HH:mm:ss'}, hidden: false, sortable: true },
      { id: '4', name: 'ort', header: 'Ort', cell: 'ort', hidden: false, sortable: true },
      // { id: '3', name: 'date', header: 'Date', cell: 'date', pipe: { name: DatePipe, args: 'dd.MM.'}, hidden: false, sortable: true }
    ],
    columnFilter: ['date', 'ort'],
    columnNames: ['name', 'date', 'ort', 'actions'],
    showCount: true,
    showPaginator: false,
    sortColumn: 'date',
    sortStart: 'asc'
  }

  returnTableAction(event: TableActionReturn) {
    switch (event.action) {
      case TableActionEnum.DELETE:

        break
      case TableActionEnum.EDIT:

        break
      default:

    }
  }
}
