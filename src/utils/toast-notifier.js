const DEFAULT_DURATION = 2000; // seconds

export class ToastNotifier {
  static success(toast, message, options = {}) {
    toast.open({
      message,
      type: "is-success",
      duration: DEFAULT_DURATION,
      ...options
    });
  }

  static error(toast, message, options = {}) {
    toast.open({
      message,
      type: "is-danger",
      duration: DEFAULT_DURATION,
      ...options
    });
  }
}
