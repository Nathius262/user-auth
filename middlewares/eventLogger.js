export const logger = async (req, res, next) => {
    const start = Date.now();
    res.on('finish', ()=>{
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.hostname} ${req.method} ${req.url} ${res.statusCode} time- ${duration}ms`)
    })
    next();
}