import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly buckets: Map<
    string,
    { vaccantSlots: number; lastVaccantSlotAddedTime: number }
  > = new Map();

  use(req: Request, res: Response, next: NextFunction) {
    const capacity = 10;
    const interval = 5;
    const { ip, method, originalUrl } = req;

    const bucketId = `${ip}-${method}-${originalUrl}`;
    let bucket = this.buckets.get(bucketId);

    if (!bucket) {
      bucket = { vaccantSlots: capacity, lastVaccantSlotAddedTime: Date.now() };
      this.buckets.set(bucketId, bucket);
    } else {
      const now = Date.now();
      const elapsedTime = now - bucket.lastVaccantSlotAddedTime;
      const vaccantSlotsToAdd = (elapsedTime * capacity) / interval;
      bucket.vaccantSlots = Math.min(
        bucket.vaccantSlots + vaccantSlotsToAdd,
        capacity,
      );
      bucket.lastVaccantSlotAddedTime = now;
    }

    if (bucket.vaccantSlots <= 0) {
      return res.status(429).send('Too many requests');
    }

    bucket.vaccantSlots -= 1;
    next();
  }
}
