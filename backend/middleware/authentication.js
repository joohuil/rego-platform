import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authentication = async (request, response, next) => {
    const token = request.headers.authorization?.split(' ')[1]
    console.log(token)
  
    if (!token) {
      return response.status(401).json({ error: 'Access denied.' });
    }
  
    try {
      const { email } = jwt.verify(token, process.env.SECRET_KEY)
      request.user = email
      next()
    } catch (error) {
      response.status(401).json({ error: 'Invalid or expired token.' });
    }
}

export default authentication