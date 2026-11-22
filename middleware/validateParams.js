// middleware/validateParams.js
//
// Route-parameter validators, registered with router.param(name, handler).
//
// Mongoose throws a CastError when a path parameter can't be cast to the
// schema type it is matched against (e.g. "abc" for an ObjectId or Number
// field). Most controllers catch that and answer 500. These validators reject
// malformed values up front with a 400 so the controller is never reached.
//
// Pick the validator by the type of the model field the parameter is matched
// against — findById(...) means _id (ObjectId); a field match means that
// field's type. String fields never cast-fail and need no validator.

const OBJECT_ID = /^[a-f0-9]{24}$/i;
const INTEGER = /^-?\d+$/;

// router.param handler signature: (req, res, next, value, name)
function objectIdParam(req, res, next, value, name) {
  if (OBJECT_ID.test(value)) return next();
  return res
    .status(400)
    .json({ error: `Invalid ${name}: expected a 24-character hex ObjectId` });
}

function numberParam(req, res, next, value, name) {
  if (INTEGER.test(value)) return next();
  return res.status(400).json({ error: `Invalid ${name}: expected an integer` });
}

module.exports = { objectIdParam, numberParam };
