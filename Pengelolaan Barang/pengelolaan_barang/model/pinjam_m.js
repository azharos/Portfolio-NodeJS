const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinjamSchema = new Schema({
    nama_pinjam : String,
    barang_pinjam : String,
    jumlah : String,
    keperluan : String,
    waktu : String
});

const Pinjam = mongoose.model('Pinjam',pinjamSchema);

module.exports = Pinjam;