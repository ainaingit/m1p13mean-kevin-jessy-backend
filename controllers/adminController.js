const { getUsersWhereRoleIs } = require('../services/userService');

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const allowedRoles = ['admin', 'shop', 'buyer'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const users = await getUsersWhereRoleIs(role);

    res.json({
      count: users.length,
      users
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsersByRole
};