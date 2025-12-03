import User from "../models/user.js";

export const resetAllScores = async (req, res) => {
  console.log("RESET ROUTE HIT");

  try {
    const result = await User.updateMany({}, { $set: { totalScore: 0 } });
    console.log("UPDATE RESULT:", result);

    return res.status(200).json({
      success: true,
      message: "All user scores have been reset to 0.",
    });
  } catch (error) {
    console.log("RESET ERROR:", error); // ← SHOW ACTUAL ERROR

    return res.status(500).json({
      success: false,
      message: "Failed to reset scores.",
      error: error.message,
    });
  }
};
