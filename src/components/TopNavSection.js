
import { SimpleButton } from './MiscControls';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import usePostData from  '../hooks/usePostData';

const TopNavSection = () => {
    const { authData, loggedIn, setLogout }= useContext(AppContext);
    const loggedInUser = loggedIn ? authData.user_email : "";
    const { post:logout } = usePostData({ url:'/api/logout', onConfirm:() => setLogout(true) });

    return (
        <section>
            <h1 className='top_heading_text'>Petition App Prototype</h1>
            <nav className='top_nav'>
                <Link className='nav_link' to='/debug/users'>Users(debug)</Link>
                { loggedIn && <Link className='nav_link' to='/'>Home</Link> }
                { !loggedIn && <Link className='nav_link' to='/login'>Login</Link> }
                { loggedIn && <SimpleButton className='nav_link' onBtnClick={logout} text='Logout'/> }
            </nav>
            <p className='logged_in_user_text'>{loggedInUser}</p>
        </section>   
    );
}

export default TopNavSection
