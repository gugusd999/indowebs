export function char(a = 255){
    return " VARCHAR("+a+") ";
}

export function timestamp(){
    return " TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ";
}

export function timeupdate(){
    return "  datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ";
}