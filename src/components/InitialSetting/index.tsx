import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';

import randomColor from 'randomcolor';

// component
import {Typography} from "@material-ui/core";

// state
import {RootState} from "../../reducers";
import CompanyInitForm from "../Form/CompanyInit";
import MeInitForm from "../Form/MeInit";
import MemberForm from "../Form/Member";
import {MeModel} from "../../model/MeModel";
import * as MeActionCreators from "../../actions/Me/ActionCreator";
import {CompanyModel} from "../../model/CompanyModel";
import * as CompanyActionCreators from "../../actions/Company/ActionCreator";
import {MemberModel} from "../../model/MemberModel";
import * as MemberActionCreators from "../../actions/Member/ActionCreator";
import InitialSteppers from "./InitialSteppers";
import Button from "@material-ui/core/Button";
const meSelector = (state: RootState) => state.me;
const companySelector = (state: RootState) => state.company;

const InitialSetting: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const me = useSelector(meSelector);
    const company = useSelector(companySelector);
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        if (!company.name) {
            setActiveStep(0)
        } else if (!me.first_name && !me.last_name) {
            setActiveStep(1)
        } else {
            setActiveStep(2)
        }
    }, [company, me]);

    const handleSubmitMe = (values: MeModel) => {
        if (!values.color_cd){
			const color = randomColor();
			values.color_cd = color
		}
        dispatch(MeActionCreators.patchMe.request(values));
    }

    const onSubmitPost = (values: CompanyModel) => {
        dispatch(CompanyActionCreators.postCompany.request(values));
    };

    const handleSubmitMember = (values: MemberModel) => {
        dispatch(MemberActionCreators.postMember.request({uuid: [], email: [values.email || ""],  permission: 0}));
        setActiveStep(3)
    };

    return (
        <section className={classes.content}>
            <Typography variant="h6" gutterBottom align={"center"}>初期設定</Typography>
            <InitialSteppers activeStep={activeStep} setActiveStep={setActiveStep}/>
            {activeStep === 0 && <>
                 <CompanyInitForm onSubmit={onSubmitPost}/>
              </>
            }
            {activeStep === 1 && <>
                  <MeInitForm onSubmit={handleSubmitMe}/>
                </>
            }
            {activeStep === 2 && <>
                  <Typography variant="h2" gutterBottom align={"center"}>一緒に作業するメンバーを招待しましょう！</Typography>
                  <MemberForm onSubmit={handleSubmitMember}/>
                  <div className={classes.skip}>
                      <Button variant="outlined" size="large" type="submit" color="primary" onClick={()=>setActiveStep(3)}>
                        スキップ
                      </Button>
                  </div>
                </>
            }
        </section>
    );
}

export default InitialSetting;


const useStyles = makeStyles(() =>
    createStyles({
        content: {
            width: 500,
        },
        skip: {
            textAlign: "center",
        }
    }),
);

