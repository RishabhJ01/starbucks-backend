import {Router} from "express";
import { addOptions,getAllOptions,updateOption } from "../../controllers/optionController";
const router = Router();

//option routes
router.post('/addoptions', addOptions);
router.get('/getalloptions', getAllOptions);
router.put("/updateoption/:id", updateOption)

export default router;

