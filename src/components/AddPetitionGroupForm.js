import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextInput, FormRadioButtonGroup } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const AddGroupFormFormRadioBtnGroup = ({ onBtnClick }) => {
    const radioButtonsConfig = [
        { valueName: 'listserv', valueText: 'Send petition to a single mailing list' },
        { valueName: 'custom_emails', valueText: 'Send petition to a list of email addresses' }
    ];

    return (
        <FormRadioButtonGroup 
            varName='email_type' 
            visibleName='email notification type' 
            buttonsConfig={radioButtonsConfig}
            onClick={onBtnClick}
        />
    );
};

const AddPetitionGroupFormEmailSection = () => {
    const { unregister, watch } = useContext(FormContext);
    const [customEmails, setCustomEmails] = useState([]);
    const selectedRadioBtn = watch("email_type");

    const addCustomEmail = () => {
        const nextIndex = `custom_email_${customEmails.length}`;
        setCustomEmails([...customEmails, nextIndex]);
    };

    const onEmailTypeClick = (valueName) => {
        if(valueName === 'listserv') {
            unregister(customEmails);
            setCustomEmails([]);
        }
        else if(valueName === 'custom_emails') {
            unregister(['listserv_email']);
            if(customEmails.length < 1) {
                addCustomEmail();
            }
        }
    };

    return (
        <fieldset className='notification_emails_section'>
            <AddGroupFormFormRadioBtnGroup onBtnClick={onEmailTypeClick} />
            { selectedRadioBtn === 'custom_emails' && (    
            <fieldset className='notification_emails_section'>
                { customEmails.map((ce) => (<FormTextInput key={ce} type='email' varName={ce} visibleName={ce} />)) }
                <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
            </fieldset>)}
            
            {selectedRadioBtn === 'listserv' && (
            <fieldset className='notification_emails_section'>
                <FormTextInput type='email' varName='listserv_email' visibleName='mailing list email' />
            </fieldset>)}
        </fieldset>
    );
};

const AddPetitionGroupForm = ({ onSubmit }) => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        console.log(data);
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='text' varName='group_name' visibleName='group name' />
                <AddPetitionGroupFormEmailSection />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Create New Petition Group"/>
        </form>
    );
}

export default AddPetitionGroupForm;
