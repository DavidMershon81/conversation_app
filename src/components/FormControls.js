const FormErrorMessage = ({ varName, visibleName, errors }) => {
    const errorPresent = errors[varName] != null;
    const requiredError = errorPresent && errors[varName].type === 'required';
    return requiredError ? (<span className='form_error_message'>{visibleName} required!</span>) : (<span></span>);
};

const FormTextInput = ({ register, varName, visibleName, type, errors }) => {
    const isTextArea = type === 'textarea';
    const formParams = { required: true};
    return (
        <>
            { isTextArea ? <textarea rows='10' className="form_text_area" placeholder={visibleName} {...register(varName, formParams)} /> :
            <input className="form_text_input" placeholder={visibleName} type={type} {...register(varName, formParams)} />}
            <FormErrorMessage varName={varName} visibleName={visibleName} errors={errors} />
        </>
    );
};

const FormRadioButton = ({ register, varName, valueName, valueText, onClick }) => {
    return (
        <label className="form_checkbox_container">
            <input {...register(varName, { required: true })} type="radio" value={valueName} onClick={() => { onClick(valueName);}} />{valueText}
            <span className="checkmark"></span>
        </label>
    );
};

const FormRadioButtonGroup = ({ register, varName, visibleName, buttonsConfig, onClick, errors }) => {
    return (
        <fieldset className="form_radio_button_set">
        { buttonsConfig.map(({ valueName, valueText}) => (
            <FormRadioButton key={valueName} register={register} varName={varName} valueName={valueName} valueText={valueText} onClick={onClick}/>
        )) }
        <FormErrorMessage varName={varName} visibleName={visibleName} errors={errors} />
    </fieldset>
    )
};

export { FormErrorMessage, FormTextInput, FormRadioButton, FormRadioButtonGroup };