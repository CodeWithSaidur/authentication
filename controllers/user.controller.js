// *import model first and understand Schema carefully
// get data
// validate
// check if user already exists
// create user
// create verification token
// save token to db
// send verification email
// send response to user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please fill all fields' });
  }
  console.log('User data:', req.body);
  
  res.status(200).json({
    message: 'User registered successfully',
    data: req.body,
  });
};
