import React, { useEffect, useState,useRef, createRef, RefObject } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";
import videojs from "video.js"
import "video.js/dist/video-js.css";
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
  const isLogin2 = useRecoilValue(userLoginState);
  const isLogin = true;

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
        setFileError('File size exceeds 10 MB.');
        return;
      }

      if (file.name.length > 12) {
        setFileError('File name exceeds 12 characters.');
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
      setFileError('Please select a file to upload.');
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
      setFileError('Upload completed.');
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        console.error("업로드 시간 초과", error);
        setFileError('Request timed out during upload.');
      } else {
        console.error("Upload failed.", error);
        setFileError('An error during upload.');
      }
    } finally {
      setLoading(false);
      alert(fileError)
    }
  };

  setTimeout(() => {
    setFileError("")
  }, 5000)

  return (
    <>
      {isLogin ?
        <div className="m-2">
          <div
            className=" rounded-lg bg-white text-black h-20 flex justify-center items-center border-gray-600/80 border-1 mb-2"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {fileName ?
              <>
                Selected file: {fileName}
                <div className="m-2" onClick={DropCancel}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-black hover:text-gray-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </div>
              </> : fileError ? <div>{fileError}</div> : <div>Please drag a file here.</div>}
          </div>
          <div className="flex justify-end">
            <Button onClick={uploadVideo}>Upload</Button>
          </div>
        </div> : null
      }
    </>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ dID }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [videoRefs, setVideoRefs] = useState<RefObject<HTMLVideoElement>[]>([]);


  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios(`https://worldisaster.com/api/upload/${dID}`, { timeout: 5000 });
        const data = response.data;
        if (data.length > 0) {
          setVideoData(data);
          setCurrentVideoUrl(data[0].video_url);
        } else {
          setError("No videos to display.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("No videos to display.");
          } else if (err.code?.includes("ECONNABORTED")) {
            setError("Request timed out while loading video.");
          } else {
            setError("Failed to load video.");
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [dID]);

  useEffect(() => {
    videoData.map((video, index) => {
      const videoRef = createRef<HTMLVideoElement>();
      setVideoRefs((prev) => [...prev, videoRef]);
      if (!videoRef.current) return;
      if (!videojs.getPlayers()[videoRef.current.id]) {
        videojs(videoRef.current, {
          sources: [{ src: video.video_url, type: "application/x-mpegURL"}],
        });
      } else {
        const player = videojs.getPlayers()[videoRef.current.id];
        player.src({ src: video.video_url, type: "application/x-mpegURL"});
      }
    })

    return ()=>{
      videoRefs.map((video, index) => {
        if (video.current && videojs.getPlayers()[video.current.id]) {
          videojs.getPlayers()[video.current.id].dispose();
        }
      })
    }
  }, [videoData,dID]);

  return (
    <>
      {loading && <div className="flex justify-center"><p>Loading video...</p></div>}
      <div className="flex justify-center"><p>{error}</p></div>
      {!loading && !error && videoData.length > 0 && (
        <div className="flex overflow-x-scroll snap-x snap-mandatory">
          {videoRefs.map((video, index) => (
            <div key={index} className="mx-60 snap-center w-80 bg-blue-500 flex-shrink-0">
              <video
                ref={video}
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