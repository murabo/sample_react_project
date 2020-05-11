export interface MeModel {
    last_name: string,
    first_name: string,
    last_name_kana: string,
    first_name_kana: string,
    department: string,
    email: string,
    tel: string,
    img: string,
    color_cd: string
}

export interface ProfileImageRequestModel {
    img: string,
}

export interface passwordRequestModel {
    password: string,
    password2: string,
}
