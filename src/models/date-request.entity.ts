import {Entity, ManyToOne} from "typeorm";
import {DoubleDate} from "./double-date";
import {CoupleEntity} from "./couple.entity";


@Entity("date_request")
export class DateRequestEntity extends DoubleDate{

    @ManyToOne(
        ()=>CoupleEntity
    )
    sender : CoupleEntity

    @ManyToOne(
        ()=>CoupleEntity
    )
    recipient : CoupleEntity

}
