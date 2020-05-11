import * as StatusConfig from "../config/status_type";

// 表示用意 status
export const SetStatus = (status) => {

    let label = ''
    let color = ""
    let code = StatusConfig.STATUS_EDIT

    switch (status) {
        case 0:
        case 4:
            label = '編集中'
            color = "#84D5DA"
            code = StatusConfig.STATUS_EDIT
            break;
        case 1:
            label = '校閲・承認待ち'
            color = "#E89EB8"
            code = StatusConfig.STATUS_REVIEW
            break;
        case 2:
            label = '修正依頼'
            color = "#EDC26F"
            code = StatusConfig.STATUS_REVIEW
            break;
        case 3:
            label = '配信設定　編集中'
            color = "#84D5DA"
            code = StatusConfig.STATUS_APPROVED
            break;
        case 5:
            label = '配信設定　承認待ち'
            color = "#E89EB8"
            code = StatusConfig.STATUS_REVIEW_PUBLIC
            break;
        case 6:
            label = '配信設定　修正依頼'
            color = "#EDC26F"
            code = StatusConfig.STATUS_REVIEW_PUBLIC
            break;
        case 7:
            label = '配信 待ち'
            color = "#6BA1D3"
            code = StatusConfig.STATUS_WAITING_PUBLIC
            break;
        case 8:
            label = '配信 済み'
            color = "#6BA1D3"
            code = StatusConfig.STATUS_PUBLIC
            break;

    }

    return  {
        label,
        color,
        code,
    }
};

