import {Router, Request, Response} from "express";

const router = Router();

router.get('/', (_req: Request, _res: Response) => {
    _res.render('index', {title: "Starbucks Backend Microservice"});
})

export default router;