import videoTestData from "../data/video.json";

export type videoType = {
  imgUrl: string;
};
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const fetchVideos = async (url: string) => {
  const response = await fetch(url);

  const data = await response.json();

  return data;
};

export const getCommonVideos: any = async (url: string) => {
  try {
    //    const response = await fetch(url);
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url); //await response.json();

    if (data?.error) {
      console.error("Youtbe api error", data.error);
      return [];
    }

    return data?.items.map((item: any) => {
      const id = item?.id?.videoId || item.id;
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id, // item?.id?.videoId || item?.id?.playlistId || item?.id?.channelId,
        description: snippet.description,
        publishTime: snippet.publishedAt || "",
        channelTitle: snippet.channelTitle,
        statistics: item.statistics
          ? item.statistics.viewCount
          : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log("error ", error);
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const url = `${BASE_URL}/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`;
  return getCommonVideos(url);
};

export const getPopularVideos = () => {
  const url = `${BASE_URL}/videos?part=snippet&maxResults=25&chart=mostPopular&regionCode=US&key=${YOUTUBE_API_KEY}`;

  // a?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
  return getCommonVideos(url);
};

export const getYoutubeVideoById = (videoId: string) => {
  // Ks-_Mh1QhMc
  const url = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=US&key=${YOUTUBE_API_KEY}`;

  // a?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
  return getCommonVideos(url);
};
