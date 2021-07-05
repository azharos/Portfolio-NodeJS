const express = require('express')
const router = express.Router()
const BarangController = require('../controller/barangController');
const mid = require('../middleware/mid');

router.get('/barang', mid.ceklogin ,BarangController.index);
router.get('/barang/tambah', mid.ceklogin, BarangController.create)
router.get('/barang/:id', mid.ceklogin, BarangController.edit)
router.post('/barang', BarangController.store)
router.put('/barang', BarangController.update)
router.delete('/barang/:id', BarangController.hapus)

module.exports = router;