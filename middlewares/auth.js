const auth = async function(req, res, next) {

    var authheader = req.headers.authorization;
 
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return res.status(401).send({ messsage: 'You are not authenticated!'});
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var seller_id = auth[0];
    var zip_code_prefix = auth[1];

    const db = req.app.locals.db;
    const sellerCollection = await db.collection('sellers')

    let seller = await sellerCollection.findOne({seller_id, seller_zip_code_prefix: parseInt(zip_code_prefix)})

    if (seller) {
        // If Authorized user
        req.user = seller
        return next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return res.status(401).send({ messsage: 'You are not authenticated!'});
    }


    // let jwtto = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MzY0OTI3MzkzIiwibmFtZSI6IlByZWNpc2UgTGlnaHRpbmcgV2VtYSBUcmFuc2ZlciIsImlhdCI6MTUxNjIzOTAyMn0.zA7-Gqke7lqN1WK897ZfFeMhi4nmN0ybpTFsQIbQ3Uk'
    // const token = req.header('Authorization');
    // if(!token) return res.status(401).send({ messsage: 'Access denied no token provided'});
    // try{
    //     // const decoded = jwt.verify(token.trim().split(' ')[1], 'wema transfer');
    //     // console.log(decoded)
    //     if(token.trim().split(' ')[0] === 'Bearer'){
    //         if(token.trim().split(' ')[1] === jwtto) {
    //             next();
    //         }else{
    //             res.status(400).send({ messsage: 'Invalid token provided'});
    //         }
    //     }else{
    //         res.status(400).send({ messsage: 'wrong auth type'});
    //     }
    // }catch(err){
    //     res.status(401).send({ messsage: 'Invalid token provided'});
    // }
}

export default auth