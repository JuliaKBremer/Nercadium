# Content-organizer

Example from template-tab.component.html
````

<app-content-organizer-module [objectList]="templateTabService.GetTemplates()"
                              (addObject)="templateTabService.AddTemplate()"
                              (copyObject)="templateTabService.CopyTemplate($event)"
                              (deleteObject)="templateTabService.DeleteTemplate($event)"
                              (selectObject)="selectedTemplate = $event">
</app-content-organizer-module>

````
## Inputs
### [objectList]="IObject[]"

The objectList will be shown in the content-organizer.
The objects need the property "Name: {Value: sting}".

## Outputs
### (addObject)=""
Will be triggered when the "+ Add" is clicked.

### (copyObject)=""
Will be triggered when the "Copy" is clicked.
The event return the object as IObject.

### (deleteObject)=""
Will be triggered when the "Delete" is clicked.
The event return the object as IObject.

### (selectObject)=""
Will be triggered when the name of the object is clicked.
The event return the object as IObject.
