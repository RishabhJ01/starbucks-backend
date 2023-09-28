import { Router, Response } from "express";

const router = Router();

router.get('/healthcheck', (res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try{
        return res.status(200).json(healthcheck);
    }catch(err){
        healthcheck.message = err;
        return res.status(503).json(healthcheck);
    }
})

export default router;