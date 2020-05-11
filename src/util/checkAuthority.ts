export const checkEditAuthority = (pressRelease, me) => {
    let hasEdit = me.uuid == pressRelease.detail.create_user.uuid ? true : false;
    if (!hasEdit && pressRelease.detail.creators.filter(member => member.uuid === me.uuid).length) hasEdit = true;
    return hasEdit
};
