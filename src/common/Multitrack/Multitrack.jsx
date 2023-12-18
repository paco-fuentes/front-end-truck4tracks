import "./Multitrack.css";

export const Multitrack = ({ id, title, img, tracks }) => {

    return (
        <div key={id}>
            <p><strong>Band name: {title}</strong></p>
            <div>Image: <img src={img} width="100" alt="Band Image" /></div>
            {tracks && Array.isArray(tracks) && tracks.map((track, id) => (
                <div key={id}>
                    <p>Track name: {track.track_name}</p>
                    <div>Image: <img src={track.img_url} width="100" alt="Band Image" /></div>
                    <audio controls>
                        <source src={track.track_url} type="audio/ogg" />
                        Audio player not supported...
                    </audio>
                </div>
            ))}
        </div>
    );
};