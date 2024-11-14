import * as Yup from 'yup'

export const logSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').matches(),
 
})