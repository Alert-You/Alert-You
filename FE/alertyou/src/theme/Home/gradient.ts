// 원본
// const emergencyColor = {
//   light: '#f7b733',
//   dark: '#fc4a1a',
// };

// https://uigradients.com/#Influenza
// const emergencyColor = {
//   light: '#C04848',
//   dark: '#480048',
// };

// https://uigradients.com/#Peach
const emergencyColor = {
  light: '#FFEDBC',
  dark: '#ED4264',
};

// https://uigradients.com/#SweetMorning
// const emergencyColor = {
//   light: '#FFC371',
//   dark: '#FF5F6D',
// };

// 원본
// const nonEmergencyColor = {
//   light: '#85D8CE',
//   dark: '#085078',
// };

// https://uigradients.com/#Mantle
const nonEmergencyColor = {
  light: '#24C6DC',
  dark: '#514A9D',
};

// https://uigradients.com/#AquaMarine
// const nonEmergencyColor = {
//   light: '#26D0CE',
//   dark: '#1A2980',
// };

const reportBtnColor = {
  light: '#ffffff',
  dark: '#24C6DC',
};

export const emergencyBgStyle = {
  linearGradient: {
    colors: [emergencyColor.dark, emergencyColor.light],
    start: [0, 0],
    end: [1, 1],
  },
};

export const nonEmergencyBgStyle = {
  linearGradient: {
    colors: [nonEmergencyColor.dark, nonEmergencyColor.light],
    start: [0, 0],
    end: [1, 1],
  },
};

export const EmergencyInnerBtnStyle = {
  linearGradient: {
    colors: [emergencyColor.dark, emergencyColor.light],
    start: [0, 0],
    end: [1, 1],
  },
};

export const EmergencyOuterBtnStyle = {
  linearGradient: {
    colors: [emergencyColor.light, emergencyColor.dark],
    start: [0, 0],
    end: [1, 1],
  },
};

export const nonEmergencyInnerBtnStyle = {
  linearGradient: {
    colors: [nonEmergencyColor.dark, nonEmergencyColor.light],
    start: [0, 0],
    end: [1, 1],
  },
};

export const nonEmergencyOuterBtnStyle = {
  linearGradient: {
    colors: [nonEmergencyColor.light, nonEmergencyColor.dark],
    start: [0, 0],
    end: [1, 1],
  },
};

export const reportBtnStyle = {
  linearGradient: {
    colors: [reportBtnColor.light, reportBtnColor.dark],
    start: [0, 0],
    end: [1, 1],
  },
};
