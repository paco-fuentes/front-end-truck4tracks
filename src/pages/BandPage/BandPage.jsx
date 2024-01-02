import "./BandPage.css";
import React, { useEffect, useState } from "react";
import {
    checkIfBandMemberCall,
    createMultitrackCall,
    createTrackCall,
    deleteMessageCall,
    getAllBandMessages,
    getBandByParams,
    getBandMembers,
    joinBandCall,
    leaveBandCall,
    postMessage
} from "../../services/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { Multitrack } from "../../common/Multitrack/Multitrack";
import { BandChat } from "../../common/BandChat/BandChat";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { addMessage, setMessages } from "../bandMessagesSlice";
import { FieldInput2 } from "../../common/FieldInput2/FieldInput2";
import { jwtDecode } from "jwt-decode";
import { FieldInput } from "../../common/FieldInput/FieldInput";

export const BandPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    let currentId;
    if ((typeof token) !== "object") {
        const decToken = token ? jwtDecode(token) : null;
        currentId = decToken?.id;
    }

    // const bandMessages = useSelector((state) => state.bandMessages);
    const [isBandMember, setIsBandMember] = useState(false);
    const [bandPage, setBandPage] = useState(null);
    const [multitrack, setMultitrack] = useState({});
    const [tracks, setTracks] = useState(null);
    const [messages, setMessages] = useState(null);
    const [messageButton, setMessageButton] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [trackCreated, setTrackCreated] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const sendNewMessage = async (message) => {
        try {
            const body = { message };
            console.log('mensaje ---> ' + body.message);
            setMessageButton(true)
            const response = await postMessage(id, body, token);
            dispatch(addMessage(response.data.message));
        } catch (error) {
            console.error('Error send message --> ', error);
        }
    };

    useEffect(() => {
        const deleteSelectedMessage = async () => {
            try {
                if (selectedMessageId !== null) {
                    const body = { "message_id": selectedMessageId };
                    console.log(body);
                    const response = await deleteMessageCall(id, body, token);
                    console.log(response.data);
                    setMessages((prevMessages) => prevMessages.filter(message => message.id !== selectedMessageId));
                }
            } catch (error) {
                console.error('Error send message --> ', error);
            }
        };
        deleteSelectedMessage();
    }, [selectedMessageId]);

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
    }, [dispatch, id, messageButton, messages]);

    if (messageButton) {
        setMessageButton(false);
    }

    const [joinButton, setJoinButton] = useState();

    const joinBandButton = async () => {
        try {
            const body = { "band_id": id };
            console.log(id, token);
            const response = await joinBandCall(body, token);
            console.log(response.data);
            setJoinButton(false);
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
            setJoinButton(true);
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
    }, [isBandMember, joinButton])

    const [multitrackBody, setMultitrackBody] = useState({
        project_title: '',
        img_url: '',
    });

    const multitrackBodyHandler = (e) => {
        setMultitrackBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const multitrackErrorHandler = () => { };

    const [multiExist, setMultiExist] = useState();

    const createMultitracK = async () => {
        try {
            const body = multitrackBody;
            const response = await createMultitrackCall(id, body, token);
            setMultitrack(response.data.data);
            setMultiExist(true);
        } catch (error) {
            console.error('Error creating new multitrack', error);
        }
    };

    const [trackBody, setTrackBody] = useState({
        id: '',
        track_name: '',
        img_url: '',
        track_url: '',
    });

    const trackErrorHandler = () => { };

    useEffect(() => {
        setTrackBody((prevState) => ({
            ...prevState,
            id: multitrack?.id || '',
        }));
    }, [multitrack]);

    const trackBodyHandler = (e) => {
        setTrackBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const resetTrackInputs = () => {
        console.log("Resetting track inputs");
        setTrackBody({
            id: '',
            track_name: '',
            img_url: '',
            track_url: '',
        });
    };

    const createTrack = async () => {
        try {
            const body = trackBody;
            const response = await createTrackCall(id, body, token);
            setTracks(response.data.data);
            setTrackCreated(true);
            resetTrackInputs();
            console.log("Track inputs reset successfully");
        } catch (error) {
            console.error('Error creating new multitrack', error.message, error.response);
        }
    };

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
                if (multitrackData) {
                    setMultiExist(true);
                }
            } catch (error) {
                console.error('Error get bandpage---> ', error);
            }
        };

        if (isMounted && (trackCreated || !tracks)) {
            getBandPage();
            setTrackCreated(false);
        }
    }, [id, isMounted, trackCreated, tracks]);

    const loginPage = () => {
        navigate('/login');
    }

    const goToBandMembers = () => {
        navigate(`/bandmembers/${id}`)
    }

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
                                    {(bandPage.band_leader === currentId) ? (<div className="joinButton" onClick={goToBandMembers}>Manage Members</div>) : ''}
                                    {(!token) ? (
                                        <div>
                                            <div className="joinButton" onClick={loginPage}>Login</div>
                                        </div>
                                    ) : (<div>
                                        {!isBandMember ? (
                                            <div className="joinButton" onClick={joinBandButton}>Join</div>
                                        ) : (
                                            <div className="joinButton" onClick={leaveBandButton}>Leave</div>
                                        )}
                                    </div>)}
                                </div>
                            </div>
                            <div>
                                {(typeof multiExist === 'undefined') && (
                                    <div>
                                        {((bandPage.band_leader !== currentId) || (!token)) ? (
                                            <div className="loadTrackCont">You must be logued as band leader to create a multitrack
                                            </div>
                                        ) : (
                                            <div className="fieldCompBands">
                                                <FieldInput2
                                                    design={'inputReg'}
                                                    type={"project_title"}
                                                    name={"project_title"}
                                                    placeholder={"Your project title..."}
                                                    functionProp={multitrackBodyHandler}
                                                    functionBlur={multitrackErrorHandler}
                                                />
                                                <FieldInput2
                                                    design={'inputReg'}
                                                    type={"img_url"}
                                                    name={"img_url"}
                                                    placeholder={"Image link"}
                                                    functionProp={multitrackBodyHandler}
                                                    functionBlur={multitrackErrorHandler}
                                                />
                                                <div onClick={createMultitracK} className="joinButton">Create Multitrack</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {(multiExist === true) && (
                                    <div className="multiLoadCont">
                                        <Multitrack
                                            title={multitrack.project_title}
                                            img={multitrack.img_url}
                                            tracks={tracks}
                                        />
                                        <div>{isBandMember ?
                                            (
                                                <div className="loadTrackCont">
                                                    <FieldInput
                                                        design={'inputReg'}
                                                        type={"track_name"}
                                                        name={"track_name"}
                                                        placeholder={"Your track title..."}
                                                        value={trackBody.track_name}

                                                        functionProp={trackBodyHandler}
                                                        functionBlur={trackErrorHandler}
                                                    />
                                                    <FieldInput
                                                        design={'inputReg'}
                                                        type={"img_url"}
                                                        name={"img_url"}
                                                        placeholder={"Add an image..."}
                                                        functionProp={trackBodyHandler}
                                                        value={trackBody.img_url}
                                                        functionBlur={trackErrorHandler}
                                                    />
                                                    <FieldInput
                                                        design={'inputReg'}
                                                        type={"track_url"}
                                                        name={"track_url"}
                                                        placeholder={"Load a track..."}
                                                        value={trackBody.track_url}
                                                        functionProp={trackBodyHandler}
                                                        functionBlur={trackErrorHandler}
                                                    />
                                                    <div onClick={createTrack} className="joinButton">Load Track</div>
                                                </div>
                                            ) : (
                                                <div className="loadTrackCont">You must be a band member to load a track on our multitrack</div>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {(isBandMember) ?
                            (<div className="chatCont">
                                {messages && (
                                    <BandChat
                                        placeholder={'Escribe a la banda...'}
                                        messages={messages}
                                        onSendMessage={sendNewMessage}
                                        onSendButtonClick={setSelectedMessageId}
                                    />
                                )}
                            </div>) : (
                                <div className="joinChatCont">
                                    Join the band to chat with the band
                                </div>
                            )}
                    </>
                )}
            </div>
        </div>
    );
};
