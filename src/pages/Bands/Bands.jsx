import "./Bands.css";
import { useEffect, useState } from "react";
import { getAllBands } from "../../services/apiCalls";
import { BandCard } from "../../common/BandCard/BandCard";

export const Bands = () => {
    const [bands, setBands] = useState([])
    useEffect(() => {
        if (bands.length === 0) {
            getAllBands()
                .then((response) => {
                    const bandsData = response.data.data;
                    setBands(bandsData);
                })
                .catch((error) => console.log(error.message));
        }
    }, [bands]);

    const cardColors = [
        "--green-col",
        "--pink-col",
        "--pink-d-col",
        "--blue-d-col",
        "--red-col",
        "--blue-col",
    ];

    return (
        <div className="bandsDesign">
            {bands.length > 0 ? (
                bands.map((band) => (
                    <div key={band.id}>
                        <BandCard
                            id={band.id}
                            image={band.img_url}
                            bandName={band.band_name}
                            bandLeader={band.band_leader.username}
                            genres={band.genre_names}
                            hiring={band.hiring}
                            color={cardColors[band.id % cardColors.length]}
                        />
                    </div>
                ))
            ) : (
                bands.length === 0 &&
                <div className="loadCont">
                    <div className="loadingModalContainer">Loading bands...</div>
                </div>
            )}
        </div>
    );
};

