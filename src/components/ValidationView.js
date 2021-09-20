import { useLocation, Redirect } from 'react-router-dom';
import usePostData from  '../hooks/usePostData'
import { LoadingBox } from './MiscControls';
import SignPetitionSection from './SignPetitionSection';
import { useRef, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

const ValidationView = ({ basePath }) => {
    const location = useLocation();
    const guid = location.pathname.replace(basePath, '');

    const onConfirm = () => {
        console.log('posted validation!')
    }

    const { post:postValidation, confirmMessage, loading, error, errorMessage } = usePostData({ 
        url:'/api/validations',
        onConfirm:onConfirm,
        confirmText:'Validated User!!'
    });

    useEffect(() => {
        postValidation({ guid : guid });
    }, []);

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>      
            { !error && <>
                <h2>Validation Page</h2>
                <p>guid: {guid}</p>
                { confirmMessage && <p>confirmMessage</p> }
            </>}
        </section>
    );
}

export default ValidationView;