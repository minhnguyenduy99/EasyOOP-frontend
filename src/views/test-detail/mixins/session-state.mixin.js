export const sessionStateInjector = () => ({
  inject: ["$startSession", "$endSession", "TEST_SESSION_STATES"],
  props: {
    state: Number
  },
  computed: {
    isOnInit() {
      return this.state === this.TEST_SESSION_STATES.INIT;
    },
    isOnProgress() {
      return this.state === this.TEST_SESSION_STATES.ON_PROGRESS;
    },
    isFinished() {
      return this.state === this.TEST_SESSION_STATES.FINISHED;
    }
  }
});

export const sessionStateProvider = Vue => ({
  provide() {
    return {
      $startSession: this.$startSession.bind(this),
      $endSession: this.$endSession.bind(this),
      TEST_SESSION_STATES: this.TEST_SESSION_STATES
    };
  },
  data: () => ({
    TEST_SESSION_STATES: {
      INIT: 0,
      ON_PROGRESS: 1,
      FINISHED: 2
    },
    state: 0
  }),
  computed: {
    isOnInit() {
      return this.state === this.TEST_SESSION_STATES.INIT;
    },
    isOnProgress() {
      return this.state === this.TEST_SESSION_STATES.ON_PROGRESS;
    },
    isFinished() {
      return this.state === this.TEST_SESSION_STATES.FINISHED;
    }
  },
  methods: {
    $getState() {
      return this.state;
    },
    $startSession() {
      this.state = this.TEST_SESSION_STATES.ON_PROGRESS;
    },
    $endSession() {
      this.state = this.TEST_SESSION_STATES.FINISHED;
      this.$emit("session-ended");
    }
  }
});
