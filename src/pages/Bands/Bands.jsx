import { useEffect, useState } from "react";
import { getAllBands } from "../../services/apiCalls";
import { BandCard } from "../../common/BandCard/BandCard";
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
                .catch((error) => console.log(error));
        }
    }, [bands]);

    return (
        <div className="bandsDesign">
            <div>
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
                            />
                        </div>
                    ))
                ) : (
                    bands.length === 0 && <p>Loading bands...</p>
                )}
            </div>
        </div>
    );
};

