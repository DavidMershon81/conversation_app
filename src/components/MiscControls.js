const SimpleButton = ({ id, text, onBtnClick }) => {
    const onClick = () => {
        onBtnClick(id, text);
    }

    return (<input type="button" className='simple_btn' onClick={onClick} value={text} />);
}

const LoadingBox = ({ loading, error, errorMessage }) => {
    return (
        <>
        { 
            (loading || error) &&
            <div className="loading_box">
            {loading && <p>Loading...</p>}
            {error && <p>error: {errorMessage}</p>}
            </div>
        }
        </>
    );
};

export { SimpleButton, LoadingBox };