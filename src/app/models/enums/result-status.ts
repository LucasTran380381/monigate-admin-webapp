export enum ResultStatus {
  duplicate = 'Duplicate',
  error = 'Error',
  created = 'Created'
}

export namespace ResultStatus {
  export function toString(status: ResultStatus): string {
    switch (status) {
      case ResultStatus.duplicate:
        return 'Trùng mã id';
      case ResultStatus.error:
        return 'Có lỗi xảy ra'
      case ResultStatus.created:
        return 'Thành công';
    }
  }

  export function toMessage(message: string) {
    if (message.includes('Created successfully')) return 'Đã tạo thành công'
    if (message.includes('The field Name must be a string with a maximum length of 50. '))
      return `Tên phòng ban nhỏ hơn 50 ký tự`;
    if (message.includes('The field Id must be a string with a maximum length of 8. '))
      return 'Mã phòng ban phải nhỏ hơn 8 ký tự';
    if (message.includes('Duplicated entry, insertion unavailable'))
      return 'Trùng mã phòng ban'
    else
      return message
  }
}
