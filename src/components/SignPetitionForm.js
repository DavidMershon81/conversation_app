import { useForm } from 'react-hook-form';
import { FormTextInput, FormHiddenInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignPetitionForm = ({ onSubmit, petition }) => {
    const { loggedInUser } = useContext(AppContext);
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='number' varName='reveal_threshold' visibleName='reveal threshold' />
                <FormHiddenInput varName='petition_id' varValue={petition['id']} />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value='Sign Petition'/>
        </form>
    );
}

export default SignPetitionForm;
