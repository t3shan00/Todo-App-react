import { pool } from '../helper/db.js'
import { Router } from 'express'
import { empty0rRows } from '../helper/util.js'

const router = Router()

router.get('/', (req,res) => {
    pool.query('select * from task',(error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(empty0rRows(result))
    })
})

router.post('/create', (req,res) => {
    pool.query('insert into task (description) values ($1) returning *', [req.body.description],
        (error,result) => {
            if (error) {
                return next(error)
            }
            return res.status(200).json(empty0rRows(result))
        }
    )
})

router.delete('/delete/:id', (req,res) => {
    const id = parseInt(req.params.id)
    pool.query('delete from task where id = $1', [id],
        (error,result) => {
            if (error) {
                return next(error)
            }
            return res.status(200).json(empty0rRows(result))
        }
    )
})

export { router as todoRouter }