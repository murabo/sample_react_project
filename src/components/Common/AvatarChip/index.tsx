import React from 'react';
import Avatar from '../Avatar';
import style from "./avater_chip.module.scss";

const Chip = ({user, component}) => {

    return (
        <div className={style.root}>
            <Avatar src={user.img} name={user.last_name} size="small" color={user.color_code}/>
            <div className={style.info}>
                <p className={style.name}>{user.last_name} {user.first_name} </p>
            </div>
            <div className={style.action}>
                {component}
            </div>
        </div>
    );
}


export default Chip
