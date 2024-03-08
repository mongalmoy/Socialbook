export const config = {
  name: {
    maxLen: {
      value: 50,
      message: "maximum 50 characters are allowed",
    },
    minLen: {
      value: 3,
      message: "minimum 3 characters required",
    },
    pattern: {
      value: "/^[a-zA-Z ]+$/",
      message: "please enter correct name",
    },
  },
  dob: {
    max: {
      value: new Date().toISOString().slice(0, 10),
      message: "please enter between 1950-present year",
    },
    min: {
      value: "1950-01-01",
      message: "please enter between 1950-present year",
    },
  },
  websiteLink: {
    pattern: {
      value: "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
      message: "please enter correct link",
    },
  },
  email: {
    pattern: {
      value: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i",
      message: "please enter correct email",
    },
  },
};
