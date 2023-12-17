import './NavButton.css'
import { useNavigate } from 'react-router-dom';

export const NavButton = ({ path, title }) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(path)}>
            {title}
        </div>
    );
};