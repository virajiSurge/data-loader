import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly buckets: Map<
    string,
    { tokens: number; lastTokenAdded: number }
  > = new Map();

  constructor(
    private readonly capacity: number,
    private readonly interval: number,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const bucketId = `${ip}-${method}-${originalUrl}`;
    let bucket = this.buckets.get(bucketId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastTokenAdded: Date.now() };
      this.buckets.set(bucketId, bucket);
    }

    const now = Date.now();
    const elapsedTime = now - bucket.lastTokenAdded;
    const tokensToAdd = (elapsedTime * this.capacity) / this.interval;
    bucket.tokens = Math.min(bucket.tokens + tokensToAdd, this.capacity);
    bucket.lastTokenAdded = now;

    if (bucket.tokens <= 0) {
      const timeToReset = this.interval - elapsedTime;
      res.setHeader('Retry-After', Math.ceil(timeToReset / 1000).toString());
      return res.status(429).send('Too many requests');
    }

    bucket.tokens -= 1;
    next();
  }
}
