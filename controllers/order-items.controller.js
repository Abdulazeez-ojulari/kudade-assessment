import errorMiddleware from '../middlewares/error.js';

export const getOrderItems = errorMiddleware(async (req, res) => {
    const query = req.query || {}
    const filter = {seller_id: req.user.seller_id}
    try {

        const db = req.app.locals.db;
        const orderItemsCollection = await db.collection('order_items')
        
        let getPaginate = await paginate(orderItemsCollection, query, filter);
        let sortBy = (query.sortBy && query.sortBy === "price") ? {price: 1} : {shipping_limit_date: 1}
        
        const orderItems = await orderItemsCollection
            .aggregate( [
                {$match: filter},
                {$sort: sortBy},
                {$skip: getPaginate.skip},
                {$limit: getPaginate.limit},
                {
                $lookup:{
                    from: "products",
                    localField: "product_id",
                    foreignField: "product_id",
                    as: "product"
                    }
                }
                ])
            .toArray()

        res.status(200).json({ 
            data: toApiOrderItemSchema(orderItems), 
            total: getPaginate.docCount, 
            limit: getPaginate.limit,
            offset: parseInt(query.offset) || 1
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: error.message || "Get order items operation failed",
            code: 500,
        })
    }
})

export const deleteItem = errorMiddleware(async (req, res) => {
    let id = req.params.id
    try {
        
        const db = req.app.locals.db;
        const filter = {seller_id: req.user.seller_id, order_id: id}
        const orderItemsCollection = await db.collection('order_items')
        
        let orderItem = await orderItemsCollection.findOneAndDelete(filter)
        if(orderItem.value){
            res.status(200).json({ 
                data: orderItem.value,
                message: "Order deleted successfully"
            })
        }else{
            res.status(404).json({
                messsage: "Item not found",
                code: 404,
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: error.message || "Delete order item operation failed",
            code: 500,
        })
    }
})

const paginate = async (orderItemsCollection, query, filter) => {
    const limit = (query.limit && parseInt(query.limit) && parseInt(query.limit) <= 100) ? parseInt(query.limit) : 20;
    let skip = query.offset ? limit * (parseInt(query.offset) - 1) : 0;
 
    const docCount = await orderItemsCollection.countDocuments(filter);
    if (docCount < skip) {
      skip = (parseInt(query.offset) - 1) * limit;
    }
    return { skip, limit, docCount };
};

const toApiOrderItemSchema = function(data) {
    return data.map(function(orderItem) {
        return {
            id: orderItem.order_id,
            product_id: orderItem.product_id,
            product_category: orderItem.product[0].product_category_name,
            price: orderItem.price,
            date: orderItem.shipping_limit_date
        }
    })
}