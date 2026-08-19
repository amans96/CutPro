import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export const verifyToken = (req, res, next) => {
  try {
    // 1. Grab the token from the headers (Standard format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // 2. Extract just the token string
    const token = authHeader.split(' ')[1];

    // 3. Verify the token is real and hasn't expired
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Attach the decoded user data (userId, role) to the request object
    // This allows your controllers to know EXACTLY who is making the request
    req.user = decoded;

    // 5. Let the user pass through to the actual route
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};