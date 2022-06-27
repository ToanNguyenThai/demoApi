const { author, book } = require('../model/model')
const bookController = {
    // Add:
    addBook: async (req, res) => {
        try {
            const newBook = new book(req.body)
            const saveBook = await newBook.save();
            if (req.body.author) {
                const aut = author.findById(req.body.author) /* Select * as aut from author where author.id = <id author trả về> */
                await aut.updateOne({ $push: { books: saveBook._id } }) /* Update author set books = <id book trả về> where author.children = aut   */
            }
            res.status(200).json(saveBook)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getBook: async (req, res) => {
        try {
            const books = await book.find(); /* <=> SELECT * FROM AUTHOR */
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getABook: async (req, res) => {
        try {
            const myBook = await book.findById(req.params.id).populate('author') /* <=> SELECT * FROM AUTHOR where author.id = <id trả về> */
            /* populate: show value of foreign key */
            res.status(200).json(myBook)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateABook: async (req, res) => {
        try {
            const newBook = await book.findById(req.params.id);
            await newBook.updateOne({ $set: req.body })
            res.status(200).json("Update Successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteBook: async (req, res) => {  /* Chạy đồng thời 2 lệnh delete */
        try {
            await author.updateMany({ books: req.params.id }, { $pull: { books: req.params.id } })
            /* tìm cuốn sách cần xoá trong arr books của author, pull nó ra khỏi arr đó */
            /* Delete * from author where author.book.id = req.params.id */
            await book.findByIdAndDelete(req.params.id)
            /* Delete * from book where book.id = req.params.id */
            res.status(200).json("Delete Successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = bookController