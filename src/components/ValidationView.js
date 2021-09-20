import { useLocation, Redirect } from 'react-router-dom';
import usePostData from  '../hooks/usePostData'
import { LoadingBox } from './MiscControls';
import SignPetitionSection from './SignPetitionSection';
import { useRef, useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const ValidationView = ({ basePath }) => {
    const location = useLocation();
    const guid = location.pathname.replace(basePath, '');
    const [confirmMessage, setConfirmMessage] = useState('');

    const onConfirm = (data) => {
        console.log('onConfirm running...');
        console.log(data.message);
        setConfirmMessage(data.message);
    }

    const { post:postValidation, loading, error, errorMessage } = usePostData({ 
        url:'/api/validations',
        onConfirm:onConfirm,
        confirmText:'Validated User!!'
    });

    useEffect(() => {
        postValidation({ guid : guid });
    }, []);

    return (
        <section>
            <h2>Validation Page</h2>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>      
            { !error && <>
                
                <p>{confirmMessage}</p>
            </>}
        </section>
    );
}

export default ValidationView;