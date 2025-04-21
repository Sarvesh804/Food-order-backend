import express, {Request,Response,NextFunction} from 'express';
import {CreateVendor}  from '../controllers';
import {GetVandors, GetVendorById} from '../controllers';

const router = express.Router();

router.post("/vendor", CreateVendor)

router.get('/vendors',GetVandors);

router.get('/vendor/:id',GetVendorById);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'Admin Route'});
});

export {router as AdminRoute};