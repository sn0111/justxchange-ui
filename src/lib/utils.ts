// here we define common functions that will be used in the application
export const trimSpacesBetween = (name: string) => {
  return name.replace(/\s+/g, ' ').trim();
};
export const convertCamelToTitleCase = (camelCaseStr: string) => {
  const titleCaseStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  return titleCaseStr;
};
