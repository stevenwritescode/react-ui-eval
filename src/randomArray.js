export function getArray() {
  let arrayOfArrays = [];
  for (let i = 0; i < 10; i++) {
    arrayOfArrays.push(getArrayOfIntegers());
  }
  return arrayOfArrays;
}

const getArrayOfIntegers = () => {
  let array = [];
  for (let i = 0; i < 10; i++) {
    array.push(genRandomSingleDigitInteger());
  }
  return array;
};

const genRandomSingleDigitInteger = () => {
  return Math.floor(Math.random() * 10)
};