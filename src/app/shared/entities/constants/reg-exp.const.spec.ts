import {inputPhoneRegExp, inputTextRegExp} from './reg-exp.const';

const inputTextRegExpMock = {
  validValue: 'Сергей',
  testValue: '1Сергей23'
};

const inputPhoneRegExpMock = {
  validValue: '+79261234567',
  testValue: '222111113333'
};

describe('inputTextRegExp', () => {
  it('should not pass invalid value', () => {
    const re = inputTextRegExp.test(inputTextRegExpMock.testValue);

    expect(re).toEqual(false);
  });

  it('should pass valid value', () => {
    const re = inputTextRegExp.test(inputTextRegExpMock.validValue);

    expect(re).toEqual(true);
  });
});

describe('inputPhoneRegExp', () => {
  it('should not pass phone invalid value', () => {
    const re = inputPhoneRegExp.test(inputPhoneRegExpMock.testValue);

    expect(re).toEqual(false);
  });

  it('should pass phone valid value', () => {
    const re = inputPhoneRegExp.test(inputPhoneRegExpMock.validValue);

    expect(re).toEqual(true);
  });
});
