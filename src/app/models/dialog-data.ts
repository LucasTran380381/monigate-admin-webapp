export class DialogData {
  title: string;
  content?: string;
  onAccept: any;
  onCancel?: any;
  acceptLabel: string;
  cancelLabel: string;

  constructor(title: string, onAccept: any, acceptLabel: string, cancelLabel: string, content?: string) {
    this.title = title;
    this.content = content;
    this.onAccept = onAccept;
    this.acceptLabel = acceptLabel;
    this.cancelLabel = cancelLabel;
  }
}
