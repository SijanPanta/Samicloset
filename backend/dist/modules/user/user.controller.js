import * as userServices from './user.services.js';
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userServices.createUser({ name, email, password });
        const token = await userServices.generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userServices.getUserByEmail(email);
    try {
        if (!user) {
            res.status(400).json({ error: 'User does not exist' });
        }
        else if (!(await userServices.verifyPassword(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        else {
            const token = await userServices.generateToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ token, user });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=user.controller.js.map