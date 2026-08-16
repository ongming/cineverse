const actorService = require("./actors.service.js");

const getTopActors = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const actors = await actorService.getTopActors(limit);
    res.status(200).json({
      success: true,
      data: actors,
    });
  } catch (error) {
    next(error);
  }
};

const getActorById = async (req, res, next) => {
  try {
    const actorId = req.params.id;
    const actor = await actorService.getActorById(actorId);
    res.status(200).json({
      success: true,
      data: actor,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTopActors,
  getActorById,
};
