const authService = require('../services/authService');
const cloudinary = require('cloudinary').v2;

async function signup(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    const userInfo = { username, firstName, lastName, email, password };

    console.log(userInfo);
    const result = await authService.registerUser(userInfo);
  
    res.status(result.status).json({ message: result.message, token: result.token, userId: result.userId});
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
      const result = await authService.loginUser(username, password);

      console.log('Result: ' + result.userId);

      if (result.status === 200) {
        return res.status(200).json({ token: result.token, username: result.username});
      }

      return res.status(result.status).json({ message: result.message });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}

async function userInfoSignUp(req, res) {
  const { location, birthday, bio, nationality, mobileNumber } = req.body;

  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Profile picture is required.' });
  }

  try {
    // Upload file to Cloudinary with folder specified
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profilePics' 
    });

    const userInfo = {
      location,
      birthday,
      bio,
      nationality,
      mobileNumber,
      profilePicUrl: result.secure_url
    };

    const updateResult = await authService.userInformation(req.user.id, userInfo);

    res.status(updateResult.status).json({ message: updateResult.message });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading file to Cloudinary' });
  }
}

module.exports = { signup, login, userInfoSignUp };