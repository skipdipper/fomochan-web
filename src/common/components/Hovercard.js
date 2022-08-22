import ReactDOM from 'react-dom';

export default function Hovercard({ children }) {
    return ReactDOM.createPortal(
        <div className='hover-card'>
            {children}
        </div>,
        document.getElementById("__next")
    )
}