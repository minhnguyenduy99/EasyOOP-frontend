const DEFAULT_DELAY = 1000;

export default class FunctionDelayer {
  _current;
  _delay;
  _handler;
  _watcher;

  constructor(delay = DEFAULT_DELAY) {
    this._delay = delay;
    this._current = 0;
  }

  reset() {
    clearTimeout(this._watcher);
    this._watcher = null;
  }

  execute(handler) {
    this.reset();
    this._watcher = setTimeout(() => {
      handler?.();
    }, this._delay);
  }
}
