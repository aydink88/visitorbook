const myProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.userData.userId });
};

const getProfile = async (req, res) => {
  res.status(200).json({ success: true, user: req.params.uid });
};

const createProfile = async (_req, res) => {
  res.status(200).json({ success: true, profile: "created" });
};

const updateProfile = async (req, res) => {
  res.status(200).json({ success: true, profile: req.params.uid });
};

const deleteProfile = async (req, res) => {
  res.status(200).json({ success: true, profile: req.params.uid });
};

module.exports = { myProfile, getProfile, createProfile, updateProfile, deleteProfile };
