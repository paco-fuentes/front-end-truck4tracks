import { useEffect, useState } from "react";
import { getAllBands } from "../../services/apiCalls";
import "./Bands.css";

export const Bands = () => {

    const [bands, setBands] = useState([])

    useEffect(() => {
        if (bands.length === 0) {
            getAllBands()
                .then((response) => {
                    const bandsData = response.data.data;
                    setBands(bandsData);
                })
                .catch ((error) => console.log(error));
}
    }, [bands]);

return (
    <div>
            {bands.length > 0 ? (
                bands.map((band) => (
                    <div key={band.id}>
                        <div>Image: <img src={band.img_url} width="100"/></div>
                        <p><strong>Band name: {band.band_name}</strong></p>
                        <p>Band Leader: {band.band_leader.username}</p>
                        <p>Genres: {band.genre_names[0]} / {band.genre_names[1]} / {band.genre_names[2]}</p>
                        {/* <p>About: {band.about}</p> */}
                        <p>Band hiring?: {band.hiring === "hiring" ? "We are hiring!" : "complete band until further notice"}</p>
                        {/* <p>Band state: {band.is_active ? "Banda en activo" : "Banda separada"}</p> */}
                    </div>
                ))
            ) : (
                bands.length === 0 && <p>Loading appointments...</p>
            )}
        </div>
);
};

