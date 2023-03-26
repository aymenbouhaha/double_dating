import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity("person")
export class PersonEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    firstName : string

    @Column()
    lastName : string

    @Column()
    phoneNumber : string

    @Column()
    birthDate : Date


}