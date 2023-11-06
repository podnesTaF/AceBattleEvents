import { IEvent, IMedia, IHashtag, IContent} from "@lib/models";

export type INews = {
    id: number;
    title: string;
    mainImage?: IMedia;
    contents: IContent[];
    hashtags: IHashtag[];
    relatedNews: {
      newsPreviews: NewsPreview[];
      totalPages: number;
    };
    relatedEvents?: IEvent[];
    createdAt: string;
  };

  export type NewsPreview = {
    id: number;
    title: string;
    previewText?: string;
    smallImageUrl?: string;
    createdAt: string;
    mainImage?: IMedia;
  };
  