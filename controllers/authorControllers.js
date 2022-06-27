const { author, book } = require('../model/model')
const authorController = {
    // Add:
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new author(req.body)
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllAuthor: async (req, res) => {
        try {
            const authors = await author.find(); /* <=> SELECT * FROM AUTHOR */
            res.status(200).json(authors)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAnAuthor: async (req, res) => {
        try {
            const aut = await author.findById(req.params.id).populate('books') /* <=> SELECT * FROM AUTHOR where author.id = <id trả về> */
            /* populate: show value of foreign key */
            res.status(200).json(aut)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateAnAuthor: async (req, res) => {
        try {
            const aut = await author.findById(req.params.id);
            await aut.updateOne({ $set: req.body })
            res.status(200).json("Update Successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            await book.updateMany({ author: req.params.id }, { author: null })
            /* tìm tác giả cần xoá trong field author, set = null */
            /* Delete * from book where book.author.id = req.params.id */
            await author.findByIdAndDelete(req.params.id)
            /* Delete * author book where author.id = req.params.id */
            res.status(200).json("Delete Successfully")

        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = authorController