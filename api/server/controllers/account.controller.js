const get =(request,response) =>{
    console.log('reache')
    response.json({test: 'REACHED'})
}

export default {
    get
}