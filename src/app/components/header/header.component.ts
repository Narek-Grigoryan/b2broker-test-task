import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {Subscription} from "rxjs";
import {isInt} from "../../shared/utils";
import {FilterI} from "./header.models";
import {MaxItemsLengthValidator} from "../../shared/custom-validators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() filterInitialValue: FilterI = {
    timer: 300,
    arraySize: 1000,
    additionalArrayIds: []
  }
  @Output() filtersChange: EventEmitter<FilterI> = new EventEmitter();

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public readonly additionalArrayIds: string[] = [];

  public filtersControlsForm!: FormGroup;

  private _formChangeSubscription$!: Subscription;

  ngOnInit(): void {
    this._initForm();
    this._initFormChangeListener();
  }

  ngAfterViewInit(): void {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && isInt(value)) {
      this.additionalArrayIds.push(value);
      this.filtersControlsForm.controls['additionalArrayIds'].setValue([...this.additionalArrayIds]);
    }

    event.chipInput!.clear();
  }

  public remove(id: string): void {
    const index = this.additionalArrayIds.indexOf(id);

    if (index >= 0) {
      this.additionalArrayIds.splice(index, 1);
      this.filtersControlsForm.controls['additionalArrayIds'].setValue([...this.additionalArrayIds]);
    }
  }

  public edit(id: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(id);
      return;
    }

    const index = this.additionalArrayIds.indexOf(id);
    if (index >= 0) {
      this.additionalArrayIds[index] = value;
      this.filtersControlsForm.controls['additionalArrayIds'].setValue([...this.additionalArrayIds]);
    }
  }

  private _initFormChangeListener(): void {
    this._formChangeSubscription$ = this.filtersControlsForm.valueChanges.subscribe((value) => {
      this.filtersControlsForm.markAllAsTouched();

      if (this.filtersControlsForm.valid) {
        this.filtersChange.emit(value);
      }
    });
  }

  private _initForm(): void {
    this.filtersControlsForm = new FormGroup({
      timer: new FormControl(this.filterInitialValue.timer, [Validators.required, Validators.min(100), Validators.max(5000)]),
      arraySize: new FormControl(this.filterInitialValue.arraySize, [Validators.required, Validators.min(10), Validators.max(1000000)]),
      additionalArrayIds: new FormControl(this.filterInitialValue.additionalArrayIds, [MaxItemsLengthValidator(10)])
    });
  }

  ngOnDestroy(): void {
    this._formChangeSubscription$.unsubscribe();
  }
}
