const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const checkJwt = (req, res) => {
  const decodedJwt = decodeJwt(req, res);
  if (decodedJwt instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
  }
  if (decodedJwt instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "잘못된 토큰입니다." });
  }
  res.status(StatusCodes.OK).json({ decodedJwt: decodedJwt });
};
const decodeJwt = (req, res) => {
  try {
    let receivedJwt = req.headers["authorization"];
    let decodedJwt = jwt.verify(receivedJwt, process.env.SECRET_KEY);
    return decodedJwt;
  } catch (error) {
    return error;
  }
};

module.exports = { checkJwt, decodeJwt };
