import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ msg: `Protected route! - ${req.user.userId}` });
});

export default router;
