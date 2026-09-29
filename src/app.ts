import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env"; 
import { connectDB } from "./config/database";
import { CarController } from "./controllers/cars";
import { authenticateKey } from "./middleware/auth.middleware";
 

const PORT = env.port; 

 

const app: Application = express(); 
const carController = new CarController();

app.use(express.json());

app.get("/cars", carController.getCars);
app.get("/cars/:id", carController.getCarById);
app.post("/cars", authenticateKey, carController.createCar);
app.put("/cars/:id", authenticateKey, carController.updateCar);
app.delete("/cars/:id", authenticateKey, carController.deleteCar);

 

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

 
const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    } catch (error) {
        console.error("Unable to start server:", error);
        process.exit(1);
    }
};

startServer();

 