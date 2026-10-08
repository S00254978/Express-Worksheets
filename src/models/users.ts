import {z} from "zod";

export const createCarZSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1950), // The year the first car was invented
});