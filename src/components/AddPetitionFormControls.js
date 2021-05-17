import { useState, useContext } from 'react';
import { FormTextInput, FormRadioButtonGroup } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const AddPetitionFormRadioBtnGroup = ({ onBtnClick }) => {
    const radioButtonsConfig = [
        { valueName: 'listserv', valueText: 'Send petition to a single mailing list' },
        { valueName: 'custom_emails', valueText: 'Send petition to a list of email addresses' }
    ];

    return (
        <FormRadioButtonGroup 
            varName='email_notification_type' 
            visibleName='email notification type' 
            buttonsConfig={radioButtonsConfig}
            onClick={onBtnClick}
        />
    );
};

const AddPetitionFormEmailSection = () => {
    const { unregister, watch } = useContext(FormContext);
    const [customEmails, setCustomEmails] = useState([]);
    const selectedRadioBtn = watch("email_notification_type");

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
            unregister(['mailing_list_email', 'max_users']);
            addCustomEmail();
        }
    };

    return (
        <fieldset className='notification_emails_section'>
            <AddPetitionFormRadioBtnGroup onBtnClick={onEmailTypeClick} />
            { selectedRadioBtn === 'custom_emails' && (    
            <fieldset className='notification_emails_section'>
                { customEmails.map((ce) => (<FormTextInput key={ce} type='email' varName={ce} visibleName={ce} />)) }
                <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
            </fieldset>)}
            
            {selectedRadioBtn === 'listserv' && (
            <fieldset className='notification_emails_section'>
                <FormTextInput type='email' varName='mailing_list_email' visibleName='mailing list email' />
                <FormTextInput type='number' varName='max_users' visibleName='maximum number of petition signers' />
            </fieldset>)}
        </fieldset>
    );
};

export default AddPetitionFormEmailSection;