import "./BandPage.css";
import React, { useEffect, useState } from "react";
import { checkIfBandMemberCall, getAllBandMessages, getBandByParams, getBandMembers, joinBandCall, leaveBandCall, postMessage } from "../../services/apiCalls";
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
    // const bandMessages = useSelector((state) => state.bandMessages);
    const [isBandMember, setIsBandMember] = useState();

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
                // sólo un multitrack or banda en esta version
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

    const joinBandButton = async () => {
        try {
            const body = { "band_id": id };
            console.log(id, token);
            const response = await joinBandCall(body, token);
            checkNow();
            console.log(response.data);
        } catch (error) {
            console.log("User can't join the band");
        }
    }

    const leaveBandButton = async () => {
        try {
            const body = { "band_id": id };
            console.log(id, token);
            const response = await leaveBandCall(body, token);
            console.log(response.data);
        } catch (error) {
            console.log("User can't join the band");
        }
    }

    useEffect(() => {
        const checkIsMember = async () => {
            try {
                const response = await checkIfBandMemberCall(id, token);
                const bandMember = response.data.bandMember;
                setIsBandMember(bandMember);
            } catch (error) {
                console.log(error);
            }
        }
        checkIsMember();
    }, [isBandMember])
    console.log(tracks);
    return (
        <div className="bandPageDesign">
            <div className="bandPageContainer">
                {bandPage && (
                    <>
                        <div className="bandPageCompCont">
                            <div className="bandInfoContainer">
                                <div><img src={bandPage.img_url} alt="Band Image" /></div>
                                <div className="textBox">
                                    <div>{bandPage.band_name}</div>
                                    <div>About: </div>
                                    <div>{bandPage.about}</div>
                                </div>
                            </div>
                            <div>
                                {multitrack && (
                                    <Multitrack
                                        title={multitrack.project_title}
                                        img={multitrack.img_url}
                                        tracks={tracks}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            {!isBandMember ? (
                                <div className="joinButton" onClick={joinBandButton}>Join</div>
                            ) : (
                                <div className="joinButton" onClick={leaveBandButton}>Leave</div>
                            )}
                        </div>
                        <div className="chatCont">
                            {messages && (
                                <BandChat
                                    placeholder={'Escribe a la banda...'}
                                    messages={messages}
                                    onSendMessage={sendNewMessage}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
