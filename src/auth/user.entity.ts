import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { FeedPost } from "src/feed/models/post-interface";
import { type } from "os";
import { FeedPostEntity } from "src/feed/models/post-entity";
import { SchoolEntity } from "src/school/models/school-entity";


@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(
        type => FeedPostEntity, feed => feed.user, { eager: true }
    )
    feed: FeedPostEntity[];

    @ManyToOne(
        type => SchoolEntity, school => school.user, { eager: false }
    )
    school: SchoolEntity;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}