const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const userObj = req.body
  const flattenObj = (ob) => {
    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {

      // We check the type of the i using
      // typeof() function and recursively
      // call the function again
      if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        for (const j in temp) {

          // Store temp in result
          result[i + '.' + j] = temp[j];
        }
      }

      // Else store ob[i] in result directly
      else {
        result[i] = ob[i];
      }
    }
    return result;
  };
  const objArr = [];
  objArr.push(flattenObj(userObj.rating));
  objArr.push(flattenObj(userObj.stage));
  objArr.push(flattenObj(userObj.personalData));
  objArr.push(flattenObj(userObj.travelInfo));
  objArr.push(flattenObj(userObj.travelIdeas));
  objArr.push(flattenObj(userObj.negotiation));

  let flattenedObj = objArr.reduce(function(acc, val) {
    return Object.assign(acc, val);
  },{});

  const user = new User(flattenedObj);
  try {
    await user.save();
    return res.status(200).json({ message: 'Account successfully created! Please sign in' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const checkEmail = async (req, res, next) => {
  const email = req.body.email;
  const existingEmail = await User.find({ email });
  try {
    if (existingEmail.length === 0) {
      return res.status(200).json({ message: 'Ok' });
    } else {
      return res.status(400).json({ error: 'Email already exists. Please try another email address.' });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};


exports.create = create;
exports.checkEmail = checkEmail;
