const SimpleButton = ({ id, text, onBtnClick }) => {
    const onClick = () => {
        onBtnClick(id, text);
    }

    return (<input type="button" className='simple_btn' onClick={onClick} value={text} />);
}

const LoadingBox = ({ loading, error }) => {
    return (
        <>
        { 
            (loading || error) &&
            <div className="loading_box">
            {loading && <p>Loading...</p>}
            {error && <p>error: can't connect to server.</p>}
            </div>
        }
        </>
    );
};

export { SimpleButton, LoadingBox };