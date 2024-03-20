var express=require('express');
var cors=require('cors');
var PrismaClient=require('prisma/prisma-client')

const app=express();
const prisma= new PrismaClient.PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes",async (req,res)=>{
    const notes=await prisma.note.findMany();
    res.json(notes);
});

app.post("/api/notes", async(req,res)=>{
    const {title,content}=req.body;

    if(!title||!content){
        return res.status(400).send("completar los campos requeridos");
    }
    try {
        const note =await prisma.note.create({
            data:{title,content}
        });
        res.json(note);
    } catch (error) {
        res.status(500).send("Algo fue mal");
    }
});

app.put("/api/notes/:id",async(req,res)=>{
    const {title,content}=req.body;
    const id=parseInt(req.params.id);

    if(!id||isNaN(id)){
        return res.status(400).send("ID debe ser un número válido");
    }
    if(!title||!content){
        return res.status(400).send("completar los campos requeridos");
    }

    try {
        const note=await prisma.note.update({
            where:{id},
            data:{title,content}
        })
        return res.json(note);
    } catch (error) {
        return res.status(500).send("Algo fue mal");
    }
});

app.delete("/api/notes/:id",async(req,res)=>{
    const id=parseInt(req.params.id);

    if(!id||isNaN(id)){
        return res.status(400).send("ID debe ser un número válido");
    }

    try {
        await prisma.note.delete({
            where:{id}
        });
        res.status(204).send();
    } catch (error) {
        return res.status(500).send("Algo fue mal");
    }
});

app.listen(5000,()=>{
    console.log("server running on localhost:5000");
});