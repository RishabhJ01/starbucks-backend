import { Router, Request, Response} from "express";

const router = Router();

router.get('/healthcheck', (_req: Request, _res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try{
        _res.status(200).json(healthcheck);
        return;
    }catch(err){
        healthcheck.message = err;
        _res.status(503).json(healthcheck);
        return;
    }
})

export default router;