import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FeedController } from './controllers/feed.controller';
import { FeedPostEntity } from './models/post-entity';
import { FeedService } from './services/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity]),
    AuthModule,
  ],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule { }
