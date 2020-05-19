# Content-organizer

Example from template-tab.component.html
````

<app-content-organizer-module [objectTemplateListObservable]="templateTabService.GetObjectTemplatesObservable()"
                              [characterTemplateListObservable]="templateTabService.GetCharacterTemplatesObservable()"
                              (addObjectTemplate)="templateTabService.AddObjectTemplate()"
                              (addCharacterTemplate)="templateTabService.AddCharacterTemplate()"
                              (copyObject)="templateTabService.CopyTemplate($event)"
                              (deleteObject)="templateTabService.DeleteTemplate($event)"
                              (selectObject)="templateTabService.SelectObject($event)">
</app-content-organizer-module>
````
Example from content-organizer-module.component.html
````
<div *ngIf="objectTemplateList">
  <div *ngFor="let template of objectTemplateList">
    <span (click)="selectObject.emit(template.id)">{{template.Properties.Name.value}}</span>
    <span (click)="copyObject.emit(template.id)">Copy</span>
    <span (click)="deleteObject.emit(template.id)">Delete</span>
  </div>
  <div (click)="addObjectTemplate.emit()">+ Object Template</div>
</div>

<div *ngIf="characterTemplateList">
  <div *ngFor="let template of characterTemplateList">
    <span (click)="selectObject.emit(template.id)">{{template.Properties.Name.value}}</span>
    <span (click)="copyObject.emit(template.id)">Copy</span>
    <span (click)="deleteObject.emit(template.id)">Delete</span>
  </div>
  <div (click)="addCharacterTemplate.emit()">+ Character Template</div>
</div>
````
## Inputs
### @Input() objectTemplateListObservable: Observable<GameObjectTemplate[]>;
### @Input() characterTemplateListObservable: Observable<GameCharacterTemplate[]>;

The component takes the observable and subscribe to it.
The list will be displayed.
The objects need a id the property "Name: {Value: sting}".

## Outputs
### @Output() addObjectTemplate = new EventEmitter();
Will be triggered when the "+ Add" is clicked.

### @Output() copyObject = new EventEmitter<number>();
Will be triggered when the "Copy" is clicked.
The event return the object id.

### @Output() deleteObject = new EventEmitter<number>();
Will be triggered when the "Delete" is clicked.
The event return the object id.

### @Output() selectObject = new EventEmitter<number>();
Will be triggered when the name of the object is clicked.
The event return the object id.

### @Output() addObjectTemplate = new EventEmitter();
Will be triggered when the "+ Object Template" is clicked.

### @Output() addCharacterTemplate = new EventEmitter();
Will be triggered when the "+ Character Template" is clicked.
