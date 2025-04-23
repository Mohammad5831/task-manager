const fs = require('fs');
const path = require('path');
const { User, Task } = require('../model');

// ایجاد تسک
const createTask = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { taskName, description } = req.body;
        const attachment = req.file ? req.file.path : null;
        let downloadName = null;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'کاربر یافت نشد' });
        }
        if(attachment){
            downloadName = path.basename(attachment);
        }
        const newTask = await Task.create({
            taskName,
            description,
            userId,
            attachment,
            downloadName
        });

        res.status(201).json({ message: 'تسک با موفقیت ایجاد شد', newTask})
    } catch (error) {
        res.status(500).json({ message: 'خطا در ایجاد تسک', error: error.message })
    }
};

// دریافت تسک های مربوط به کاربر
const getTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Task.findAndCountAll({
            where: { userId },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            tasks: rows
        });
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت تسک ها', error: error.message })
    }
};

// دریافت اطلاعات یک تسک خاص
const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'تسک موردنظر یافت نشد' })

        res.status(201).json({ message: 'تسک: ', task })
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت تسک', error: error.message })
    }
};

// ویرایش اطلاعات یک تسک با ایدی
const updateTask = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { taskId } = req.params;
        const { taskName, description } = req.body;
        const attachment = req.file?.path;
        const task = await Task.findByPk(taskId);
        let downloadName = task.downloadName? task.downloadName : null;
        
        if (!task) return res.status(404).json({ message: 'تسک موردنظر یافت نشد' })
            if (userId !== task.userId) return res.status(403).json({ message: 'شما مجاز به ویرایش این تسک نیستید' });
        


        if (attachment) {
            downloadName = path.basename(attachment);
            if (task.attachment) {
                const oldAttachment = path.join(__dirname, '..', task.attachment);
                if (fs.existsSync(oldAttachment)) {
                    fs.unlinkSync(oldAttachment);
                }
            }
            task.attachment = attachment;
            task.downloadName = downloadName;
        }
        if (taskName) task.taskName = taskName;
        if (description) task.description = description;

        await task.save()

        return res.status(201).json({ message: 'تسک با موفقیت ویرایش شد', task })

    } catch (error) {
        res.status(500).json({ message: 'خطا در ویرایش تسک', error: error.message })
    }
};

// حذف یک تسک خاص با ایدی
const deleteTask = async (req, res) => {
    const userId = req.user?.userId;
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) return res.status(404).json({ message: 'تسک موردنظر یافت نشد' })
    if (userId !== task.userId) return res.status(403).json({ message: 'شما مجاز به حذف این تسک نیستید' });

    // حذف فایل پیوست
    if (task.attachment) {
        const attachmentPath = path.join(__dirname, '..', task.attachment);
        if (fs.existsSync(attachmentPath)) {
            fs.unlinkSync(attachmentPath);
        }
    }

    await task.destroy();
    return res.status(201).json({ message: 'تسک با موفقیت حذف شد' });
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};