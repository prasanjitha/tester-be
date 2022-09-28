import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('school')
export class SchoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}