const SimpleButton = ({ id, text, onBtnClick, className }) => {
    const onClick = () => {
        onBtnClick(id, text);
    }

    return (<button className={className} type="button" onClick={onClick}>{text}</button>);
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