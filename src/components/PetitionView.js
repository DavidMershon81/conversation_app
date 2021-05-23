import { useLocation } from 'react-router-dom';
import useFetchData from  '../hooks/useFetchData'
import { LoadingBox } from './MiscControls';

const PetitionView = ({ basePath }) => {
    const location = useLocation();
    const petitionId = location.pathname.replace(basePath, '');
    const { data:petition, loading, error } = useFetchData({ getUrl:`/api/petitions/${petitionId}` });

    return (
        petition ?
        <section>
            <LoadingBox loading={loading} error={error} />
            <h2>Petition: {petition['subject']}</h2>
            <p>Petition Text: {petition['petition_text']}</p>
        </section> : <section></section>
    );
}

export default PetitionView;