import React from 'react';
import style from "./datetime.module.scss";
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('ja');
dayjs.extend(relativeTime)

interface DatetimeProps {
    datetime: Date | string,
    updatetime?: boolean,
    isFormat?: boolean,
}

const DateTime: React.FC<DatetimeProps> = ({datetime, updatetime, isFormat}) => {
    const referenceDate = dayjs(datetime);
    const today = dayjs();
    let  result = ''
    result = referenceDate.format('YYYY/MM/DD HH:mm')
    if (!isFormat  && today.diff(referenceDate, 'd') < 7) {
        result = referenceDate.from(today)
    }
    return (
        <span className={style.datetime}>{updatetime? "更新：": ""}{result}</span>
    );
}

export default DateTime
