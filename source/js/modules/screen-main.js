import AccentTypographyBuild from './accent-typography-builder';

const introTitle = new AccentTypographyBuild(`.intro__title`, 500, `active`, `transform`);
// const introDate = new AccentTypographyBuild(`.intro__date`, 500, `active`, `transform`);

setTimeout(() => {
  introTitle.runAnimation();
}, 500);

// setTimeout(() => {
//   introDate.runAnimation();
// }, 1000);
