import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const RegisterUserForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitClick = (data) => {
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, errors }}>
                <FormTextInput type='email' varName='email' visibleName='email' />
                <FormTextInput type='password' varName='password' visibleName='password' />
                <FormTextInput type='password' varName='confirm_password' visibleName='confirm password' />
                <FormTextInput type='text' varName='first_name' visibleName='first name' />
                <FormTextInput type='text' varName='last_name' visibleName='last name' />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Register Account"/>
        </form>
    );
}

export default RegisterUserForm;
