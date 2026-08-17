export function NormaliceUser(dataNormalice:any){
    if(!dataNormalice) throw Error("Error en la api para el normalice");
    
    const dataUser = dataNormalice.results.map((item:any) =>{
        return {
            "email":item.email,
            "cell":item.cell,
            "gender":item.gender,
            "id":item.id,
            "location":item.location,
            "name":item.name,
            "phone":item.phone,
            "picture":item.picture,
            "registered":item.registered,
        }
    })
    return dataUser;
}