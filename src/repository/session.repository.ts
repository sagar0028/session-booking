import mongoose from 'mongoose';
import { Session, SESSION_STATUS } from '../models/Session';

export async function create(data: {
  teacherId: string;
  startTime: Date;
  endTime: Date;
}) {
  return Session.create(data);
}

export async function findById(id: string) {
  return Session.findById(id);
}

export async function bookAvailableSession(sessionId: string, userId: mongoose.Types.ObjectId) {
  return Session.findOneAndUpdate(
    { _id: sessionId, status: SESSION_STATUS.AVAILABLE },
    { status: SESSION_STATUS.BOOKED, userId },
    { new: true }
  );
}

export async function completeBookedSession(sessionId: string) {
  return Session.findOneAndUpdate(
    { _id: sessionId, status: SESSION_STATUS.BOOKED },
    { status: SESSION_STATUS.COMPLETED, completedAt: new Date() },
    { new: true }
  );
}

export async function findAvailableWithTeacher(start: Date, end: Date) {
  return Session.aggregate([
    {
      $match: {
        status: SESSION_STATUS.AVAILABLE,
        startTime: { $gte: start, $lte: end },
      },
    },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacherId',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    { $unwind: '$teacher' },
    { $sort: { startTime: 1 } },
  ]);
}

export async function findUserSessionsGrouped(userId: string) {
  const result = await Session.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacherId',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    { $unwind: '$teacher' },
    {
      $facet: {
        upcomingSessions: [
          { $match: { status: SESSION_STATUS.BOOKED } },
          { $sort: { startTime: 1 } },
        ],
        completedSessions: [
          { $match: { status: SESSION_STATUS.COMPLETED } },
          { $sort: { completedAt: -1 } },
        ],
      },
    },
  ]);

  return result[0] ?? { upcomingSessions: [], completedSessions: [] };
}
