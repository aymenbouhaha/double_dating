import {Entity, ManyToOne} from "typeorm";
import {DoubleDate} from "./double-date";
import {CoupleEntity} from "./couple.entity";

@Entity("date_schedule")
export class DateScheduleEntity extends DoubleDate{

    @ManyToOne(
        ()=>CoupleEntity
    )
    firstCouple : CoupleEntity

    @ManyToOne(
        ()=>CoupleEntity
    )
    secondCouple : CoupleEntity


}
