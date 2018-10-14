import {
  formatFontFamilyMap,
  isValidUnit,
  unitOperation,
  addPx,
  subtractPx,
  dividePx,
  multiplyPx
} from './utils.js';

it('Formats Sass font-family map properly', () => {
  expect(formatFontFamilyMap("('Poppins', 'Helvetica Neue', sans-serif)")).toEqual("'Poppins', 'Helvetica Neue', sans-serif");
});

it('Validates px unit', () => {
  expect(isValidUnit('10px', 'px')).toBeTruthy();
});
it('Validates em unit', () => {
  expect(isValidUnit('10em', 'em')).toBeTruthy();
});
it('Validates rem unit', () => {
  expect(isValidUnit('10rem', 'rem')).toBeTruthy();
});
it('Validates vmin unit', () => {
  expect(isValidUnit('10vmin', 'vmin')).toBeTruthy();
});
it('Validates % unit', () => {
  expect(isValidUnit('10%', '%')).toBeTruthy();
});
it('Validates unitless unit', () => {
  expect(isValidUnit('10')).toBeTruthy();
});
it('Validates int unit', () => {
  expect(isValidUnit(10)).toBeTruthy();
});

it('Operation - Add px & int values', () => {
  expect(unitOperation('10px', '10', '+', 'px')).toEqual('20px');
});
it('Operation - Add px & int values', () => {
  expect(unitOperation('10px', 10, '+', 'px')).toEqual('20px');
});
it('Operation - Subtract em values', () => {
  expect(unitOperation('30em', '10em', '-', 'em')).toEqual('20em');
});
it('Operation - Divide % values', () => {
  expect(unitOperation('100%', '5', '/', '%')).toEqual('20%');
});
it('Operation - Multiplies rem values', () => {
  expect(unitOperation('5rem', '4', '*', 'rem')).toEqual('20rem');
});

it('Adds px values', () => {
  expect(addPx('10px', '10px')).toEqual('20px');
});
it('Subtracts px values', () => {
  expect(subtractPx('30px', '10px')).toEqual('20px');
});
it('Multiplies px values', () => {
  expect(multiplyPx('10px', 2)).toEqual('20px');
});
it('Divides px values', () => {
  expect(dividePx('40px', 2)).toEqual('20px');
});
