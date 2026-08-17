export async function Api (){
    try {
        const response = await fetch("https://randomuser.me/api/?results=20&nat=us,es,fr,br",{
            method:"get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Error en el servidor ${response} `)
        //console.log(response)
        return await response.json();
    } catch (error) {
        console.log("Error en la petición " + error);
    }
}