const resource =(request,response) =>{
    let resourcePath = request.params["0"];
    console.log('resource ', request.params["0"])
    response.sendFile(resourcePath ? resourcePath : 'index.html' , {root:'./dist-ui/build'}); // This is for setting the root folder 
}

export default {
    resource
}