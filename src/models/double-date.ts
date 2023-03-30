import {Column, PrimaryGeneratedColumn} from "typeorm";


export abstract class DoubleDate {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    place : string

    @Column()
    date : Date


}