import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import AddPetitionFormEmailSection from './AddPetitionFormControls';
import { FormContext } from '../contexts/FormContext';

const AddPetitionForm = ({ onSubmit }) => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        console.log(data);
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='text' varName='group_name' visibleName='group name' />
                <FormTextInput type='textarea' varName='petition_text' visibleName='petition text' />
                <AddPetitionFormEmailSection />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Create New Petition"/>
        </form>
    );
}

export default AddPetitionForm;
