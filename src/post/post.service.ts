import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../models/post.entity";
import {CoupleService} from "../couple/couple.service";
import { v4 as uuidv4 } from 'uuid';
import {PostDto} from "./dto/Post.dto";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {MediaEntity} from "../models/media/media.entity";

@Injectable()
export class PostService {
    constructor(
                private coupleservice : CoupleService,
                @InjectRepository(PostEntity)
                private postRepo : Repository<PostEntity>,
    ) {
    }
    async createPost(couple: Partial<CoupleEntity>, post : PostDto, files : Array<Express.Multer.File> )
    {
        const medias : MediaEntity[] =[]
        files.forEach(
            (file)=>{
                const media = new MediaEntity()
                const uuid = uuidv4()
                media.name=uuid
                media.data=file.buffer
                media.type=file.mimetype
                medias.push(media)
            }
        )
        const newPost =this.postRepo.create({
            owner : couple,
            caption : post.caption,
            medias : medias
        })
        try {
            return this.postRepo.save(newPost)
        }catch (e) {
            console.log(e)
            throw new ConflictException()
        }
    }

    async findPostById(id : number){
        return await this.postRepo.findOne({
            where : {id : id},
            relations : ["owner"]
        })
    }

}
