let express=require('express');
let app=express();
let joi=require('joi');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let employees=[];
async function validate(param){
    let schema=joi.object({
        name:joi.string().min(2).max(55).required(),
        age:joi.number().min(20).max(50).required(),
        salary:joi.number().required(),
        contact:joi.number().required()
    });
    let check=await schema.validateAsync (param,{abortearly:false}).catch((error)=>{
        return {error}
    });
    if(!check||check && (check.error)){
        let msg=[];
        for(let i of check.error.details){
            msg.push(i.message);
        }
        return{error:msg};
    }
    return{data:check.data}
}
    app.post('/employees',async(req,res)=>{
        let validation=await validate(req.body).catch((error)=>{return{error}});
        console.log("error",validation);
        if(!validation||(validation.error)){
            return res.send({error:validation.error});
        }
        let id=employees.length+1;
        let data=req.body;
        data.id=id;
        employees.push(data);
        return res.send({data});
    });

app.listen(3001,()=>{
    console.log('connected');
});