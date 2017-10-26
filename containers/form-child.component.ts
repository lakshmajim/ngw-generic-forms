import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'generic-form-child',
    styles: [``],
    template: `
        <ng-container *ngFor="let field of children;">
            <ng-container *ngIf="field?.type!=='container'">
              <ng-container genericField [config]="field" [group]="group"></ng-container>
            </ng-container>
            <ng-container *ngIf="field?.type==='container'">
                <generic-form-parent [formParent]="field" [group]="group">
                </generic-form-parent>
            </ng-container>
      </ng-container>
  `
})
export class FormChildrenComponent implements OnInit {
    @Input()
    children: any[] = [];
    @Input()
    group: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.children
            .filter(control => control.type !== 'container' && control.type !== 'template')
            .forEach(control => this.group.addControl(control.name, this.fb.control(
                {
                    value: control.value,
                    disabled: control.disabled
                },
                control.validators
            )));
    }
}