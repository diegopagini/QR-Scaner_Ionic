export class Record {
  public format: string;
  public text: string;
  public type: string;
  public icon: string;
  public created: Date;

  constructor(format: string, text: string) {
    this.format = format;
    this.text = text;
    this.created = new Date();
    this.getType();
  }

  private getType() {
    const initialText: string = this.text.substr(0, 4);

    switch (initialText) {
      case 'http':
        this.type = 'http';
        this.icon = 'globe';
        break;

      case 'geo:':
        this.type = 'geo';
        this.icon = 'pin';
        break;

      default:
        this.type = 'unrecognized';
        this.icon = 'create';
        break;
    }
  }
}
