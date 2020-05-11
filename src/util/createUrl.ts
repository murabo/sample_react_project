import dayjs from 'dayjs';

export const createReleasedAt = (date, prefix) => {
    return `https://pr.harvest.site/press_release/${prefix}/${dayjs(new Date(date)).format('YYYYMMDDHHmm')}`;
};
