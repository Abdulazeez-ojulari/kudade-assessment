import errorMiddleware from '../middlewares/error.js';

export const signin = errorMiddleware(async (req, res) => {
    try {

        const {username, password} = req.body
        
        const db = req.app.locals.db;
        const sellerCollection = await db.collection('sellers')

        var token = new Buffer.from(username+":"+password).toString('base64');

        let seller = await sellerCollection.findOne({seller_id: username, seller_zip_code_prefix: parseInt(password)})
        
        if(seller){
            res.status(200).json({ 
                data: seller,
                token: token
            })
        }else{
            res.status(404).json({
                messsage: "User not found",
                code: 404,
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: error.message || "Seller update operation failed",
            code: 500,
        })
    }
})

export const updateAccount = errorMiddleware(async (req, res) => {
    try {
        
        const db = req.app.locals.db;

        const body = req.body;

        const filter = {seller_id: req.user.seller_id}
        const sellersCollection = await db.collection('sellers')
        
        let seller = await sellersCollection
        .findOneAndUpdate(filter, { $set: body }, { returnDocument: 'after' })

        if(seller.value){
            res.status(200).json({ 
                data: seller.value,
                message: "Seller updated successfully"
            })
        }else{
            res.status(404).json({
                messsage: "Seller not found",
                code: 404,
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: error.message || "Seller update operation failed",
            code: 500,
        })
    }
})

