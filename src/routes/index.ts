import {Router, Response} from "express";

const router = Router();

router.get('/', (res: Response) => {
    res.render('index', {title: "Starbucks Backend"});
})

export default router;