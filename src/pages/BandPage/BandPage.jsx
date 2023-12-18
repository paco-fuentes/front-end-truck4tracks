import { useEffect, useState } from "react";
import "./BandPage.css";
import { getBandByParams } from "../../services/apiCalls";
import { useParams } from "react-router-dom";
import { Multitrack } from "../../common/Multitrack/Multitrack";

export const BandPage = () => {
    const [bandPage, setBandPage] = useState(null);
    const [multitrack, setMultitrack] = useState(null);
    const [tracks, setTracks] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBandPage = async () => {
            try {
                const response = await getBandByParams(id);
                const bandPageData = response.data.data.band;
                // por ahora solo 1 multitrack por eso el [0] también en tracks
                const multitrackData = response.data.data.multitracks?.[0]?.multitrack;
                const tracksData = response.data.data.multitracks?.[0]?.tracks;
                setBandPage(bandPageData);
                setMultitrack(multitrackData);
                setTracks(tracksData);
            } catch (error) {
                console.error('Error al obtener la band page:', error);
            }
        };
        getBandPage();
    }, [id]);

    console.log(tracks);

    return (
        <div>
            {bandPage && (
                <>
                    <div>Image: <img src={bandPage.img_url} width="100" alt="Band Image" /></div>
                    <p><strong>Band name: {bandPage.band_name}</strong></p>
                    <p>About: {bandPage.about}</p>
                    {console.log('Tracks:', tracks)}
                    {multitrack && (
                        <Multitrack
                            title={multitrack.project_title}
                            img={multitrack.img_url}
                            tracks={tracks}
                        />
                    )}
                </>
            )}
        </div>
    );
};


