const DummySchema= require('../models/dummyModel')
let dummies

const DB_NAME = process.env.DB_NAME
const injectDumyDB = async (conn) => {
  if (dummies) {
    return;
  }
  try {
    dummies = await conn.db(DB_NAME).collection("dummy");
  } catch (e) {
    console.error(`Unable to establish collection handles in dummiesDAO: ${e}`);
  }
};

const addEntry = async(req , res)=>{
    let dummy = await DummySchema(req.body)
    try {
        await dummies.insertOne(dummy)
        res.status(201).json({message:"Success", success:true})
    } catch (e) {
        res.status(400).json({message:"Error" , error:e , success:false})
    }
}

module.exports = {injectDumyDB , addEntry}