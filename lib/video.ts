export type videoType = {
  imgUrl: string;
};
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const getCommonVideos: any = async (url: string) => {
  try {


    const response = await fetch(url);

    const data = await response.json();

    if (data?.error) {
      console.error('Youtbe api error', data.error);
      return [];
    }

    return data?.items.map((item: any) => {
      const id = item?.id?.videoId || item.id
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id// item?.id?.videoId || item?.id?.playlistId || item?.id?.channelId,
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
}

export const getPopularVideos = (searchQuery: string) => {
  const url = `${BASE_URL}/videos?part=snippet&maxResults=25&chart=mostPopular&regionCode=US&key=${YOUTUBE_API_KEY}`;
  return getCommonVideos(url);
}