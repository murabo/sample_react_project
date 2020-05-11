import React, {useEffect} from "react";

//component
import SettingTitle from "../../Common/SettingTitle";

// state
import {RootState} from "../../../reducers";

import Button from "@material-ui/core/Button";

const meSelector = (state: RootState) => state.me;

const MeDetail: React.FC = () => {

    return (
        <div>
            <SettingTitle text="プラン"/>
            現在のプラン
        </div>
    );
}

export default MeDetail;
