export const nameTransformer = (name) => {
  const userName = name.split(" ");
  return userName
    .map((letter) => {
      return letter[0];
    })
    .join(" ");
};
