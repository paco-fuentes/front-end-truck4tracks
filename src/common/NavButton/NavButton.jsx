import './NavButton.css'
import { useNavigate } from 'react-router-dom';

export const NavButton = ({ path, title, design }) => {

    const navigate = useNavigate();

    return (
        <div className={design} onClick={() => navigate(path)}>
            {title}
        </div>
    );
};