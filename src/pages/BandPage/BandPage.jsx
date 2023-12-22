import React, { useEffect, useState } from "react";
import "./BandPage.css";
import { getAllBandMessages, getBandByParams, postMessage } from "../../services/apiCalls";
import { useParams } from "react-router-dom";
import { Multitrack } from "../../common/Multitrack/Multitrack";
import { BandChat } from "../../common/BandChat/BandChat";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { addMessage, setMessages } from "../bandMessagesSlice";

export const BandPage = () => {
    const dispatch = useDispatch();
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    const bandMessages = useSelector((state) => state.bandMessages);

    const [bandPage, setBandPage] = useState(null);
    const [multitrack, setMultitrack] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [messages, setMessages] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBandPage = async () => {
            try {
                const response = await getBandByParams(id);
                const bandPageData = response.data.data.band;
                const multitrackData = response.data.data.multitracks?.[0]?.multitrack;
                const tracksData = response.data.data.multitracks?.[0]?.tracks;
                setBandPage(bandPageData);
                setMultitrack(multitrackData);
                setTracks(tracksData);
            } catch (error) {
                console.error('Error get bandpage---> ', error);
            }
        };
        getBandPage();
    }, [id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getAllBandMessages(id);
                setMessages(response.data.bandMessages);
            } catch (error) {
                console.error('Error get message --> ', error);
            }
        };
        getMessages();
    }, [dispatch, id]);

    console.log('messages: ', messages);

    const sendNewMessage = async (message) => {
        try {
            const body = { message };
            console.log('body--->' + body.message);

            const response = await postMessage(id, body, token);
            dispatch(addMessage(response.data.message));
        } catch (error) {
            console.error('Error send message --> ', error);
        }
    };

    return (
        <div>
            {bandPage && (
                <>
                    <div>Image: <img src={bandPage.img_url} width="100" alt="Band Image" /></div>
                    <p><strong>Band name: {bandPage.band_name}</strong></p>
                    <p>About: {bandPage.about}</p>
                    {multitrack && (
                        <Multitrack
                            title={multitrack.project_title}
                            img={multitrack.img_url}
                            tracks={tracks}
                        />
                    )}
                    {messages && (
                        <BandChat
                            messages={messages}
                            placeholder={'Escribe a la banda...'}
                            onSendMessage={sendNewMessage}
                        />
                    )}
                </>
            )}
        </div>
    );
};
