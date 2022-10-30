import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @HostBinding('class') className = 'filter-input-container';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() hideIcon: boolean = false;
  iconUrl: string = '';

  ngOnInit(): void {
    this.iconUrl = `../../../assets/desktop/${this.icon}.svg`;
  }

  value: any = null;

  onChange = (_val: any) => {};
  onTouched = () => {};

  writeValue(val: string): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onModelChange(e: any) {
    this.value = e;
    this.onChange(e);
  }
}
