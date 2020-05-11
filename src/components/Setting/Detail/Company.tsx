import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from "react-router-dom";


//component
import {Button, Typography} from "@material-ui/core";
import SettingTitle from "../../Common/SettingTitle";

// style
import style from "./detail.module.scss";

// state
import {RootState} from "../../../reducers";
import Link from "@material-ui/core/Link";
const companySelector = (state: RootState) => state.company;

const CompanyDetail: React.FC = () => {
    const company = useSelector(companySelector);

    return (
        <>
            <SettingTitle text="企業情報"/>
            <div className={style.action}>
                <NavLink exact to={`/setting/company/edit/`}>
                    <Button variant="outlined" size="large" color="primary">
                        企業情報変更
                    </Button>
                </NavLink>
            </div>
            <Typography variant={"caption"} color={"error"}>入力された情報はプレスリリースに掲載されます</Typography>
            <ul>
                <li className={style.item}>
                    <label>HARVEST用 URL</label>
                    <div className={style.text}>
                        <p>{company.prefix}</p>
                    </div>
                    <div className={style.sample}>
                        <Typography variant={"caption"} display={"block"}>プレスリリース：https://pr.harvest.site/press_release/{company.prefix}</Typography>
                        <Typography variant={"caption"} display={"block"}>プレスリキット：https://pr.harvest.site/press_kit/{company.prefix}</Typography>
                    </div>
                </li>
                <li className={style.item}>
                    <label>公開用webページ</label>
                    <div className={style.text}>
                        <p>{company.is_public_page === "true" ? "公開する": "公開しない"}</p>
                    </div>
                    <Button variant={"outlined"} onClick={() => window.open(`https://pr.harvest.site/press_release/${company.prefix}`)} color="primary">公開ページ</Button>
                 </li>
                <li className={style.item}>
                    <label>企業名</label>
                    <div className={style.text}>
                        <p>{company.name}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>郵便番号</label>
                    <div className={style.text}>
                        <p>{company.postal_code}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>住所</label>
                    <div className={style.text}>
                        <p>{company.address}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>メールアドレス</label>
                    <div className={style.text}>
                        <p>{company.email}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>電話番号</label>
                    <div className={style.text}>
                        <p>{company.tel}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>FAX</label>
                    <div className={style.text}>
                        <p>{company.fax}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>コーポレートサイト</label>
                    <div className={style.text}>
                        <p>{company.url}</p>
                    </div>
                </li>
                <li className={style.item}>
                    <label>ロゴ</label>
                    {company.img ?
                        <div>
                            <img src={company.img} className={style.logo}/>
                        </div>
                        :
                        <div className={style.noLogo}></div>
                    }
                </li>
            </ul>
        </>
    );
}

export default CompanyDetail;
