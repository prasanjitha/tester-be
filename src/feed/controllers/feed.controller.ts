import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post-interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
@UseGuards(AuthGuard())
export class FeedController {
    constructor(
        private feedService: FeedService
    ) { }

    @Post()
    create(
        @Body() post: FeedPost,
        @Req() req,
    ): Promise<FeedPost> {
        console.log(req.user);

        return this.feedService.createPost(post, req.user);

    }

    @Get()
    getAllPosts(): Observable<FeedPost[]> {
        return this.feedService.findAllPosts();
    }
    @Get('/test')
    getUserPosts(
        @Req() req,
    ): Observable<FeedPost[]> {

        return this.feedService.findUserPosts(req.user);
    }

    @Get(':id')
    getPostById(
        @Param('id') id: number,
        @Req() req,
    ): Promise<FeedPost> {
        console.log(id);
        return this.feedService.findPostById(id, req.user);
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
