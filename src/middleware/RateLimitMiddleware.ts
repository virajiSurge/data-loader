// rate-limit.middleware.ts
import { LeakyBucket } from 'leaky-bucket';
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly bucket: LeakyBucket = new LeakyBucket({
    capacity: 10,
    interval: 1000,
  });

  use(request: Request, response: Response, next: NextFunction) {
    const ip = request.ip;

    if (!this.bucket.canAdd(ip)) {
      response.status(HttpStatus.TOO_MANY_REQUESTS);
      response.json({
        message: 'Too many requests',
      });
      return;
    }

    next();
  }
}
