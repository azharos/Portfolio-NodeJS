const Barang = require('../model/barang_m');

const index = async function (req, res) {
    const barang = await Barang.find();
    res.render('barang/index',{
        layout : 'layout/main',
        barang, msg : req.flash('sukses') , gagal : req.flash('gagal')
    });
};

const create = (req, res) => res.render('barang/tambah',{layout : 'layout/main'})

const edit = async function (req, res) {
    const brg = await Barang.findById(req.params.id);
    res.render('barang/edit',{
        layout : 'layout/main',
        brg
    })
}

const store = function (req, res) {
    const brg = new Barang({
      nama_barang : req.body.nama,
      jumlah_barang : req.body.jumlah,
      status : 'ada'
    })
  
    brg.save()
    .then(result => {
        req.flash('sukses','Barang berhasil ditambah');
        res.redirect('/barang')
    })
    .catch(err => console.log(err))
};

const hapus = async (req,res) => {
    await Barang.findByIdAndDelete(req.params.id)
    req.flash('sukses','Barang berhasil dihapus');
    res.redirect('/barang');
}

const update = async (req,res) => {
    await Barang.findByIdAndUpdate(req.body.id, {
        nama_barang : req.body.nama,
        jumlah_barang : req.body.jumlah
    })

    const brg = await Barang.findById(req.body.id);

    req.flash('sukses',`Barang ${brg.nama_barang} berhasil diupdate`);
    res.redirect('/barang');
}

module.exports = {index, create, edit,store,hapus,update};