import "./Multitrack.css";

export const Multitrack = ({ id, title, img, tracks }) => {

    return (
        <div key={id} className="multitrackCard">
            <div className="multiInfo">
                <img src={img} alt="Band Image" />
                <p><strong>Reel: {title}</strong></p>
            </div>
            {/* {((tracks.length<0)) ? (<div className="emptyMulti">hola</div>) : ('')} */}
            {tracks && Array.isArray(tracks) && tracks.map((track, id) => (
                <div key={id} className="playerDesign">
                    <div><img src={track.img_url} width="50" alt="Band Image" className="imgTrackMulti" /></div>
                    <div className="trackTitle">{track.track_name}</div>
                    <audio controls>
                        <source src={track.track_url} type="audio/ogg" />
                        Audio player not supported...
                    </audio>
                </div>
            ))}
        </div>
    );
};