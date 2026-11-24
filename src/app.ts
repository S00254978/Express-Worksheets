import express, {Application, Request, Response} from "express" ; 
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { CarController } from "./controllers/cars";
import { authenticateKey } from "./middleware/auth.middleware";
import { logRequests } from "./middleware/logging.middleware";
 

export const app: Application = express(); 
const carController = new CarController();

app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/v1/cars", carController.getCars);
app.get("/api/v1/cars/:id", carController.getCarById);
app.post("/api/v1/cars", authenticateKey, carController.createCar);
app.put("/api/v1/cars/:id", authenticateKey, carController.updateCar);
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

