import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// actions
import * as CompanyActionCreators from "../../actions/Company/ActionCreator";

// state
import {RootState} from "../../reducers";
const companySelector = (state: RootState) => state.company;

const CompanyDetail: React.FC = () => {
    const dispatch = useDispatch();
    const company = useSelector(companySelector);
    const { detail } = company
    useEffect(() => {
        dispatch(CompanyActionCreators.getCompany.request());
    }, []);

    return (
        <div>
            <ul>
                <li>
                    <div>企業名</div>
                    <div>{detail.name}</div>
                </li>
                <li>
                    <div>住所</div>
                    <div>
                        <p>{detail.postal_code}</p>
                        <p>{detail.address}</p>
                    </div>
                </li>
                <li>
                    <div>電話番号</div>
                    <div>
                        {detail.tel}
                    </div>
                </li>
                <li>
                    <div>FAX</div>
                    <div>
                        {detail.fax}
                    </div>
                </li>
                <li>
                    <div>メールアドレス</div>
                    <div>
                        {detail.email}
                    </div>
                </li>
                <li>
                    <div>コーポレートサイト</div>
                    <div>
                        <a href={detail.url} target="_blank">{detail.url}</a>
                    </div>
                </li>
                <li>
                    <div>代表者名</div>
                    <div>エムラボ</div>
                </li>
                <li>
                    <div>設立</div>
                    <div>エムラボ</div>
                </li>
                <li>
                    <div>資本金</div>
                    <div>1奥</div>
                </li>
                <li>
                    <div>ロゴ</div>
                    <div>
                        <img src={detail.img}/>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CompanyDetail;
