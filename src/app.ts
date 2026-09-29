import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env"; 
 

const PORT = env.port; 

 

const app: Application = express(); 

 

app.get("/ping", async (_req : Request, res: Response) => { 

 res.json({ 

message: "hello from Dylan S00254978" 

 }); 

}); 

app.get("/bananas", async (_req : Request, res: Response) => {
   res.json({
    message: "this is bananas",
    });
});
 
app.get("/where", async (_req : Request, res: Response) => {
   res.json({
    message: "How did we get here?",
    });
});
app.use((req, _res, next) => { 

 console.log(`${req.method} ${req.originalUrl}`); 

  next(); 

}); 

 
app.listen(PORT, () => { 

console.log("Server is running on port", PORT); 

 }); 

 