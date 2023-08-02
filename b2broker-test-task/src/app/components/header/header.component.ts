import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {Subscription} from "rxjs";
import {isInt} from "../../shared/utils";
import {FilterChangeI} from "./header.models";
import {MaxItemsLengthValidator} from "../../shared/custom-validators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() filtersChange: EventEmitter<FilterChangeI> = new EventEmitter();

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public readonly additionalArrayIds: string[] = [];

  public filtersControlsForm: FormGroup = new FormGroup({
    timer: new FormControl(300, [Validators.required, Validators.min(100), Validators.max(5000)]),
    arraySize: new FormControl(1000, [Validators.required, Validators.min(10), Validators.max(1000000)]),
    additionalArrayIds: new FormControl(this.additionalArrayIds, [MaxItemsLengthValidator(10)])
  });

  private _formChangeSubscription$!: Subscription;

  ngOnInit(): void {
    this._initFormChangeListener();
  }

  ngAfterViewInit(): void {
    this.filtersChange.emit(this.filtersControlsForm.value);
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && isInt(value)) {
      this.additionalArrayIds.push(value);
      this.filtersControlsForm.controls['additionalArrayIds'].setValue(this.additionalArrayIds);
    }

    event.chipInput!.clear();
  }

  public remove(id: string): void {
    const index = this.additionalArrayIds.indexOf(id);

    if (index >= 0) {
      this.additionalArrayIds.splice(index, 1);
      this.filtersControlsForm.controls['additionalArrayIds'].setValue(this.additionalArrayIds);
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
      this.filtersControlsForm.controls['additionalArrayIds'].setValue(this.additionalArrayIds);
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

  ngOnDestroy(): void {
    this._formChangeSubscription$.unsubscribe();
  }
}
