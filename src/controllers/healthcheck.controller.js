const healthcheck = async (req, res) => {
  const dateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  try {
    res.status(200).json({
      status: 200,
      message: "Ok",
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      timestamp: dateFormatted,
    });
  } catch (error) {
    res.status(503).json(error);
  }
};

export default healthcheck;
