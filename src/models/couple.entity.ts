import {Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, JoinTable} from "typeorm";
import {PersonEntity} from "./person.entity";
import {PostEntity} from "./post.entity";
import {CommentEntity} from "./comment.entity";
import {ConversationEntity} from "./conversation.entity";
import {GroupConversationEntity} from "./group-conversation.entity";
import {InterestEntity} from "./interest.entity";

@Entity("couple")
export class CoupleEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column(
        {
            unique : true
        }
    )
    username : string

    @Column({
        unique : true
    })
    email : string

    @Column()
    password : string

    @Column()
    salt :string

    @Column()
    anniversary : Date

    @OneToOne(
        () => PersonEntity,
        {
            cascade : true
        }
    )
    @JoinColumn()
    firstPartner : PersonEntity

    @OneToOne(
        () => PersonEntity,
        {
            cascade : true
        }
    )
    @JoinColumn()
    secondPartner : PersonEntity

    @Column()
    profilePicture : string

    @ManyToMany(
        () => CoupleEntity
    )
    @JoinTable()
    friends : CoupleEntity[]

    @OneToMany(
        () => PostEntity,
        (post)=>post.owner
    )
    posts : PostEntity[]

    @OneToMany(
        () => CommentEntity,
        (comment)=>comment.owner
    )
    comments : CommentEntity[]

    @OneToMany(
        () => ConversationEntity,
        (conv)=>conv.author
    )
    asAuthorConvo : ConversationEntity[]

    @OneToMany(
        () => ConversationEntity,
        (conv)=>conv.recipient
    )
    asRecepientConvo : ConversationEntity[]

    @ManyToMany(
        ()=>GroupConversationEntity,
        (grp)=>grp.participants
    )
    @JoinTable()
    groupConversation : GroupConversationEntity[]

    @ManyToMany(
        ()=>InterestEntity,
        (interest)=>interest.couples
    )
    @JoinTable()
    interest : InterestEntity[]
}