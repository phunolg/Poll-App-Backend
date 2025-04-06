app.post('/hello',
    abc,
    (res, req, next) => {
    try {
        const a = 5
        const b = 0
        res.json(a / b)
    }
    catch (error) {
        next(error)
    }   
})
app.use('/', err, req, res, next => {
    console.log('Middleware 2')
    console.log('err:', err)
    res.status(500).send('something went wrong') 
})
app.listen(prompt, () => {
    console.log(`Server running at http://localhost:${port}`)
})