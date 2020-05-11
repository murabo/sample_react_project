import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import ImageNewMember from "../../../assets/menu/new_member.svg";

import style from "./avater.module.scss";

const useStyles = makeStyles({
    avater: {
        border: "1px solid #e2e9e5"
    },
    small: {
        position: 'relative',
        width: '2.4rem',
        height: '2.4rem',
    },
    menu: {
        width: '2.8rem',
        height: '2.8rem',
        fontSize: 14
    },
    medium: {
        position: 'relative',
        width: '3.4rem',
        height: '3.4rem',
    },
    large: {
        width: 64,
        height: 64,
        fontSize: 20
    },
    profile: {
        width: 80,
        height: 80,
        fontSize: 35
    },
});


interface AvatarImgProps {
    src: string | undefined,
    name: string | undefined,
    size: string,
    active?: boolean,
    color?: string
}

const AvatarImg: React.FC<AvatarImgProps> = ({ src, name, active, size, color }) => {
    const classes = useStyles();
    let avatarSize = classes.medium
    if (size === 'small') {
        avatarSize = classes.small
    }else if (size === 'large') {
        avatarSize = classes.large
    } else if (size === 'profile') {
        avatarSize = classes.profile
    } else if (size === 'menu') {
        avatarSize = classes.menu
    }

    let html:any  = <></>

    if (src){
        html = <Avatar src={src} className={classNames(classes.avater, avatarSize)}/>
    } else if (name) {
        const text = name.slice( 0, 1 )
        html = <Avatar className={classNames(classes.avater, avatarSize)} style={{backgroundColor : color}} >{text}</Avatar>
    } else {
        html = <Avatar src={ImageNewMember} className={classNames(classes.avater, avatarSize)} style={{padding : '5px'}}/>
    }

    return (
        <span className={style.avatar}>
            <div className={avatarSize} >
                {active=== true && <span className={style.active}></span>}
                {html}
            </div>
        </span>

    );
}


export default AvatarImg
