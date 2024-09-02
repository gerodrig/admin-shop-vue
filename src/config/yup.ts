import * as yup from 'yup';

yup.setLocale({
    mixed: {
        default: 'Invalid',
        required: 'This field is required',
        oneOf: 'Please select an option ${values}',
        notOneOf: 'Please select one of the available options ${values}',
        notType: 'Invalid type',
    },
});

