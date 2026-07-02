import db from '../../models/index.js';
const { Subscriber } = db;
export const subscribe = async (email) => {
    const existing = await Subscriber.findOne({ where: { email } });
    if (existing)
        return { conflict: true };
    const subscriber = await Subscriber.create({ email });
    return { conflict: false, subscriber };
};
//# sourceMappingURL=subscriber.service.js.map