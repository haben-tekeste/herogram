import  {FileData} from "../model/file.js";

export const uploadFile = () => {
    try {
        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}

export const getFile = async () => {
    try {
        const filename = req.file.path

        const file = new FileData({
            filename,
            user: req.userId
        })
        await file.save()
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}