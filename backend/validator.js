exports.validateRegistration = (req, res, next) => {
	req.check('fullname', 'Full Name is required').notEmpty();
	req.check('email', 'Enter a valid Email').matches(/.+\@.+\..+/);
	req.check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long');

	const errors = req.validationErrors();
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({error: firstError});
	}
	next();
}

exports.validateLogin = (req, res, next) => {
	req.check('email', 'Enter a valid Email').matches(/.+\@.+\..+/);
	req.check('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters long');

	const errors = req.validationErrors();
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({error: firstError});
	}
	next();
}
