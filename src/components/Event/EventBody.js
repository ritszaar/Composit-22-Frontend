import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import DarkContext from '../../store/DarkMode';
import classes from "./EventBody.module.css";

import eventImg from "./imgs/event.png";

const imgs = [];

const loadImages = async (n) => {
    let getter;
    for (let i = 0; i < n; i++) {
        getter = await import("./imgs/" + i + ".png").then(result => {imgs.push(result.default);});
    }
};

const Event = (props) => {
    const bkg = classes["bkg-" + props.colorId];

    const darkCtx = useContext(DarkContext);

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        loadImages(6).then(() => setIsLoaded(true));
    }, []);

    function registerEvent(eventID){
        
    }

    return (
        <div className={`${classes["event"]} ${bkg}` + (darkCtx.theme.mode === "dark" ? " " + classes["event__dark"] : "")}>
            <div className={classes["event-img__container"]}>
                {isLoaded && <img src={imgs[+props.id]} alt="event-img" className={classes["event-img"]}></img>}
            </div>
            <div className={classes["event-content"]}>
                <h1 className={classes["event-title"]}>{props.title}</h1>
                <div className={classes["event-about"]}>
                    {/* <h2 className={classes["title"]}>Coming Soon</h2> */}
                    <p className={classes["desc"]}>{props.desc}</p>
                </div>
                <div>
                    <h2 className={classes["title"]}>Team Size</h2>
                    <p className={classes["desc"]}>{`Minimum ${props.min} to maximum ${props.max} members`}</p>
                </div>
                <div>
                    <h2 className={classes["title"]}>Who can participate</h2>
                    <p className={classes["desc"]}>Any student pursuing B.Tech, M.Tech degree (no age restriction). Team members from different colleges in INDIA.</p>
            </div>
                <div className={classes["event-btn__group"]}>
                    <NavLink to={"/eventRegister/" + props.id} className={classes["event-btn"]} onClick={()=>registerEvent(props.id)}>Register</NavLink>
                    <a href = {props.Details} className={classes["event-btn"]}>Details</a>
                </div> 
            </div>
        </div>
    
    );
};
export default Event;
