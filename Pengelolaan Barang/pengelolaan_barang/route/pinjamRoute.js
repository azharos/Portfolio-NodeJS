const express = require('express')
const router = express.Router()
const Barang = require('../model/barang_m');
const Pinjam_m = require('../model/pinjam_m');
const mid = require('../middleware/mid');

router.get('/pinjam', mid.ceklogin, async (req,res) => {
    const pinjam = await Pinjam_m.find();
    res.render('pinjam/index',{ layout: 'layout/main', pinjam })
})

router.get('/pinjam/tambah', mid.ceklogin, async (req,res) => {
    const barang = await Barang.find();
    const date = new Date();

    // Hari
    const h = date.getDay();
    const hariArr = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
    const hari = hariArr[h];

    // Tanggal
    const tgl = date.getDate();

    // Bulan
    const blnArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const bln = date.getMonth();
    const bulan = blnArr[bln];

    // Tahun
    const tahun = date.getFullYear();

    // Waktu Sekarang
    const s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    const m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const jam = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const time = jam + ':' + m + ':' + s;

    const day = hari + ',' + ' ' + tgl + ' ' + bulan + ' ' + tahun + ' ' + time;

    res.render('pinjam/tambah', {
        layout : 'layout/main',
        barang, day
    })
})

router.post('/pinjam', async (req,res) => {
    // Update Barang
    const query = { nama_barang: req.body.barang };
    const barang = await Barang.findOne(query);

    if(barang.jumlah_barang >= parseInt(req.body.jumlah)){
        const jumlah = barang.jumlah_barang - req.body.jumlah;
        await Barang.findOneAndUpdate(query, { status: 'dipinjam',jumlah_barang : jumlah})

    // Tambah Pinjam
        const pinjam = new Pinjam_m({
            nama_pinjam : req.body.nama,
            barang_pinjam : req.body.barang,
            jumlah : req.body.jumlah,
            keperluan : req.body.keperluan,
            waktu : req.body.tanggal
        })

        pinjam.save()
        .then(result => {
            res.redirect('/pinjam')
        });
    } else{
        req.flash('gagal','Jumlah yang diinputkan melebihi kapasitas');
        res.redirect('/barang');
    }
})

router.put('/pinjam/kembalikan/:id', async (req,res) => {
    const query1 = {barang_pinjam : req.body.nama_barang}
    const query2 = {nama_barang : req.body.nama_barang}

    // Pinjam
    const peminjam = await Pinjam_m.find(query1);

    // Barang
    const brg = await Barang.findOne(query2);
    const jumlah = parseInt(brg.jumlah_barang) + parseInt(req.body.jumlah);

    if (peminjam.length == 1) {
        
        // Hapus Peminjam Terakhir
        await Pinjam_m.findByIdAndDelete(req.params.id);

        // Update Barang
        await Barang.findOneAndUpdate(query2, {
            jumlah_barang : jumlah,
            status : 'ada'
        })

    } else{
        // Hapus Peminjam Terakhir
        await Pinjam_m.findByIdAndDelete(req.params.id);
    }

    res.redirect('/pinjam');
})

module.exports = router;