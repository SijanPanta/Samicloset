import * as subscriberService from './subscriber.service.js';
export const create = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: 'Email is required' });
        const result = await subscriberService.subscribe(email);
        if (result.conflict)
            return res.status(409).json({ error: 'Email already subscribed' });
        res.status(201).json({ message: 'Subscribed successfully', subscriber: result.subscriber });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//# sourceMappingURL=subscriber.controller.js.map