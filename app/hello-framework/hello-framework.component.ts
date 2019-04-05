import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, from, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchAll, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hello-framework',
  styleUrls: ['./hello-framework.component.scss'],
  templateUrl: './hello-framework.component.html',
})
export class HelloFrameworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myInput') public myInput: ElementRef;
  @Input()
  public name: string;
  @Input()
  public version: number;
  @Output()
  readonly release: EventEmitter<void> = new EventEmitter();
  public results: string[] = [];

  private subscriptions: Subscription = new Subscription();
  ngAfterViewInit() {
    /*  let autoSuggestA$: Observable<any> = fromEvent(this.myInput.nativeElement, 'keyup').
      pipe(
        filter((event: KeyboardEvent) => String(event.target.value).trim().length >= 3)
        ,debounceTime(200),
        map((event: KeyboardEvent) => {
          const value: string = event.target.value;
          return this.getResultFromServer(value);
        }),
        switchAll()
      );
      this.subscriptions.add(autoSuggestA$.subscribe((results) => {
        console.log('llll:', results);
        this.results = results;
      }));
  */
    let autoSuggestB$: Observable<any> = fromEvent(this.myInput.nativeElement, 'keyup').
      pipe(
        filter((event: KeyboardEvent) => String(event.target.value).trim().length >= 3)
        , debounceTime(200),
        switchMap((event: KeyboardEvent) => {
          const value: string = event.target.value;
          return this.getResultFromServer(value);
        })
      );
    this.subscriptions.add(autoSuggestB$.subscribe((results) => {
      console.log('llll:', results);
      this.results = results;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getResultFromServer(value: string): Observable<string[]> {
    let callToServer = new Promise(function (resolve, reject) {
      setInterval(() => {
        resolve(['dddd'])
      }, 50)
    });

    return from(callToServer);
  }
}
