import React from 'react';
import { NavLink } from "react-router-dom";

import style from "./go_back.module.scss";

const GoBack = ({to, isReLoad}) => {
    return isReLoad ? <NavLink to={to} className={style.back}/> : <a href={to} className={style.back}/>
}


export default GoBack
