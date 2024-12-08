import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    createGroup,
    getAllGroups,
    getGroupDetails,
    deleteGroup,
    requestJoinGroup,
    handleJoinRequest,
    removeMember,
    leaveGroup,
    getPendingRequests,
    addMovieToGroup,
    getGroupMovies,
    removeGroupMovie,
    addShowtimeToGroup,
    getGroupShowtimes,
    removeGroupShowtime
} from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", verifyToken, createGroup);
router.get("/", getAllGroups);
router.get("/:id", verifyToken, getGroupDetails);
router.delete("/:id", verifyToken, deleteGroup);
router.post("/:id/join", verifyToken, requestJoinGroup);
router.post("/requests/:request_id", verifyToken, handleJoinRequest);
router.delete("/:group_id/members/:user_id", verifyToken, removeMember);
router.delete("/:id/leave", verifyToken, leaveGroup);
router.get("/:id/requests", verifyToken, getPendingRequests);
router.post("/:group_id/movies", verifyToken, addMovieToGroup);
router.get("/:id/movies", verifyToken, getGroupMovies);
router.delete("/:group_id/movies/:movie_id", verifyToken, removeGroupMovie);
router.post("/:group_id/showtimes", verifyToken, addShowtimeToGroup);
router.get("/:id/showtimes", verifyToken, getGroupShowtimes);
router.delete("/:group_id/showtimes/:showtime_id", verifyToken, removeGroupShowtime);

export default router;
