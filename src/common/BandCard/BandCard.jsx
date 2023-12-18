import { useNavigate } from "react-router-dom";
import "./BandCard.css";

export const BandCard = ({ id, image, bandName, bandLeader, genres, hiring }) => {
    const navigate = useNavigate();

    const SubmitIdToSeeBand = () => {
        navigate(`/band/${id}`)
    }

    return (
        <div key={id}>
            <div>Image: <img src={image} width="100" /></div>
            <p><strong>Band name: {bandName}</strong></p>
            <p>Band Leader: {bandLeader}</p>
            <p>Genres: {genres.length > 0 && genres.length <= 3
                ? `${genres[0] || 'unknown'}${genres[1] ? ` / ${genres[1]}` : ''}${genres[2] ? ` / ${genres[2]}` : ''}`
                : "unknown"
            }</p>
            <p>Band hiring?: {hiring === "hiring" ? " We are hiring!" : " Complete band until further notice"}</p>
            <button onClick={() => SubmitIdToSeeBand(id)}>See</button>
        </div>
    );
};
