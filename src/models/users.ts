import {z} from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Renault
 *         model:
 *           type: string
 *           example: Megane
 *         year:
 *           type: integer
 *           example: 2010
 */
export const createCarZSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1950), // The year the first car was invented
});