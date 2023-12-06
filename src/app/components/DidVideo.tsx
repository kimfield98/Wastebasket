import React, { useEffect, useRef, useState, createRef, RefObject } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@nextui-org/react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { set } from "video.js/dist/types/tech/middleware";
import { userLoginState } from "../recoil/dataRecoil";
import { useRecoilValue } from "recoil";

interface VideoData {
  video_url: string;
  // 다른 필요한 필드 추가
}

interface VideoUploaderProps {
  dID: string;
  onUploadComplete: (videoUrl: string) => void;
}

interface VideoPlayerProps {
  dID: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ dID }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isLogin = useRecoilValue(userLoginState);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // 파일 크기 및 이름 검사 로직
      if (file.size > 10 * 1024 * 1024) {
        setFileError('파일 크기가 10MB를 초과합니다.');
        return;
      }

      if (file.name.length > 12) {
        setFileError('파일 이름 길이가 12자를 초과합니다.');
        return;
      }

      setFile(file);
      setFileName(file.name);
      setFileError('');
    }
  };

  const DropCancel = () => {
    setFile(null);
    setFileName("");
  };

  const uploadVideo = async () => {
    if (!file) {
      setFileError('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setFileError('');

    try {
      const response = await axios.post(`https://worldisaster.com/api/upload/${dID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, timeout: 30000
      });
      console.log(response.data);
      setFileError('업로드가 완료되었습니다.');
    } catch (error:any) {
      if (error.code === 'ECONNABORTED') {
        console.error("업로드 시간 초과",error);
        setFileError('업로드 시간이 초과되었습니다.');
      } else {
        console.error("업로드 실패", error);
        setFileError('업로드 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
      alert(fileError)
    }
  };

  setTimeout(()=>{
    setFileError("")
  },5000)

  return (
    <>
    {!isLogin ? 
      <div className="m-2">
        <div
          className=" rounded-lg bg-white text-black h-20 flex justify-center items-center border-gray-600/80 border-1 mb-2"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {fileName ? 
          <>
          선택된 파일: {fileName}
            <div className="m-2" onClick={DropCancel}>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-black hover:text-gray-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
          </>: fileError? <div>{fileError}</div>:<div>파일을 드래그 해주세요.</div>}
        </div>
        <div className="flex justify-end">
          <Button onClick={uploadVideo}>업로드</Button>
        </div>
      </div>:null
    }
    </>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ dID }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [videoRefs, setVideoRefs] = useState<RefObject<HTMLVideoElement>[]>([]);


  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios(`https://worldisaster.com/api/upload/${dID}`,{timeout: 5000});
        const data = response.data;
          setVideoData(data);
          setVideoRefs(videoData.map(() => createRef()));
      } catch (err) {
        if(axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("동영상이 없습니다.");
          }else if(err.code?.includes("ECONNABORTED")){
            setError("동영상을 불러오는 데 시간이 초과되었습니다.");
          } else{
            setError("동영상을 불러오는 데 실패했습니다.");
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [dID]);

  useEffect(() => {
    videoData.forEach((video: any, index: number) => {
      console.log(video.current)
      if(video.current){
        videojs(video.current, {
          controls: true,
          sources: [{
            src: video.video_url,
            type: 'video/mp4'
          }]
        });
      }
    })
  },[dID]);

  return (
    <>
      {loading && <div className="flex justify-center"><p>동영상 불러오는 중...</p></div>}
      {error && <div className="flex justify-center"><p>{error}</p></div>}
      {!loading && !error && videoData.length > 0 && (
        <div className="flex overflow-x-scroll snap-x snap-mandatory">
          {videoData.map((video: any, index: number) => (
            <div key={index} className="mx-60 snap-center w-80 bg-blue-500 flex-shrink-0">
              <video 
                ref={videoRefs[index]}
                className="video-js !w-full !h-[500px]" 
                controls 
              >
              </video>
            </div>
          ))}
        </div>
      )}
    </>
  );
};


const DidVideo: React.FC<VideoPlayerProps> = ({ dID }) => {
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("");

  const handleUploadComplete = (videoUrl: string) => {
    setUploadedVideoUrl(videoUrl); // 업로드된 비디오 URL 상태 업데이트
    // 추가적으로 필요한 작업 수행 (예: 메시지 표시, 로그 기록 등)
  };

  return (
    <div>
      <VideoPlayer dID={dID} />
      <VideoUploader dID={dID} onUploadComplete={handleUploadComplete} />
    </div>
  );
};

export default DidVideo;