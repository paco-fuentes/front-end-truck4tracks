import "./BandPage.css";
import React, { useEffect, useState } from "react";
import {
    checkIfBandMemberCall,
    createMultitrackCall,
    getAllBandMessages,
    getBandByParams,
    getBandMembers,
    joinBandCall,
    leaveBandCall,
    postMessage
} from "../../services/apiCalls";
import { useParams } from "react-router-dom";
import { Multitrack } from "../../common/Multitrack/Multitrack";
import { BandChat } from "../../common/BandChat/BandChat";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { addMessage, setMessages } from "../bandMessagesSlice";
import { FieldInput2 } from "../../common/FieldInput2/FieldInput2";

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

    const sendNewMessage = async (message) => {
        try {
            const body = { message };
            console.log('mensaje ---> ' + body.message);
            const response = await postMessage(id, body, token);
            dispatch(addMessage(response.data.message));
        } catch (error) {
            console.error('Error send message --> ', error);
        }
    };
   
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
    }, [dispatch, sendNewMessage, id]);

    // refactorizar join/leave en un boton con useEffect
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
    // }, [isBandMember, leaveBandButton, joinBandButton])
    }, [isBandMember])

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

    const createMultitracK = async () => {
        try {
            const body = multitrackBody;
            // "project_title": "El cassette desde React III",
            // "img_url": "https://media.istockphoto.com/id/1328430843/vector/girls-band.jpg?s=612x612&w=0&k=20&c=Od2--mSNnlvFsE4meO-fxNUMjvIzy4b5s4tb6ZDL_Rk="
            const response = await createMultitrackCall(id, body, token);
        } catch (error) {
            console.error('Error creating new multitrack', error);
        }
    };

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
    // }, [id, createMultitracK]);
    }, [id]);

    // console.log(multitrack);
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
                                {!multitrack && (
                                    <div>
                                        <div className="fieldComp">
                                            <FieldInput2
                                                design={'inputReg'}
                                                type={"project_title"}
                                                name={"project_title"}
                                                placeholder={"Your project title..."}
                                                functionProp={multitrackBodyHandler}
                                            // functionBlur={errorCheck}
                                            />
                                            <FieldInput2
                                                design={'inputReg'}
                                                type={"img_url"}
                                                name={"img_url"}
                                                placeholder={"Image link"}
                                                functionProp={multitrackBodyHandler}
                                            // functionBlur={errorCheck}
                                            />
                                            {token &&
                                                <div onClick={createMultitracK} className="joinButton">Create Multitrack</div>
                                            }
                                            {!token &&
                                                <div>You must be logued as band leader to create a multitrack
                                                    <div className="joinButtonInactive">Create Multitrack</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
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
