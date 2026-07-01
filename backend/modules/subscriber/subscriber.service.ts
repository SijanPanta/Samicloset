import db from '../../models/index.js';

const { Subscriber } = db as any;

export const subscribe = async (email: string) => {
  const existing = await Subscriber.findOne({ where: { email } });
  if (existing) return { conflict: true as const };

  const subscriber = await Subscriber.create({ email });
  return { conflict: false as const, subscriber };
};
