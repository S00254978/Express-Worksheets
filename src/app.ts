import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env"; 
import { connectDB } from "./config/database";
import { CarController } from "./controllers/cars";
import { authenticateKey } from "./middleware/auth.middleware";
import { logRequests } from "./middleware/logging.middleware";
import { validate } from "./middleware/validate.middleware";
import { z } from "zod";
 

const PORT = env.port; 
const carSchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.number().int()
});
 

const app: Application = express(); 
const carController = new CarController();

app.use(express.json());
app.use(logRequests);

app.get("/api/v1/cars", carController.getCars);
app.get("/api/v1/cars/:id", carController.getCarById);
app.post("/api/v1/cars", authenticateKey, validate(carSchema), carController.createCar);
app.put("/api/v1/cars/:id", authenticateKey, validate(carSchema), carController.updateCar);
app.delete("/api/v1/cars/:id", authenticateKey, carController.deleteCar);

 

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

 