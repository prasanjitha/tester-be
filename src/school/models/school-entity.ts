import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('school')
export class SchoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(type => User, user => user.school, { eager: true })
    user: User[];

    @Column()
    userId: number;

}
