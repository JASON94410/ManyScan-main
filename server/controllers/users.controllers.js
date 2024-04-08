const User = require("../models/user.model");

// module.exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});

//         if (users && users.length > 0) {
//             res.status(200).json({
//                 message: "Users retrieved successfully",
//                 data: users,
//             });
//     } else {
//       res.status(404).json({
//         message: "No users found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error",
//       error: error,
//     });
//     console.error(error)
//   }
// };

module.exports.getAllUsers = async (req, res) => {

  try {
    // Vérifier si l'utilisateur est un administrateur
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Accès refusé",
      });
    }
    const users = await User.find({}, "username isOnline"); // Sélectionner uniquement les champs requis

    if (users && users.length > 0) {
      res.status(200).json({
        message: "Utilisateurs récupérés avec succès",
        data: users,
        token,
        role: req.user.role,
      });
    } else {
      res.status(404).json({
        message: "Aucun utilisateur trouvé",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    const userConnected = await User.findById(user_id);
    if (userConnected) {
      res.status(200).json({
        message: "User data",
        data: userConnected,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username = username;
    user.email = email;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

module.exports.editPassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Vérifie si l'ancien mot de passe est correct
    const isPasswordMatch = await User.login(user.email, password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Old incorrect password.",
      });
    }

    // Met à jour le nouveau mot de passe
    await user.changePassword(newPassword);

    res.status(200).json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("editPassword error", error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error,
    });
  }
};
module.exports.delelteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      data: userId,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};
