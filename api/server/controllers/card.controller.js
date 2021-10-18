import cardService from './../services/card.service';
import bcrypt from 'bcrypt';

// This function is used to create new card details
const newCard = (req,res) => {
    const cardDetail = req.body;
    bcrypt.genSalt(10,(err,salt) =>
    {
        if(err) throw err;

        bcrypt.hash(cardDetail.pin, salt,(err,hash)=>{ // This function is to hash the pin
            if(err) throw err;
            cardDetail.pin =hash;
            const promise = cardService.newData(cardDetail); // calls the new function in service module and this returns an promise object.
            promise.then(data=>{
                if(data===null){
                    res.status(400);
                    res.json({
                        message:"ERROR",
                    })
                }else{
                    res.status(200);
                    res.json({
                        message:"New Card Added",
                        data:data
                    })
                }
            }).catch(e=>{
                res.status(400);
                res.json({
                    message:"ERROR",
                    error:e
                })
            })
        })
    });      
}

// This function is used to get the card details through email filter
const getCardByUser = (req,res) => {
    const { email } = req.body;
    const promise = cardService.getUserCard(email);
    promise.then(data=>{
        if(data===null){ 
            res.status(400); 
            res.json({
                message:"Missing"
            }) 
        }
        else{
            res.status(200);
            res.json({
                message:"Card Details found",
                data: data
            })
        }
    }).catch(e=>{
        res.status(400);
        res.json({
            message:"ERROR",
            error:e
        }) 
    })
}

const deleteUserCard = (req,res) => {
    const { email } = req.body;
    const promise = cardService.deleteUserCard(email);
    promise.then(data=>{
        if(data===null){ 
            res.status(400); 
            res.json({
                message:"ERROR"
            }) 
        }
        else{
            res.status(200);
            res.json({
                message:"Card Details Deleted",
                data: data
            })
        }

    }).catch(e=>{
        res.status(400);
        res.json({
            message:"ERROR",
            error:e
        }) 
    })
}

export default {
    newCard,
    getCardByUser,
    deleteUserCard
}