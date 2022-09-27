import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post-interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService
    ) { }

    @Post()
    create(
        @Body() post: FeedPost
    ): Observable<FeedPost> {
        console.log('call feed');
        return this.feedService.createPost(post)

    }

    @Get()
    getAllPosts(): Observable<FeedPost[]> {
        return this.feedService.findAllPosts();
    }

    @Get(':id')
    getPostById(
        @Param('id') id: number
    ): Observable<FeedPost> {
        console.log(id);
        return this.feedService.findPostById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() post: FeedPost
    ): Observable<UpdateResult> {
        return this.feedService.updatePost(id, post);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
