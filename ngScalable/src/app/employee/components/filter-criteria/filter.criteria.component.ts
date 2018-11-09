import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ParamService } from '../../services';

@Component({
  selector: 'app-filter-criteria',
  templateUrl: 'filter-criteria.component.html'
})
export class FilterCriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  private _hitCount: number;
  get hitCount(): number {
    return this._hitCount;
  }
  @Input()
  set hitCount(v: number) {
    this._hitCount = v;
    // Getter / Setter Way
    if (this._hitCount === 0) {
      this.hitCountMessage = 'no employees found.';
    } else {
      this.hitCountMessage = `${this._hitCount} hits`;
    }
  }

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput')
  input: ElementRef;

  // Working with Observable
  // @ViewChild(NgModel)
  // inputModel: NgModel;

  hitCountMessage: string;

  // Getter / Setter Way
  public get listFilter(): string {
    return this.paramService.keyword;
  }
  public set listFilter(v: string) {
    this.paramService.keyword = v;
    this.valueChange.emit(v);
  }

  constructor(private paramService: ParamService) {}

  ngOnInit() {
    // Working with Observable
    // this.inputModel.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }

  // ngOnChanges Way
  ngOnChanges(changes: SimpleChanges) {
    //     if (changes['hitCount']) {
    //       if (this._hitCount === 0) {
    //         this.hitCountMessage = 'no employees found.';
    //       } else {
    //         this.hitCountMessage = `${this._hitCount} hits`;
    //       }
    //     }
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  // two-way databinding, the long way
  onValueChange(value: string) {
    this.listFilter = value;
  }
}
