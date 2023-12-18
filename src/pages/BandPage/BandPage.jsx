import { useEffect, useState } from "react";
import "./BandPage.css";
import { getBandByParams } from "../../services/apiCalls";
import { useParams } from "react-router-dom";

export const BandPage = () => {
    const [bandPage, setBandPage] = useState(null);
    const [multitrack, setMultitrack] = useState(null);
    const [track, setTrack] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBandPage = async () => {
            try {
                const response = await getBandByParams(id);
                const bandPageData = response.data.data.band;
                // por ahora solo 1 multitrack
                const multitrackData = response.data.data.multitracks[0].multitrack;
                const trackData = response.data.data.multitracks[0].tracks;
                setBandPage(bandPageData);
                setMultitrack(multitrackData);
                setTrack(trackData);
            } catch (error) {
                console.error('Error al obtener la band page:', error);
            }
        };
        getBandPage();
    }, [id]);

    console.log( track);

    return (
        <div>
            {bandPage && (
                <>
                    <div>Image: <img src={bandPage.img_url} width="100" alt="Band Image" /></div>
                    <p><strong>Band name: {bandPage.band_name}</strong></p>

                    <div>Multitrack:
                        <p><strong>Multitrack name: {multitrack.project_title}</strong></p>
                        <div>Image: <img src={multitrack.img_url} width="100" alt="Band Image" /></div>
                        Tracks:
                        <div>
                            <div>{track[0].track_name}</div>
                            <div>
                                <audio controls>
                                    <source src={track[0].track_url} type="audio/ogg" />
                                    Tu navegador no soporta la etiqueta de audio.
                                </audio>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
