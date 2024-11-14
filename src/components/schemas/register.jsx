import * as Yup from 'yup'

export const regSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),

    name: Yup.string()

        .min(2, 'Too Short!')

        .max(50, 'Too Long!')

        .required('Required'),



    password: Yup.string().required('Required').matches(/^[A-Z][a-z0-9]{3,7}$/),
    cPassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'not match password')

})