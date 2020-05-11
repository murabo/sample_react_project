import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

// img
import IconArrow from "../../../../assets/icon_arrow_down_white.svg";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const useStyles = makeStyles({
    button: {
        padding: '0',
        borderRadius: 40
    },
    arrow: {
        borderLeft: '0.1rem solid rgba(255, 255, 255, 0.3);',
        padding: '5px 1rem'
    },
    buttonText: {
        padding: '5px 1rem'
    }
});


export default function HeaderMenu( {handleOpenPreviewDialog}) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = ()=> {
        setAnchorEl(null);
        handleOpenPreviewDialog()
    }

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
            >
                <div onClick={handleClick} className={classes.arrow}>
                    <img src={IconArrow}/>
                </div>
            </Button>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleMenuOpen() }>
                    <ListItemText primary="プレビュー" />
                </MenuItem>
            </StyledMenu>

        </div>
    );
}


