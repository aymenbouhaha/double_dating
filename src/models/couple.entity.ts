import {Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, JoinTable} from "typeorm";
import {PersonEntity} from "./person.entity";
import {PostEntity} from "./post.entity";
import {CommentEntity} from "./comment.entity";
import {ConversationEntity} from "./conversation.entity";
import {GroupConversationEntity} from "./group-conversation.entity";
import {InterestEntity} from "./interest.entity";
import {ProfilePictureEntity} from "./media/profile-picture.entity";
import {Exclude} from "class-transformer";
import {FriendEntity} from "./friend.entity";

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
    @Exclude()
    password : string

    @Column()
    @Exclude()
    salt :string

    @Column()
    anniversary : Date

    @Column({
        type : "boolean"
    })
    connected : boolean

    @Column()
    verificationCode : string

    @Column({
        type :"boolean"
    })
    verified : boolean

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

    @OneToOne(
        ()=>ProfilePictureEntity
    )
    @JoinColumn()
    profilePicture : ProfilePictureEntity

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
    @JoinTable({
        name : "groups"
    })
    groupConversation : GroupConversationEntity[]

    @ManyToMany(
        ()=>InterestEntity,
        (interest)=>interest.couples
    )
    @JoinTable({
        name : "interests"
    })
    interest : InterestEntity[]

    @OneToMany(() => FriendEntity, friend => friend.coupleOne)
    friends: FriendEntity[];

}