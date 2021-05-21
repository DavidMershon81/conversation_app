const SimpleButton = ({ id, text, onBtnClick }) => {
    const onClick = () => {
        onBtnClick(id, text);
    }

    return (<input type="button" className='simple_btn' onClick={onClick} value={text} />);
}

export default SimpleButton;