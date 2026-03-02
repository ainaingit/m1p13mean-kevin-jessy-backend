const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const authHeader = req.header('Authorization');

  if(!authHeader) 
    return res.status(401).json({message:'Accès refusé'});

  const token = authHeader.split(' ')[1]; // <-- récupère juste le token

  if(!token)
    return res.status(401).json({message:'Token manquant'});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(400).json({message:'Token invalide'});
  }
}