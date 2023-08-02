import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try{
        return res.status(200).json(healthcheck);
    }catch(err){
        healthcheck.message = err;
        res.status(503).json(healthcheck);
    }
})

export default router;