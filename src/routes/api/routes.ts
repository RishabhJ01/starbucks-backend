import {Router} from "express";
import { addValues } from "../../controllers/optionController";
const router = Router();

//option routes
router.post('/addvalues', addValues);

export default router;

