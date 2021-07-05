const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barangSchema = new Schema({
    nama_barang :  String,
    jumlah_barang : String,
    status : String
}, {timestamps : true});

const Barang = mongoose.model('Barang', barangSchema);

module.exports = Barang;