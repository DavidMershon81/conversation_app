import { useForm } from 'react-hook-form';
import { FormTextInput, FormHiddenInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const AddPetitionForm = ({ onSubmit, petitionGroupId }) => {
    const { loggedIn } = useContext(AppContext);
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        console.log(data);
        onSubmit(data);
    };

    if(!loggedIn) {
        return <Redirect to='/login' />
    }
    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='text' varName='subject' visibleName='subject' />
                <FormTextInput type='textarea' varName='petition_text' visibleName='petition text' />
                <FormHiddenInput varName='petition_group_id' varValue={petitionGroupId} />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Add New Petition"/>
        </form>
    );
}

export default AddPetitionForm;
