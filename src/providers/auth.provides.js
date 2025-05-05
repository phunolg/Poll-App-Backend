import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthProvider {
    async encodeToken(user) {
        return jwt.sign(
            { id: user._id.toString() },
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: 'HS256',
        }
    );

    return token;
    }

    async decodeToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
            
    }
}
export default new AuthProvider();