const md3 = {
  name: "do one pushup",
  isDesired: true,
  cue: {
    time: undefined,
    location: undefined,
    habit: "make the bed",
  },
};

const md2 = {
  name: "make the bed",
  isDesired: true,
  cue: {
    time: undefined,
    location: undefined,
    habit: "wake up",
  },
};

export const md1 = {
  name: "wake up",
  isDesired: true,
  cue: {
    time: "06:00",
    location: undefined,
    habit: undefined,
  },
};

export const MOCK_DESIRED_HABITS = [md1, md2, md3];
