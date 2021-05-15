import { useState } from 'react';
import { FormTextInput, FormRadioButtonGroup } from './FormControls';

const AddPetitionFormRadioBtnGroup = ({register, toggleEmailType, errors }) => {
    const radioButtonsConfig = [
        { valueName: 'listserv', valueText: 'Send petition to a single mailing list' },
        { valueName: 'custom_emails', valueText: 'Send petition to a list of email addresses' }
    ];

    return (
        <FormRadioButtonGroup 
            register={register} 
            varName='email_notification_type' 
            visibleName='email notification type' 
            buttonsConfig={radioButtonsConfig} 
            onClick={toggleEmailType} errors={errors} 
        />
    );
};

const AddPetitionFormEmailSection = ({ register, unregister, watch, errors }) => {
    const [customEmails, setCustomEmails] = useState([]);
    const selectedRadioBtn = watch("email_notification_type");

    const addCustomEmail = () => {
        const nextIndex = `custom_email_${customEmails.length}`;
        setCustomEmails([...customEmails, nextIndex]);
    };

    const toggleEmailType = (valueName) => {
        if(valueName === 'listserv') {
            unregister(customEmails);
            setCustomEmails([]);
        }
        else if(valueName === 'custom_emails') {
            unregister(['mailing_list_email', 'max_users']);
            addCustomEmail();
        }
    };

    return (
        <fieldset className='notification_emails_section'>
            <AddPetitionFormRadioBtnGroup register={register} toggleEmailType={toggleEmailType} errors={errors}/>
            { selectedRadioBtn === 'custom_emails' && (    
            <fieldset className='notification_emails_section'>
                { customEmails.map((ce) => (<FormTextInput key={ce} register={register} errors={errors} type='email' varName={ce} visibleName={ce} />)) }
                <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
            </fieldset>)}
            
            {selectedRadioBtn === 'listserv' && (
            <fieldset className='notification_emails_section'>
                <FormTextInput register={register} errors={errors} type='email' varName='mailing_list_email' visibleName='mailing list email' />
                <FormTextInput register={register} errors={errors} type='number' varName='max_users' visibleName='maximum number of petition signers' />
            </fieldset>)}
        </fieldset>
    );
};

export default AddPetitionFormEmailSection;