import { Router } from "express"

// const router = Router()

// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Internal server error" });
// });

// export default router;

const errorHandle = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message || "Internal server error",
        stack: err.stack || undefined,
    });
    }
// const resError = {
//     // statusCode: err.statusCode || 500,
//     message: err.message || "Internal server error",
//     stack: err.stack || "",
// };
// res.status(err.statusCode);

export default errorHandle;