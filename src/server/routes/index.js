import { Router } from 'express';
import path from 'path';
import api from './api';
const router = new Router();

// router.use('/api', assets);
router.use('/api', api)
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File too large');
  }
  if (err.message === 'Unexpected end of form') {
    return res.status(400).send('Upload did not complete properly. Please try again.');
  }
  res.status(500).send('Server error');
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/dashboard/index.html'));
});
router.get('/ping', (req, res) => {
  res.status(201).json({
    message: 'Hello, world!',
    success: true,
  });
});
router.get('/docs', (req, resp) => {
  resp.redirect('https://documenter.getpostman.com/view/11424693/2sA3Bj8tca');
});

export default router
