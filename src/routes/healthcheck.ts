import { Router, Response, Request } from "express";

const router = Router();

router.get('/healthcheck', (_req: Request,_res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try{
        return _res.status(200).json(healthcheck);
    }catch(err){
        healthcheck.message = err;
        return _res.status(503).json(healthcheck);
    }
})

export default router;