import mongoose from "mongoose"

const historySchema = new mongoose.Schema({
    email:{type:String,required:true},
    date: { type: Date, required: true },
    content: { type: String, required: true },
    sort: { type: String, required: true },
    payby: { type: String, required: true },
    cost: { type: Number, required: true },
    remark: { type : String, default : '-'}
});

export default mongoose.model("history",historySchema);