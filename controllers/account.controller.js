import errorMiddleware from '../middlewares/error.js';

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

