import '@/config/yup';

import * as yup from 'yup';

describe('Yup error messages', () => {
  test('Custom error messages are defined', () => {
    const mixedFields = {
      default: 'Invalid',
      required: 'This field is required',
      defined: "${path} must be defined",
      notNull: "${path} cannot be null",
      oneOf: 'Please select an option ${values}',
      notOneOf: 'Please select one of the available options ${values}',
      notType: 'Invalid type',
    };
    expect(yup.defaultLocale.mixed).toStrictEqual(mixedFields);
  });
});
