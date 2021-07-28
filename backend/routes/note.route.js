const router = require('express').Router();
const {isLoggedIn} = require('../helpers/jwtVerify')
const Note = require('../models/note.model')

router.get('/getOne/:id', isLoggedIn, async (req, res) => {
    const  query = {_id: req.params.id , 'user_id': req.user._id};
    console.log(query)
    const cursor = Note.findOne(query);
    await cursor.exec((err, note) => {
        console.log(note)
        res.status(200).json(note)
    })
})

router.get('/getAll', isLoggedIn, async (req, res) => {
    const query = {'user_id': req.user._id};
    const sort = { _id: -1 };
    const limit = 500;
    const cursor =  Note.find(query, {titre: 1, created_at: 1}).sort(sort).limit(limit);
    await cursor.exec((err, doc) => {
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(doc)
        }
    })
})

router.get('/getAllByCategory/:id', isLoggedIn, async (req, res) => {
    let query = null;

    if(req.params.id !== 'null') {
        query = {'user_id': req.user._id, cat: req.params.id};
    }else{
        query = {'user_id': req.user._id};
    }
    const sort = { _id: -1 };
    const limit = 500;
    const cursor = Note.find(query, {titre: 1, created_at: 1}).sort(sort).limit(limit);
    await cursor.exec((err, doc) => {
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(doc)
        }
    })
})

router.post('/create', isLoggedIn, (req, res) => {
    const newNote = new Note({
        user_id: req.user._id.toString(),
        titre: req.body.titre,
        note: req.body.note,
        cat: req.body.cat,
        created_at: Date.now()
    })

    newNote.save((err, doc) => {
        if (err) {
            res.status(500).json('Error Create note')
        } else {
            res.status(200).json(doc)
        }
    })
})

router.put('/updateOne/:id', isLoggedIn, (req, res) => {
    console.log(req.body)
    const query = { _id: req.params.id };
    const newValues = { $set: { titre: req.body.titre, note: req.body.note, cat: req.body.cat  } };
    Note.updateOne(query, newValues, function(err, doc) {
        if (err) {
            res.status(500).json('Error Create note')
        }
        res.status(200).json(true)
    });
})

module.exports = router
