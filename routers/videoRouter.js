import express from "express";
import routes from "../routes";
import {
  videos,
  upload,
  videoDetail,
  editVideo,
  deleteVideo,
} from "../controllers/userControllers";

const videoRauter = express.Router();

videoRauter.get(routes.videos, videos);
videoRauter.get(routes.upload, upload);
videoRauter.get(routes.videoDetail(), videoDetail);
videoRauter.get(routes.editVideo, editVideo);
videoRauter.get(routes.deleteVideo, deleteVideo);

export default videoRauter;
