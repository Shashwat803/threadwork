export interface IPost{
    id:string,
    _id?:string,
    imagesOrVideos:string[],
    text:string,
    comments:string[],
    likes:string[],
    commentCount:number,
    likeCount:number,
    createdAt:string
}