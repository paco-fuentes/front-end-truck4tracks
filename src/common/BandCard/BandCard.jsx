import "./BandCard.css";
import { useNavigate } from "react-router-dom";

export const BandCard = ({ id, image, bandName, bandLeader, genres, hiring, color }) => {
    const navigate = useNavigate();

    const SubmitIdToSeeBand = () => {
        navigate(`/band/${id}`)
    }

    return (
        <div key={id} className="bandCard" style={{ backgroundColor: `var(${color})` }}>
            <div><img src={image} width="100" className="imgBandCard" /></div>
            <div styles="font-size: 3em">{bandName}</div>
            <div>by {bandLeader}</div>
            <div>{genres.length > 0 && genres.length <= 3
                ? `${genres[0] || 'unknown'}${genres[1] ? ` / ${genres[1]}` : ''}${genres[2] ? ` / ${genres[2]}` : ''}`
                : ""
            }</div>
            <div>{hiring === "hiring" ? " We are hiring!" : " Complete band until further notice"}</div>
            <button onClick={() => SubmitIdToSeeBand(id)} className="buttonSeeBand">See</button>
        </div>
    );
};
