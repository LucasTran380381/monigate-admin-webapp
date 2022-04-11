export class IssueType {
  id: string
  name: string
  description: string
  status: IssueStatus

  constructor(src: any) {
    this.name = src.issueType.name;
    this.description = src.issueType.description
    this.status = src.status
    this.id = src.issueTypeId
  }

  get friendlyStatus() {
    switch (this.status) {
      case IssueStatus.opened:
        return 'Đã tiếp nhận'
      case IssueStatus.processing:
        return 'Đang xử lý'
      case IssueStatus.closed:
        return 'Đã xử lý'
      default:
        return this.status
    }
  }

  get colorStatus() {
    switch (this.status) {
      case IssueStatus.opened:
        return 'red'
      case IssueStatus.processing:
        return 'orange'
      case IssueStatus.closed:
        return 'green'
      default:
        return ''
    }
  }

  get statusOptions() {
    switch (this.status) {
      case IssueStatus.opened:
        return [{
          value: IssueStatus.processing,
          name: 'Đang xử lý',
        }, {
          value: IssueStatus.closed,
          name: 'Đã xử lý',
        }]
      case IssueStatus.processing:
        return [{
          value: IssueStatus.closed,
          name: 'Đã xử lý',
        }]
      case IssueStatus.closed:
        return []
      default:
        return []
    }
  }
}

export enum IssueStatus {
  opened = 100,
  processing = 200,
  closed = 300

}
