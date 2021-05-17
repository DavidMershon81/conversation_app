import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import AddPetitionFormEmailSection from './AddPetitionFormControls';
import { FormContext } from '../contexts/FormContext';

const AddPetitionForm = () => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
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
