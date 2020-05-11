import React from 'react';
import style from "./setting_title.module.scss";


const SettingTitle = ({text}) => {
    return (
        <div className={style.title}>{text}</div>
    );
}


export default SettingTitle
