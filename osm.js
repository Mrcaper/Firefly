let express=require('express');
let app=express();
let joi=require('joi');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let employees=[];
app.use((req,res,next)=>{
    if(req.body.name){
        next()
    }
    else{
        req.body.name="ajka";
        next()
    }
})
app.get("/",(req,res)=>{
    return res.send("hello")
})
async function validate(param){
    let schema=joi.object({
        name:joi.string().min(2).max(55).required(),
        age:joi.number().required()
    });
    let check=await schema.validateAsync(param,{abortearly:false}).catch((error)=>{error}
    );
    let msg=[];
    if(!check||(check && check.error)){
        console.log(check.error)
        for(let i of check.error.details){
            msg.push(i.message);
        }
        return{error:msg};
    }
    return{data:check.data};
}
    app.post("/employees",async(req,res)=>{
        let validation=await validate(req.body).catch((error)=>{return{error}});
        if(!validation||(validation&&validation.error)){
            return res.send({error:validation.error})
        }
        let id = employees.length+1;
        let data=req.body;
        data.id=id;
        employees.push(data);
        return res.send({data});
    });
        app.listen(3002,()=>{
            console.log('connected')
    });