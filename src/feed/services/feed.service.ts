import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post-entity';
import { FeedPost } from '../models/post-interface';

@Injectable()
export class FeedService {

    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) { }

    async createPost(feedPost: FeedPost, user: User): Promise<FeedPost> {
        const { body } = feedPost
        const feed = new FeedPostEntity();
        feed.body = body;
        feed.user = user;
        await this.feedPostRepository.save(feed);
        delete feed.user;
        return feed;
    }

    findAllPosts(): Observable<FeedPost[]> {
        return from(this.feedPostRepository.find());
    }
    findUserPosts(
        user: User,
    ): Observable<FeedPost[]> {
        const query = this.feedPostRepository.createQueryBuilder('feed_post');
        query.where('feed_post.userId =:userId', { userId: user.id });
        const tasks = from(query.getMany());
        return tasks;
    }

    async findPostById(id: number, user: User): Promise<FeedPost> {
        const found = await this.feedPostRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found.`);
        }
        return found;
    }
    updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id, feedPost));


    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.feedPostRepository.delete(id));


    }
}
