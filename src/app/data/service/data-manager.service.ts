
export class DataManagerService {
  objects: GameObject[];
  asd: testClass;

  constructor() {
    this.objects = [];
  }

  public LoadFile(FilePath: string): boolean {
    return false;
  }

  public Test(): string {
    // this.showConfig();
    console.log('test');
    return '';
  }

  public AddItem(object: GameObject): void {
    this.objects.push(object);
  }
}
