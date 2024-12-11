const authorisation = async (request, response, next) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({
            error: "Invalid token.",
        })
    }
    
    if (user !== "admin@gmail.com") {
        console.log('user:', user)
        return response.status(403).json({
            error: "Forbidden, unauthorised.",
        })
    }
    
    next()
}

export default authorisation