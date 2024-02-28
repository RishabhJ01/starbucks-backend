import {Router} from "express";
import { addOptions,getAllOptions,updateOption } from "../../controllers/optionController";
import { addCoffee } from "../../controllers/coffeeController";
const router = Router();

//option routes
router.post('/api/addoptions', addOptions);
router.get('/api/getalloptions', getAllOptions);
router.put("/api/updateoption/:id", updateOption)

//coffee routes

router.post('/api/addcoffee', addCoffee);

export default router;

