export const userInfoSchema = [
  {
    heading: "Personal Information",
    content: {
      name: {
        key: "Name",
        value: "",
      },
      dob: {
        key: "Date of Birth",
        value: "",
      },
      gender: {
        key: "Gender",
        value: "",
      },
      workingAt: {
        key: "Working At",
        value: "",
      },
    },
  },
  {
    heading: "Social Information",
    content: {
      linkedin: {
        key: "Linkedin",
        value: "",
      },
      github: {
        key: "Github",
        value: "",
      },
      facebook: {
        key: "Facebook",
        value: "",
      },
      instagram: {
        key: "Instagram",
        value: "",
      },
      website: {
        key: "Your website or blog",
        value: "",
      },
    },
  },
  {
    heading: "Communication Details",
    content: {
      email: {
        key: "Email",
        value: "",
      },
      optionalEmail: {
        key: "Option Email",
        value: "",
      },
      homeTown: {
        key: "Hometown",
        value: "",
      },
      country: {
        key: "Country",
        value: "",
      },
      address: {
        key: "Address",
        value: "",
      },
      pincode: {
        key: "Pin Code",
        value: "",
      },
      mobile: {
        key: "Contact Number",
        value: "",
      },
    },
  },
];

export const editUserPageFields = {
  headings: [
    {
      name: "Personal",
      refId: "personal-section",
      tabIndex: "0",
      areaSelected: true,
      className: "edit-links active",
    },
    {
      name: "Social",
      refId: "social-section",
      tabIndex: "1",
      areaSelected: false,
      className: "edit-links",
    },
    {
      name: "Communication",
      refId: "communication-section",
      tabIndex: "1",
      areaSelected: false,
      className: "edit-links",
    },
  ],
  formSection: {
    social: {
      id: "social-section",
      className: "accountedit-section",
      fields: [
        {
          keyName: "Linkedin",
          name: "linkedin",
          type: "text",
          mandatory: true,
          placeholder: "Enter Linkedin id",
        },
        {
          keyName: "Github",
          name: "github",
          type: "text",
          mandatory: false,
          placeholder: "Enter Github",
        },
        {
          keyName: "Whatsapp",
          name: "whatsapp",
          type: "text",
          mandatory: false,
          placeholder: "Enter Whatsapp No",
        },
        {
          keyName: "Facebook",
          name: "facebook",
          type: "text",
          mandatory: false,
          placeholder: "Enter Facebook",
        },
        {
          keyName: "Instagram",
          name: "instagram",
          type: "text",
          mandatory: false,
          placeholder: "Enter Instagram",
        },
        {
          keyName: "Your Website or Blog",
          name: "personalWebsite",
          type: "text",
          mandatory: false,
          placeholder: "Enter Your Website or Blog",
        },
      ],
    },
    communication: {
      id: "communication-section",
      className: "accountedit-section",
      fields: [
        {
          keyName: "Email",
          name: "email",
          type: "email",
          mandatory: true,
          placeholder: "Enter email",
        },
        {
          keyName: "Option Email",
          name: "optionalEmail",
          type: "email",
          mandatory: false,
          placeholder: "Enter optional email",
        },
        {
          keyName: "Hometown",
          name: "hometown",
          type: "text",
          mandatory: false,
          placeholder: "Enter hometown",
        },
        {
          keyName: "Country",
          name: "country",
          type: "text",
          mandatory: false,
          placeholder: "Enter country",
        },
        {
          keyName: "Address",
          name: "address",
          type: "textarea",
          mandatory: false,
          placeholder: "Enter address",
        },
        {
          keyName: "Pincode",
          name: "pin",
          type: "text",
          mandatory: false,
          placeholder: "Enter pincode",
        },
        {
          keyName: "Contact Number",
          name: "mobile",
          type: "text",
          mandatory: false,
          placeholder: "Enter contact no",
        },
      ],
    },
  },
};
