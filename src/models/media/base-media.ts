import {Column, PrimaryGeneratedColumn} from "typeorm";


export class BaseMedia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: 'longblob' })
    data: Buffer;
}