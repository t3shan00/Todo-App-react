import { empty0rRows } from '../helper/util.js'
import { selectAllTasks, insertTask, deleteTaskById } from '../models/Task.js'

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(empty0rRows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req,res,next) => {
    try {
        if (!req.body.description || req.body.description.length === 0) {
            const error = new Error('Invalid description for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        const result = await deleteTaskById(taskId);

        if (result.rowCount === 0) {
            const error = new Error(`Task with id ${taskId} not found`);
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({ id: taskId, message: 'Task deleted successfully' });
    } catch (error) {
        return next(error);
    }
};

export { getTasks, postTask, deleteTask }